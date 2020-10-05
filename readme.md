# Nextjs and Vanilla React

There are two projects with the same features. All front-ends use the backend found in `server` backend.

## Installation

In each project folder, you must run `npm install`.

## Usage

The server can be started using `npm start`. The server will create a sqlite database.

Use postman or some other http client to populate the database. The following POST message will work. Change the host to wherever the backend is running.

```
POST http://localhost:4040/users
Content-Type: application/json

{
    "name": "John"
}
```

Choose which client you want to run, navigate to that project folder, then run `npm start`.

## Branches

There are two brances in this project. The `master` branch compares vanilla react with nextjs including code-splitting. The `vanilla-no-lazy` is the same example without code splitting in the vanilla react client.
