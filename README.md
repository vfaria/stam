# stam

## Environment Variables

### Application

```
STAM_PORT          # API listening port
STAM_URL           # API response URL
STAM_LOG_LEVEL     # Desired log level 
                         - Default: INFO
                         - Other values: TRACE, DEBUG, INFO, WARN, ERROR, FATAL
STAM_SEND_LOGS     # Send logs (true or false)
```

### Database
```
STAM_DB_PASSWORD   # Password to connect to database
STAM_DB_USERNAME   # Username to connect to database
STAM_DB_DATABASE   # Database in which the application will be connect
STAM_DB_HOST       # IP or DNS from database
STAM_DB_PORT       # Database listening port 
```

### OAuth
```
STAM_CLIENT_ID     # API's client id
STAM_CLIENT_SECRET # API's client secret
```

## Migrations

### Run migrations

```
npm run migrations
```

It runs the `knex migrate:latest` command using db/database.js file as the default knexfile.

It is responsible for creating the application's database structure and it also seeds the tables that need to be fullfilled.

### Development migrations

In development cases, run:

```
npm run migrations:dev
```

### Migrations using `.env`

To run migrations using `.env`, use the command:

```
npm run migrations:dotenv
```

### Connection parameters

The connection is made using the above mentioned [Database Environment Variables](#Database).


### Creating a new `migration` file

To add a new migration file, use the following line command:

```
npm run migrate:create -- file-name
```

In case of development utilization, run:

```
npm run migrate:create:dev -- file-name
```

# Tests

1. Create a `.env` file in the project's root folder with following content:

```
STAM_DB_PASSWORD=dbpass
STAM_DB_USERNAME=dbuser
STAM_DB_DATABASE=db
STAM_DB_HOST=localhost
STAM_DB_PORT=3306
STAM_PORT=3000
```

2. [Install docker compose](https://docs.docker.com/compose/install/)

3. [Configure docker compose](https://docs.docker.com/engine/installation/linux/linux-postinstall/)

4. To run tests, execute the following commands at your terminal:

```
npm run docker:up
npm run migrations
npm run dev:tests-all
```

If you wish to re-create the database structure and seeds, run:

```
npm run docker:restart
npm run migrations
```

**In `dev` environment, run `npm run migrations:dev` to insert mock data in database**


# Scripts

## Start

To run application, use:
```
npm start
```

## Dev

To run application in hot-reload mode, using `.env` file:
```
npm run dev
```
To run application in hot-reload mode, with linter and all tests
```
npm run dev:tests-all
```
To run application in hot-reload mode, with linter and all tests but integration
```
npm run dev:tests
```

## Testes

To run all tests
```
npm run tests
```
To run unit tests only
```
npm run tests:unit
```
To run integration tests only
```
npm run tests:integration
```
To run `migrations` and then run integration tests
```
npm run tests:db
```

## Linter
```
npm run lint
```

## Coverage
To run coverage over all tests
```
npm run coverage
```
To run coverage over all tests except integration test
```
npm run coverage:no-integration
```

## Migrations
To run `migrations` in accordance with application `settings`
```
npm run migrations
```
Calls db-migrate
```
npm run migrate
```
Calls db-migrate create
```
npm run migrate:create
```
To run `migrations` and seed the database for development in accordance with application `settings`
```
npm run migrations:dev
```
Calls db-migrate create para ambiente de desenvolvimento
```
npm run migrate:create:dev
```

## Docker

Builds a container, using mariaDB, running according to application `settings` file (needs to have `docker-compose` installed)
```
npm run docker:up
```
Resets mariaDB container
```
npm run docker:restart
```
Shuts down mariaDB container
```
npm run docker:down
```

## Util

Runs after `npm install` command and verifies the vulnerability of all packages
```
npm run check-dependencies
```
## API Documentation

To access the API documentation, simply make a GET request using `/v1/monitoring/docs.json` as URL path. 

It will return a complete documentation using openAPI 3.0 format.

