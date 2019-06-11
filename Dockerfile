FROM node:9

ADD . /
RUN echo -e  "registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=NPM_TOKEN" > ~/.npmrc
RUN npm install --progress=false

ENTRYPOINT ["npm", "run", "start"]
