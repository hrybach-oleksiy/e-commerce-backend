## Server Application for the e-Commerce training project. API

## Setup and Running

- Use `node 14.x` or higher.
- Clone this repo: `$ git clone https://github.com/hrybach-oleksiy/e-commerce-backend.git`.
- Go to downloaded folder: `$ cd e-commerce-backend`.
- Install dependencies: `$ npm install`.
- Create the `.env` file and specify the:
  - DB_URL `password`
  - JWT_ACCESS_SECRET
  - JWT_REFRESH_SECRET
  - SMTP_USER
  - SMTP_PASSWORD
- Start server: `$ npm start`.
- Now you can send requests to the address: `http://localhost:5000/api`.

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

Description: Used to create a new user.

<details>
<summary markdown="span">Request to the server</summary>

- **URL**

  /user/registration

- **Method:**

  `POST`

- **Headers:**

  `'Content-Type': 'application/json'`

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

```typescript
{
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  street: string,
  city: string,
  postalCode: string,
  country: string,
}
```

where:

- `email` - user's email
- `password` - user's password
- `firstName` - user's first name
- `lastName` - user's last name
- `dateOfBirth` - user's DOB
- `street` - user's address street
- `city` - user's address city
- `postalCode` - user's address postal code
- `country` - user's address country
</details>

<details>
<summary markdown="span">Server Response</summary>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvdF9rb25vdG9wQHVrci5uZXQiLCJpZCI6IjY2MzYzMzYxYWQ3MzA1MzZhMTg1NWI1MSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNzE0ODI4MTMyLCJleHAiOjE3MTQ4MjgxNDd9.mUtKjXXvm5A3xMCu6sPs5DyWbJXm520UxFIux3uzWE8",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvdF9rb25vdG9wQHVrci5uZXQiLCJpZCI6IjY2MzYzMzYxYWQ3MzA1MzZhMTg1NWI1MSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNzE0ODI4MTMyLCJleHAiOjE3MTc0MjAxMzJ9.9CUrUXyFo6jkEfsXW9nnwJ7vrqNs0CQE79QrZlNr_sk",
      "user": {
        "email": "test@email.com",
        "id": "66363361ad730536a1855b51",
        "isActivated": false
      }
    }
    ```

  where:

* `accessToken` - access token received from the server
* `refreshToken` - refresh token received from the server
* `email` - user's email
* `id` - identifier received from the server
* `isActivated` - current activation status of the user

- **Error Response:**

- **Code:** 400 BAD REQUEST <br />
  **Content:**

```json
{
  "message": "User with test@email.com is already exist",
  "errors": []
}
```

- **Notes:**

  None

</details>

### User Activation

Description: Used to activate a new user.

<details>
<summary markdown="span">Request to the server</summary>

- **URL**

  /user/activation:link

- **Method:**

  `GET`

- **Headers:**

  None

- **URL Params**

  `link=[string]`

- **Query Params**

  None

- **Data Params**

  None

</details>

<details>
<summary markdown="span">Server Response</summary>

As a response server redirect the user to the client page and set `isActivated` field as `true`

</details>

### User Login

Description: Used to login user.

<details>
<summary markdown="span">Request to the server</summary>

- **URL**

  /user/login

- **Method:**

  `POST`

- **Headers:**

  `'Content-Type': 'application/json'`

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

```typescript
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

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvdF9rb25vdG9wQHVrci5uZXQiLCJpZCI6IjY2MzYzMzYxYWQ3MzA1MzZhMTg1NWI1MSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNzE0ODI4MTMyLCJleHAiOjE3MTQ4MjgxNDd9.mUtKjXXvm5A3xMCu6sPs5DyWbJXm520UxFIux3uzWE8",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndvdF9rb25vdG9wQHVrci5uZXQiLCJpZCI6IjY2MzYzMzYxYWQ3MzA1MzZhMTg1NWI1MSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNzE0ODI4MTMyLCJleHAiOjE3MTc0MjAxMzJ9.9CUrUXyFo6jkEfsXW9nnwJ7vrqNs0CQE79QrZlNr_sk",
      "user": {
        "email": "test@email.com",
        "id": "66363361ad730536a1855b51",
        "isActivated": true
      }
    }
    ```

  where:

* `accessToken` - access token received from the server
* `refreshToken` - refresh token received from the server
* `email` - user's email
* `id` - identifier received from the server
* `isActivated` - current activation status of the user

- **Error Response:**

- **Code:** 400 BAD REQUEST <br />
  **Content:**

```json
{
  "message": "The user with such email was not found",
  "errors": []
}
```

OR

```json
{
  "message": "Invalid Password",
  "errors": []
}
```

- **Notes:**

  None

</details>

### User Logout

Description: Used to logout user.

<details>
<summary markdown="span">Request to the server</summary>

- **URL**

  /user/logout

- **Method:**

  `POST`

- **Headers:**

  `'Content-Type': 'application/json'`

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

```typescript
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

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

```json
{
  "acknowledged": true,
  "deletedCount": 1
}
```

where:

- `acknowledged` - a boolean value indicating whether the operation was successfully acknowledged by the server.
- `deletedCount` - the number of documents deleted from the database as a result of the operation.

- **Error Response:**

- **Notes:**

  None

</details>

### Get Countries

Description: Used to get list of countries.

<details>
<summary markdown="span">Request to the server</summary>

- **URL**

  /countries

- **Method:**

  `GET`

- **Headers:**

  None

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

  None

</details>

<details>
<summary markdown="span">Server Response</summary>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

  ```json
  [
    {
    "abbrev": "FI",
    "name": "Finland",
    "_id": "663a132951c79c45833675fa",
    "postalCodePattern": "99999",
    "postalRegex": "^[0-9]{5}$",
    }
  ]
  ```

  where:

* `abbrev` - country code
* `name` - country name
* `_id` - identifier received from the server
* `postalCodePattern` - the postal code example you can use as a placeholder to show user correct pattern
* `postalRegex` - the regex you can use to validate the user input

- **Error Response:**

- **Notes:**

  None

</details>
