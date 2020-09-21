# Infoblog - webservice

## What is this ?

infoblog is a web service built with typescript that has a connection to a mysql database. It also implements other texnologies such as TypeORM and Cloudinary (More information about the tools in the 'Tools you implement' section).

This project consists of implementing a solution associated with the management of posts that users make, along with the typical data management (CRUD)

## Development information

### Scripts

```
- dev = run server in port 3000. Use for development environment
- build = generate dist folder with older js syntax
- start = run the service in production.
- lint: run eslint verification
```

The start script has an assignment to the NODE_ENV environment wand where the value "production" is assigned. However, there is a problem when this script runs on window systems because the SET prefix is missing before assigning the value. That is, if you are in a window system you must set the following: SET NODE_ENV=production and you are in linux you should not make any changes

### Environment Variable

The .env.example file contains the model of the environment variables used in this project. Note that a mysql database, a cloud account, a jwt secret key and typeORM are required.

One point to keep in mind is that if you want to test locally. The environment variable TYPEORM*ENTITIES should have the value 'src/models/*.ts', while if you want to test in production the value should be 'dist/models/\_.js'.

## API documentation

```
 https://app.swaggerhub.com/apis-docs/camiloJTG/Infoblog/1.0.0
```

## URL api server

```
 https://infoblog-webservice.herokuapp.com/
```

## Tools implements

```
- Mysql
- TypeORM
- Cloudinary
- Typescript
- Jsonwebtoken
- Express
- Eslint
- Prettier
```
