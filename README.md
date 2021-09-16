This is a [React.js](https://reactjs.org/) project bootstrapped with [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html).

## Getting Started

Before install node modules, make sure your npm version is up to date. Try:

```bash
npm install -g npm
```

First, install module for server:

```bash
npm install
# or
yarn
```

Second, install module for client:

```bash
npm run client-install
# or
yarn client-install
```

Next, you should change mysql database config.

You can change database config on file `.env`.

Change `DATABASE_URL` with your mysql database.

Next, generate database:

```bash
npm run generate-db
# or
yarn generate-db
```

Now, you can run development code with:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Thanks.
