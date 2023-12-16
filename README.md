# GitLab Cypress

[![main](https://github.com/wlsf82/gitlab-cypress/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/gitlab-cypress/actions)
[![gitlab-cypess](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/vxwq6z/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/vxwq6z/runs)

Sample project to experiment with [Cypress](https://cypress.io) to test the GitLab application.

## Pre-requirements

You need to have a GitLab local environment such as [GDK](https://gitlab.com/gitlab-org/gitlab-development-kit) or Docker up and running.

You also need to have [Node.js](https://nodejs.org/) and npm installed on your computer.

For this project, the following versions of Node.js and npm were used:

```sh
$ node -v
v18.13.0

$ npm -v
8.19.3
```

### Running GitLab on Docker

Run `docker run --publish 80:80 --name gitlab --hostname localhost wlsf82/gitlab-ce` and wait for the environment to be up and running (this might take a minute or so).

All should be ok if, when accessing the http://localhost/ URL, a form to define the password of the `root` user is displayed.

> ❗**THERE'S NO NEED TO DEFINE THE PASSWORD MANUALLY**❗
>
> There's an automated test for it. 😉
>
> Keep reading.

## Installation

Run `npm i` to install the dev dependencies.

## Tests

> Before running the tests, create a file called `cypress.env.json` in the project root directory, based on the [`cypress.env.example.json`](./cypress.env.example.json) file, and update the value of the `user_password` property with one of your choice.
>
> By default, the tests will run against `http://localhost/`, but if you need to run them in a different URL (e.g.: `http://localhost:3000/`), change the `baseUrl` property in the [`cypress.config.js`](./cypress.config.js) file.

### Headless mode

Run `npm test` to run all tests in headless mode.

Run `npm run test:api` to run only the API tests in headless mode.

Run `npm run test:gui:project:issue` to run only the GUI Project-issue-related tests in headless mode.

Run `npm run test:gui:project:but:issue` to run only the GUI Project-but-issue-related tests in headless mode.

Run `npm run test:gui:all:but:project` to run only the GUI Project-not-related tests in headless mode.

### Interactive mode

1. Run `npm run cy:open` to open the Cypress App;
2. Select E2E Testing;
3. Select one of the available browsers (e.g., Electron), and click the Start button;
4. **Run the [`cypress/e2e/gui/profile/createAccessToken.cy.js`](./cypress/e2e/gui/profile/createAccessToken.cy.js) test;**
5. Finally, click on the test file you want to run and wait for it to finish.

> **Important notes about the above steps**
>
> **Do not skip step 4!** It will authenticate the `root` user, create a GitLab Access Token, and make it available to all other tests while the Cypress App is kept open unless the [`cypress/e2e/gui/profile/deleteAccessTokens.cy.js`](./cypress/e2e/gui/profile/deleteAccessTokens.cy.js) test is run. In such a case, the [`cypress/e2e/gui/profile/createAccessToken.cy.js`](./cypress/e2e/gui/profile/createAccessToken.cy.js) test needs to be re-run.
>
> Also, step 4 creates a session for the `root` user, which will be restored by most tests. This means that login via GUI should only happens once, speeding up the execution. 🏎️

#### Example

Here's an example of running all the GUI tests in interactive mode.

https://user-images.githubusercontent.com/2768415/225186210-4dd51c26-9baf-4e65-9b09-6f79a818a7d5.mp4

## Contributing

If you want to contribute to this project, follow the below steps.

1. Fork the project;
2. Clone your fork and make your changes;
3. Test your changes locally, and move on only when all tests are green;
4. Push your changes to GitHub and create a pull request (PR);
5. After the GitHub Workflow of your PR is green, tag @wlsf82, ask for review and wait for feedback;
6. If everything goes well, you should have your changes rebased and merged to the main branch. Otherwise, you will receive comments with adjustments needed before merging.

> [This](https://cbea.ms/git-commit/) is the commit messaging guidelines you should follow.

___

Developed with 💚 by [Walmyr](https://walmyr.dev).
