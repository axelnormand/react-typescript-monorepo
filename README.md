# React + Typescript Mono repo

Using Lerna, Yarn Workspaces, TS 3.0 project references to make a hopefully useful react monorepo 

Here you could publish the "common" library to npm too so other projects can use it

Am attempting a nice full example including storybook, styled components, babel 7, hot reloading etc

Also trying to share build config, tsconfig etc too

## Install & Run

* Install node
* `yarn install`
* `yarn start` : runs app
* `yarn storybook` : runs storybook for app
* `yarn compile:watch` : compiles, type checks and watches all typescript. Can use form IDE.
* `yarn test` : runs all jest tests across projects

