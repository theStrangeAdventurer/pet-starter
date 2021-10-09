# 🐶 Pet Starter

What is the problem? I have an idea of another application, but I constantly have to deal with similar problems: the choice of a router, insufficient configurability of existing solutions, the frontend code lives separately from the backend (in different repositories, although at the initial stage I want everything to be close in one place).

This is the basic template for a mono repository, which includes a client application with server rendering on React and an api server on Node.js. Both applications are written in typescript, and all configuration files are provided for modification. This project is designed to help those who want to quickly start their project, test any hypothesis, and for those who lack existing solutions for static generation of sites or projects with server side rendering that cover only the frontend part of the project.

## What has already been implemented?

- SSR (Server side rendering)
- webpack watch with browser live reload(via the Server Sent Events)
- css modules
- React Helmet for SEO optimizations
- service worker (workbox)
- static serving from `nginx` with gzip
- routing based on the file structure - just create a file in the `pages` directory and after launching `yarn dev`, you will have a new route (for example, if you create a file `/pages/detail/:someParam.tsx`, this page will open in browser for requests `/detail/whateverParamValue123`)
- Getting data on the server is implemented by adding the exported `getSSRProps` function, for example:

```ts
import axios from "axios";

export const getSSRProps = async (params: RouteParams = {}) => {
  const response = await axios.get(`/api/details/${params.id}`);
  // `response.data` will be available in the `ssrData` prop of the page component after rendering
  return response.data;
};
```

- Requests that are sent to `/api/*` will be proxied by `nginx` (which runs in docker) to the express server, which is located in the api folder. You can replace it with something that is convenient for you, the main thing is not to forget to fix the respective `scripts` in `package.json` files in the root folder and `package.json` which located in `/api/` folder.

- `mongodb` is used as the database by default. `Mongoose` used for work with mongobd (see `/api` folder which contain base example post and get methods and work with mongoose models)

- for production used certbot with Let's Encrypt ssl certificate

## How do I get started ?

First, you need `node`, `docker` and `docker-compose` installed on your machine to run the project, otherwise the requests will not be proxied to `api express server` which located in api folder

You also need installed `yarn` (checked on version 3 yarn) on your machine, cause this monorepo used yarn workspaces.

- How to install docker on Mac - https://docs.docker.com/desktop/mac/install/
- How to install docker on Windows - https://docs.docker.com/desktop/windows/install/
- How to install Docker on Ubuntu (https://phoenixnap.com/kb/install-docker-on-ubuntu-20-04) and how to install docker-compose on Ubuntu(https://phoenixnap.com/kb/install-docker-compose-on-ubuntu-20-04)

If `docker` and `docker-compose` (Docker Desktop) are already installed, just open terminal and:

```sh
git clone git@github.com:alexej3ajtsev/pet-starter.git /path/to/your/project

cd /path/to/your/project

yarn

yarn dev

```

After these commands you can open your browser at `http://localhost` see that everything works!

## How to build and run production build ?

First, you need change `DOMAIN` and `DOMAIN_EMAIL` in .env file wich located in root folder and set `NODE_ENV` to `production`,
then run in the terminal while at the root of the project `yarn patch:ssl:configs`

The next thing you need is run in the terminal

```sh
сd /path/to/project/root/nginx
./init-letsencrypt.sh
```

After that in the root project folder run

```sh
yarn build
yarn docker:up
yarn start
```

If everything went well you should see following lines in terminal

```sh
api server started on port 3000
🔛 Successfully connected to mongodb://{DB_USERNAME}:{DB_PASSWORD}@localhost:27017/{DB_NAME}?authSource=admin
SSR server started on port 8080 🚀
```

Check running docker containers `docker ps`, if everything went well they (`nginx:alpine`, `certbot/certbot`, `mongo`) must have the status `Up`

After that go to the your domain in browser and check that everythings works properly 🙂

All nginx configurations located in `nginx` folder and all docker files located in `docker` folder, You can configure everything as you need with these files.

## How configure webpack configurations ?

Client SSR app used webpack5 for build and it's configurations located in `client/webpack` folder, you can change it as you need, also you can modify `client/tsconfig.json`

Api express server build going through `tsconfig.json` configuration file, which is located in `api/tsconfig.json`

## what's with the database ?

By default used `mongodb` with mongoose, but you can change it if you want, credentials for connect with database located in `.env` file, which located in root folder. Don't forget remove them, cause `.env` files should not be stored in the repository for security reasons (here they are just for an example of the content that is expected in them).
