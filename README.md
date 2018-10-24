# React + Typescript Mono repo

Using Lerna, Yarn Workspaces, TS 3.0 project references to make a hopefully useful react monorepo 

Here you could publish the "common" library to npm too so other projects can use it

Am attempting a nice full example including storybook, styled components, babel 7, hot reloading etc

Also trying to share build config, tsconfig etc too

## Install & Run

* Install node
* `yarn install`
* `yarn start` : runs apps and opens browser tab for each one
* `yarn storybook` : runs storybook for apps
* `yarn compile:watch` : compiles, type checks and watches all typescript. Can use form IDE.
* `yarn test:ci` : runs all jest tests across projects, lint, style lint
* `yarn build:ci`: creates bundles in the app*/dist directories, creates storybook static html in dist dir, analyses bundle in dist dir etc

## TODO

* Jest not working with code coverage: https://github.com/facebook/jest/issues/5417
* Using babel to transpile typescript would be great, avoids ts-jest and happypack etc, can use babel plugins more easily
* Getting styled components to have nice css class names
* Better sourcemaps, not working on the common library at the mo.
* Cooler webpack stuff like PWA generation etc