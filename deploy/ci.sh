#!/bin/bash
AWS_ACCOUNT_ID=137889448232
AWS_REGION=sa-east-1

#############
### TEST ####
#############

run_tests () {
    npm install --progress=false
    if [ $? -eq 0 ]; then
    npm run test:ci
    else
        echo "npm FAILED to install, please check Jenkins errors"
        exit 1
    fi
}

#############
### BUILD ###
#############

build_and_push_docker_image () {
    sed -i "s/NODE_ENV/${NODE_ENV}/g" ./Dockerfile
    sed -i "s/NPM_TOKEN/${NPM_TOKEN}/g" ./Dockerfile

    docker build -t "${AWS_ECR_NAME}" .
    if [ $? -eq 0 ]; then
        docker tag "${AWS_ECR_NAME}":latest "${AWS_ACCOUNT_ID}".dkr.ecr.sa-east-1.amazonaws.com/"${AWS_ECR_NAME}":"${AWS_IMAGE_VERSION}"
        if [ $? -eq 0 ]; then
            docker push "${AWS_ACCOUNT_ID}".dkr.ecr."${AWS_REGION}".amazonaws.com/"${AWS_ECR_NAME}":"${AWS_IMAGE_VERSION}"
            if [ $? -eq 0 ]; then
                echo "Image builded, tagged and pushed to Amazon Repository"
            else
                exit 1
            fi
        else
            exit 1
        fi
    else
        exit 1
    fi
}

#############
### DEPLOY ##
#############

deploy_hml_docker_image () {
    sed -i "s/AWS_IMAGE_VERSION/${AWS_IMAGE_VERSION}/g" ./deploy/"${BRANCH_NAME}".json

    build_and_push_docker_image
    TASK_DEFINITION=`aws ecs register-task-definition \
    --cli-input-json file://./deploy/"${BRANCH_NAME}".json \
    --network-mode bridge \
    --requires-compatibilities EC2 \
    | jq '.taskDefinition | .revision'`

    aws ecs update-service \
    --cluster "${AWS_ECS_CLUSTER}" \
    --service "${BRANCH_NAME}"-"${AWS_ECR_NAME}" \
    --desired-count "${AWS_ECS_TASK_NUMBER}" \
    --task-definition "${BRANCH_NAME}"-"${AWS_ECR_NAME}":"${TASK_DEFINITION}"
}

deploy_prod_docker_image () {
    aws s3 cp s3://devops-ecs-applications/prod-"${AWS_ECR_NAME}"/ecsApplication.json deploy/.
    sed -i "s/AWS_IMAGE_VERSION/${AWS_IMAGE_VERSION}/g" ./deploy/ecsApplication.json

    build_and_push_docker_image
    TASK_DEFINITION=`aws ecs register-task-definition \
    --cli-input-json file://./deploy/ecsApplication.json \
    --network-mode bridge \
    --requires-compatibilities EC2 \
    | jq '.taskDefinition | .revision'`

    aws ecs update-service \
    --cluster "${AWS_ECS_CLUSTER}" \
    --service "${AWS_ECS_SERVICE}" \
    --desired-count "${AWS_ECS_TASK_NUMBER}" \
    --task-definition prod-"${AWS_ECR_NAME}":"${TASK_DEFINITION}" \
    --deployment-configuration maximumPercent="${AWS_ECS_MAXIMUM_HEALTH}",minimumHealthyPercent="${AWS_ECS_MINIMUM_HEALTH}"
}

#################
### EXECUTION ###
#################

PIPELINE_STEP=$1

case ${PIPELINE_STEP} in
    test)
        run_tests
        ;;
    homolog_deploy)
        deploy_hml_docker_image
        ;;
    production_deploy)
        deploy_prod_docker_image
        ;;
    *)
        echo "############################################"
        echo "Select between test, homolog_deploy or production_deploy"
        echo "############################################"
        exit 1
        ;;
esac
