## Description

# log-service
A NestJs app that searches treats log files/ Node v19.2.0/ 
Fastify as http provider as performance is a key reuirement. 

Basically there are two key points in the app. 
- We should not load the whole file on memory, i've chosen readline to read the file line by line.
- We should not search and read the whole file since we are give a specific number of rows, so we start reading 
at a specific position at the end of the file while covering the defined number of rows. 

## Installation

```bash
$ npm install
```

```bash
$ npm install -g @nestjs/cli
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation (http://localhost:3000/api-documentation)
Add more files under var/logs/ 

