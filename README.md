# Table of Contents

- [Aleph assignment](#aleph-assignment)
  - [Before You Begin](#0-before-you-begin)
  - [Warmup](#1-warmup)
  - [Working with the API](#2-working-with-the-api)
    - [Display Full Book Info](#1-display-full-info)
    - [Search API](#2-search-api)
    - [Display Additional Info on Hover](#3-display-additional-info-when-hovering-the-book)
    - [Add Unit Tests for Components](#4-add-unit-tests-for-components)
- [Starting the React Application](#hot-to-start-react-application-locally)
- [Building the Project](#building)
- [Running Unit Tests](#running-unit-tests)
- [GitHub CI/CD Workflow](#github-cicd)
- [Cloudflare Pages Deployment](#cloudflare-pages)
- [Manual Deployment Steps](#manual-deployment-to-cloudflare-page)
- [First-Time Cloudflare Configuration](#first-configuration)
- [Release Procedures](#release-procedures)
  - [Starting First Project Release](#start-first-project-release)
  - [Releasing a Patch Version (Bug Fix)](#release-new-patch-version-bug-fix)
  - [Releasing a Minor Version (Feature)](#release-new-minor-release-feature)
  - [Starting a Major Release (Breaking Changes)](#start-new-major-release-breaking)

# Aleph assignment

## Before you begin

You have 48 hours to solve this assesment

You can work with any technology you want, but solutions in React
are prefered. If you decide to work with anything else other than React or Vanilla JS feel free to remove the whole project and start fresh, but make sure to add instructions on how to run your solution.

We have prepared a simple HTTP server for you to begin with, in order to get it to work run the following commands in the root of this project

```
npm install
npm run start
```

You should then be able to access your code on http://127.0.0.1:8080. You should see the index.html with `HTTPOOL Frontend Test` content.

If you decide to implement your solution, or part of it in React we have created a clean React app, you can find it in `react-app` directory. The app was created with create-react-app (https://create-react-app.dev/), to run it move into its directory and run `npm run start` inside it. The app should open in a new dev server at http://localhost:3000/

First make sure the application works, if you have any time left after that you may add styles or other stuff to further improve it, but the main objective is to **complete every task below**.

Don't hesitate to come to us with any questions.

## 1. Warmup

Feel free to just create a JavaScript file to solve this task, no need to implement it with React

1. Add a button to a HTML5 page
2. When the button is pressed print numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".
3. Each number/fizz should be in a new line

## 2. Working with the API

Solutions in React are prefered here, but not mandatory. You can also implement them in Vanilla JS.

You will find the documentation for the API you will need to use in this task at https://openlibrary.org/developers/api.

### 1. Display full info

https://openlibrary.org/api/books?bibkeys=ISBN:9783442236862&jscmd=details&format=json
Display info for one book

Cover image | Title | authors | publish_date | physical_format

- Cover image should be large (-L)

### 2. Search API

http://openlibrary.org/search.json?title=snow+crash

- Input box for searching
- List all the covers with titles for the books
- Cover image should be large, but put a circle mask over it.

### 3. Display additional info when hovering the book

- When hovering over the book display full info about the book in the overlay (big image, title, authors, publish date, physical format, number_of_pages, weight)
- Notes:
  - Books can have multiple ISBNs, just take the first for the call

### 4. Add unit tests for components

- Add unit tests for components that you have implemented
- Make sure test coverage is at least 75%

# Hot to start React application locally

```bash
// install dependencies
npm ci

// run the server locally
npm run start

// open http://localhost:8080/ url
```

# Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

# Running unit tests

To execute unit tests with vitest, use the following command:

```bash
npm run test
```

# GitHub CI/CD

On every push the GitHub Action is run and must pass before merging branches

GitHub Action run the following jobs:

- build
  - code-style
  - test-unit
    - deploy-to-cloudflare-pages

# Cloudflare pages

On every push the deployment is push to Cloudflare which can be accessed though the following links (currently disabled due to unset secrets.CLOUDFLARE_API_TOKEN in GitHub secrets and variables)

main branch: https://aleph-miha-primc.pages.dev/
particular commit: https://SHORT.COMMIT-HASH.aleph-miha-primc.pages.dev/
particular branch: https://branch-name.aleph-miha-primc.pages.dev/

## Manual deployment to Cloudflare page

Set token to your environment

```bash
export CLOUDFLARE_API_TOKEN=
echo "$CLOUDFLARE_API_TOKEN"
```

Build and deploy to Cloudflare

```bash
npm run build
npx wrangler pages deploy
```

## First configuration

For the new project you can set wrangler options via command line or install npm package
Command line

```bash
npx wrangler pages download config aleph-miha-primc
```

Properly config `wrangler.toml` file

# Release procedures

Command `npm version ...` will:

1. run `preversion` npm script
1. changed version in `package.json` and `package-lock.json` files
1. run `version` npm script
1. create new commit with commit message as defined in `-m` argument
1. tag this new commit message as version with `v*` prefix (examples: v1.0.0, v1.1.1-SNAPSHOT.0, ...)
1. run `postversion` npm script

## Start first project release

You should first create new release branch: `git checkout -b release-1.0` and then push it to remote repository with `git push --set-upstream origin release-1.0`.

After that you should create a tagged commit with SNAPSHOT version. You can do that by running `npm version prerelease --preid=SNAPSHOT -m "Chore: Update to version %s"`. This will create your first SNAPSHOT version **1.0.0-SNAPSHOT.0**. You can then use `npm version prerelease --preid=SNAPSHOT -m "Chore: Update to version %s"` to release additional SNAPSHOT versions. Next SNAPSHOT version in this case would be **1.0.0-SNAPSHOT.1**

When project is good enough to release a release candidate (RC) version, you should run `npm version prerelease --preid=RC -m "Chore: Update to version %s"`. You can release multiple RC versions, but you shouldn't release any SNAPSHOT versions after first RC version was released. After creating RC version, version should be **1.0.0-RC.0**, **1.0.0-RC.1** etc.

When project is good enough to release a general availability (GA) version, you should run `npm version major -m "Chore: Update to version %s"`. Project will now be versioned as **1.0.0**.

After releasing GA version, you should start new bug-fix version. You can start new bug-fix version by running `npm version prepatch --preid=SNAPSHOT -m "Chore: Update to version %s"`. This will start a new bug-fix version **1.0.1-SNAPSHOT.0**.

Then merge this branch to `master` branch.

## Release new patch version (bug-fix)

As you always start new patch version after releasing GA version, you should already be on correct SNAPSHOT version. If you are not, you should then use `npm version prepatch --preid=SNAPSHOT -m "Chore: Update to version %s"` to start new patch version. You should be on version similar to **1.0.1-SNAPSHOT.0**.

You can then use `npm version prerelease --preid=SNAPSHOT -m "Chore: Update to version %s"` to release additional SNAPSHOT versions (**1.0.1-SNAPSHOT.1**, **1.0.1-SNAPSHOT.2**, ...).

When project is good enough to release a release candidate (RC) version, you should run `npm version prerelease --preid=RC -m "Chore: Update to version %s"`. This should create version **1.0.1-RC.0**. You can release multiple RC versions, but you shouldn't release any SNAPSHOT versions after first RC version was released (**1.0.1-RC.1**, **1.0.1-RC.2**, ...).

When project is good enough to release a general availability (GA) version, you should run `npm version patch -m "Chore: Update to version %s"`. This will create version **1.0.1**.

After releasing GA version, you should start new bug-fix version. You can start new bug-fix version by running `npm version prepatch --preid=SNAPSHOT -m "Chore: Update to version %s"`. This will start a new bug-fix version **1.0.2-SNAPSHOT.0**.

Then up-merge this branch to higher `release-x.y` branches and finally `master`.

_**NOTE:** Merging different versions tree can and will sometimes cause merge conflicts. After merging, package.json and package-lock.json should have the branch current version number!_

## Release new minor release (feature)

You should first create new release branch: `git checkout -b release-1.1` and then push it to remote repository with `git push --set-upstream origin release-1.1`.

After that you should create a tagged commit with SNAPSHOT version. You can do that by running `npm version preminor --preid=SNAPSHOT -m "Chore: Update to version %s"`. This will create your first SNAPSHOT version **1.1.0-SNAPSHOT.0**. You can then use `npm version prerelease --preid=SNAPSHOT -m "Chore: Update to version %s"` to release additional SNAPSHOT versions.

When project is good enough to release a release candidate (RC) version, you should run `npm version prerelease --preid=RC -m "Chore: Update to version %s"`. This will create version **1.1.0-RC.0**. You can release multiple RC versions, but you shouldn't release any SNAPSHOT versions after first RC version was released (**1.1.0-RC.1**, **1.1.0-RC.2**, ...).

When project is good enough to release a general availability (GA) version, you should run `npm version minor -m "Chore: Update to version %s"`. This will create version **1.1.0**.

After releasing GA version, you should start new bug-fix version. You can start new bug-fix version by running `npm version prepatch --preid=SNAPSHOT -m "Chore: Update to version %s"`. This will start a new bug-fix version **1.1.1-SNAPSHOT.0**.

Then up-merge this branch to higher `release-x.y` branches and finally `master`.

_**NOTE:** Merging different versions tree can and will sometimes cause merge conflicts. After merging, package.json and package-lock.json should have the branch current version number!_

## Start new major release (breaking)

You should first create new release branch: `git checkout -b release-2.0` and then push it to remote repository with `git push --set-upstream origin release-2.0`.

After that you should create a tagged commit with SNAPSHOT version. You can do that by running `npm version premajor --preid=SNAPSHOT -m "Chore: Update to version %s"`. This will create your first SNAPSHOT version **2.0.0-SNAPSHOT.0**. You can then use `npm version prerelease --preid=SNAPSHOT -m "Chore: Update to version %s"` to release additional SNAPSHOT versions (**2.0.0-SNAPSHOT.1**, **2.0.0-SNAPSHOT.2**, ...).

When project is good enough to release a release candidate (RC) version, you should run `npm version prerelease --preid=RC -m "Chore: Update to version %s"`. This will create version **2.0.0-RC.0**. You can release multiple RC versions, but you shouldn't release any SNAPSHOT versions after first RC version was released (**2.0.0-RC.1**, **2.0.0-RC.2**, ...).

When project is good enough to release a general availability (GA) version, you should run `npm version major -m "Chore: Update to version %s"`. This will create version **2.0.0**.

After releasing GA version, you should start new bug-fix version. You can start new bug-fix version by running `npm version prepatch --preid=SNAPSHOT -m "Chore: Update to version %s"`. This will start a new bug-fix version **2.0.1-SNAPSHOT.0**.

Then up-merge this branch to higher `release-x.y` branches and finally `master`.
