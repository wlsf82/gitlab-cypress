# GitLab Cypress

Sample project to experiment with Cypress for testing the GitLab application.

## Pre-requirements

You need to have node and npm installed on your local environment.

For this project I used the following versions:

```sh
$ node -v
v12.6.0

$ npm -v
6.9.0
```

## Installation

Run `npm i` to install the dev dependencies.

## Tests

> Before running the tests, create a file called `cypress.env.json`, based on `cypress.env.example.json`, and update the values of its properties with the credentials of a valid user.

Run `npm t` to run the tests in headless mode. The test results should look like the below image.

![Cypress test framework running GitLab tests in headless mode](assets/test-results-headless.png)

Run `npx cypress open`, then click 'Run all specs' to run the tests in interactive mode. You should see something like the below gif.

![Cypress test framework running GitLab tests in interactive mode](assets/GitLab-Cypress.gif)