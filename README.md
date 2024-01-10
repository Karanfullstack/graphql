# installation

typescript -D
express + @types/express - D
tsc-watch -D
setting up tsconfig.json
setting up watch-mode

- "start":"node build/index.js",
- "dev": "tsc-watch --onSuccess \"npm start\""

# installation ApoloServer

- @apollo/server

* and setting up express with graphql
* install - npm install typescript ts-node @types/node --save-dev as dev
* install - prisma
* migration - npx prisma migrate dev --name name_for_migrate
* DB - Instace of prismaclient with some db config
* SEPRATION OF CONCERN --- graphql->index.ts && services
