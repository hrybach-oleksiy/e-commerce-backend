## Server Application for the e-Commerce training project. API

## Setup and Running

- Use `node 14.x` or higher.
- Clone this repo: `$ git clone https://github.com/hrybach-oleksiy/e-commerce-backend.git`.
- Go to downloaded folder: `$ cd e-commerce-backend`.
- Install dependencies: `$ npm install`.
- Create the `.env` file and specify the:
  - DB_URL `DB_URL='mongodb+srv://testUser:testPassword@cluster0.7gf4vod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'`
  - JWT_ACCESS_SECRET
  - JWT_REFRESH_SECRET
  - SMTP_USER
  - SMTP_PASSWORD
- Start server: `$ npm start`.
- Now you can send requests to the address: `http://localhost:3000/api`.

In the `.env.example` file, you can find an example the `.env` file.

where:

- `PORT` - server port
- `DB_URL` - data base connection string into your application code
- `JWT_ACCESS_SECRET` - secret jwt access key
- `JWT_REFRESH_SECRET` - secret jwt refresh key
- `SMTP_HOST` - email host
- `SMTP_PORT` - email port
- `SMTP_USER` - email using for sending activation links
- `SMTP_PASSWORD` - email password
- `API_URL` - address of the server
- `CLIENT_URL` - address of the client

### Documentation

You can the description of the CRUD operation by the [link](http://localhost:3000/api-docs/)

