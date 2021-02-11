# ATAS Installation Instructions

## First Stage

- Ensure you have [`Node & NPM`](https://nodejs.org/en/) installed.
- Install [`yarn`](https://yarnpkg.com/getting-started/install) by typing `npm install -g yarn`
- In order to install all modules and required packages for this project type `yarn setup` in the project root directory, This may take a few minutes.
- In the server directory make a duplicate of `.env.example` and rename it to `.env`, you should have both `.env.example` and `.env` in your server directory now.
- This project should work in any sql engine but it is currently only tested on [`Postgres`](https://www.postgresql.org/)
- Inside of the new `.env` file replace all variables you wish to change and make sure `TYPEORM_DATABASE` is equal to a new database table
- Once the `.env` is setup and the database is running type `yarn dev` and it will spin up both the api server and frontend server.
- Finally just a note... This is pretty much a rough draft, errors can and more than likely will occur. Enjoy
