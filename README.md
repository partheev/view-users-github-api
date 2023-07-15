# Github Users Repositories (Github API integration)

## Description

A platform to to verify GitHub profiles of the users. This app provides user profile data and show his/her publicly available repositories and their description.

## Features

-   Check Github profile username exist or not.
-   Shows Github users profile information.
-   List out repositories
-   Pagination in the frontend

## Screenshots
#### Home page
![ghss1](https://github.com/partheev/view-users-github-api/assets/30794881/41f12907-ea96-42a2-856d-5f3d4fd5026c)
#### Profile page
![ghss2](https://github.com/partheev/view-users-github-api/assets/30794881/f66c6552-43f6-4be6-b03e-6f78d3ad702d)
![ghss3](https://github.com/partheev/view-users-github-api/assets/30794881/f37f2b34-d4c8-4f1f-9751-9a40d6f1d723)

## Tech-stack used

-   Express.js with TypeScript for backend application.
-   Angular
-   Vitest for testing

Frontend project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

## How to run frontend in your environment?

Run `cd github-user-repos-frontend` to navigate into frontend directory

Run `npm install` to install dependencies to run this project.

#### Configure backend endpoints

Configure local development server endpoint in `src/environments` file

#### Development server

Run `npm start` for a dev server. Application automatically open or navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## How to run backend application?

1. Goto backend directory using `cd github-user-repos-backend` command.
2. Make sure to have _NodeJS_ runtime in your system
3. Run `npm install` to install dependencies
4. Give your github token in `.env` file with key `GITHUB_TOKEN`
5. Run `npm run dev` to start development server

### Testing backend

Run `npm test` to run tests

### Build backend

run `npm run build` to build this _Typescript_ project. Build files are created at `dist` folder
