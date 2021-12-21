# Rick and Morty tech test

This app allows the user to browse all Rick and Morty's characters, and mark anyone as favorite. It's only available for registered users, so you'll need to first create an account and log in with your user to see the characters.

The full app consists on two parts: the client and the server.

## **Client**

The client is a React SPA app built with Create React App, and uses Redux for state management, React Router for client side routing and Framer Motion for some shinny visual effects.
There's currently no tests implemented for the client app.

The server runs in port **`3000`**.

### **Note on running production build**

If you want to serve the production version of the app, you can install the [`serve`](https://www.npmjs.com/package/serve) NPM package and serve the app with the following `serve -s build` command.

```bash
#install serve
$ npm install -g serve

#cd into client directory
$ cd client

#generate production build
$ npm run build

#serve the app
$ serve -s build
```

### **Install**

Simply run

```bash
#cd into client directory
$ cd client
$ npm install
```

### **Run scripts**

There are two run scripts used for the client app: one for developing and one for generating the production build.

#### **For development:**

> `npm run dev` : starts development mode, watching for file changes and automatically reloading the browser.

#### **For production:**

> `npm run build` : generates the production build in the `/build` directory

## **Server**

The server is a Node.js app built with Express. It's compiled with Babel, so you can use modern Javascript. For delivering the characters to the client app, it consumes the [Rick and Morty API](https://rickandmortyapi.com/). The users are saved in a MongoDB Atlas instance which is currently running, and the app uses mongoose ODM for interacting with the db. Login and session is handled using JWT.
The server uses mocha and sinon for unit testing and supertest for integration tests.

There are three distinct environments in the server: production, development and test. The app uses a different DB connection depending on the current environment.

If you would like to use a local MongoDB instance you should change the connection URI declared in the `.env` file, stored as a Base64-encoded ASCII string.

The server runs in port **`4242`**.

### **Install**

Simply run

```bash
#cd into server directory
$ cd server
$ npm install
```

### **Run scripts**

There are three main types of run scripts used for the server app: some are for developing, some are for running tests and the rest are used generating or running the production build.

#### **For development:**

> `npm run dev` : starts development mode, watching for file changes and automatically restarting the server.

#### **For testing:**

> `npm run test` : runs all available tests once
>
> `npm run test:watch` : To execute tests in watch mode you can use the command

#### **For production:**

> `npm run build` : generates the compiled production build in the `/dist` directory, clearing first all previous content
>
> `npm run clean` : clears `/dist` folder's content
>
> `npm run build-server` : compiles server source code with babel and puts generated code in `/dist` folder
>
> `npm run start` : executes the production server app from `/dist` folder
