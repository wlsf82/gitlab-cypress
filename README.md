# GitLab Cypress

Sample project to experiment with [Cypress](https://cypress.io) for testing the GitLab application.

## Pre-requirements

You need to have a GitLab local environment such as [GDK](https://gitlab.com/gitlab-org/gitlab-development-kit) or Docker up and running.

You also need to have [Node.js](https://nodejs.org/) and npm installed on your computer.

For this project, the following versions of node and npm were used:

```sh
$ node -v
v18.13.0

$ npm -v
8.19.3
```

### Running GitLab on Docker

Run `docker run --publish 80:80 --name gitlab --hostname localhost wlsf82/gitlab-ce` and wait for the environment to be up and running (this might take a minute or so), then access http://localhost/, and finally, create a password for the `root` user.

## Installation

Run `npm i` to install the dev dependencies.

## Tests

> Before running the tests, create a file called `cypress.env.json` in the project root directory, based on the [`cypress.env.example.json`](./cypress.env.example.json) file, and update the value of the `user_password` property with the credentials of the `root` user.
>
> By default, the tests will run against `http://localhos/`, but if you need to run them in a different URL (e.g.: `http://localhos:3000/`), change the `baseUrl` property in the [`cypress.config.js`](./cypress.config.js) file.

### Headless mode

Run `npm t` to run all tests in headless mode.

Run `npm run test:api` to run only the API tests in headless mode.

And run `npm run test:gui` to run only the GUI tests in headless mode.

### Interactive mode

1. Run `npm run cy:open` to open the Cypress App;
2. Select E2E Testing;
3. Select one of the available browsers (e.g., Electron), and click the Start button;
4. Run the [`cypress/e2e/gui/profile/createAccessToken.cy.js`](./cypress/e2e/gui/profile/createAccessToken.cy.js). This test will create a GitLab Access Token and make it available to all other tests while the Cypress App is kept open;
5.1. Finally, click on the test file you want to run and wait for it to finish.
5.2. Or, click on the `index.cy.js` file (from [`cypress/e2e/api`](./cypress/e2e/api/) or [`cypress/e2e/gui`](./cypress/e2e/gui/)) to run them all at once.

___

Developed with 💚 by [Walmyr](https://walmyr.dev).
