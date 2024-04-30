## Server Application for the e-Commerce training project. API

### Install and Run the Application

To use the server application follow these steps:

- clone the repository
- install the dependencies with `npm i`
- create the `.env` file and specify the:
   - DB_URL `password`
   - JWT_ACCESS_SECRET
   - JWT_REFRESH_SECRET
   - SMTP_USER
   - SMTP_PASSWORD
- start the local server using `npm run start`


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

### User Registration

Initiator: Client application

Description: Used to create a new user. 

<details>
<summary markdown="span">Request to the server</summary>

```javascript
{
  email: string,
  password: string,
}
```

where:

- `email` - user's email
- `password` - user's password
</details>

<details>
<summary markdown="span">Server Response</summary>

```javascript
{
  accessToken: string,
  refreshToken: string,
  user: {
    email: string,
    id: string,
    isActivated: boolean,
  },
}
```

where:

- `accessToken` - access token received from the server
- `refreshToken` - refresh token received from the server
- `email` - user's email 
- `id` - identifier received from the sever
- `isActivated` - current activation status of the user
</details>

### User Activation

Initiator: Client application

Description: Used to activate a new user. 

<details>
<summary markdown="span">Request to the server</summary>

```javascript
{
  activationLink: string,
}
```

where:

- `activationLink` - URL link containing the activation token received by the user via email
</details>

<details>
<summary markdown="span">Server Response</summary>

As a response server redirect the user to the client page and set `isActivated` field as `true`
</details>

### User Login

Initiator: Client application

Description: Used to create a new user. 

<details>
<summary markdown="span">Request to the server</summary>

```javascript
{
  email: string,
  password: string,
}
```

where:

- `email` - user's email
- `password` - user's password
</details>

<details>
<summary markdown="span">Server Response</summary>

```javascript
{
  accessToken: string,
  refreshToken: string,
  user: {
    email: string,
    id: string,
    isActivated: boolean,
  },
}
```

where:

- `accessToken` - access token received from the server
- `refreshToken` - refresh token received from the server
- `email` - user's email 
- `id` - identifier received from the sever
- `isActivated` - current activation status of the user
</details>

### User Logout

Initiator: Client application

Description: Used to create a new user. 

<details>
<summary markdown="span">Request to the server</summary>

```javascript
{
  email: string,
  password: string,
}
```

where:

- `email` - user's email
- `password` - user's password
</details>

<details>
<summary markdown="span">Server Response</summary>

```javascript
{
  acknowledged: boolean,
  deletedCount: number
}
```

where:

- `acknowledged` - a boolean value indicating whether the operation was successfully acknowledged by the server.
- `deletedCount` - the number of documents deleted from the database as a result of the operation.
</details>