# NOTE: WIP - Do not install yet

# NgxRouterlinkDelay

Packaged as an Angular compliant module using [ng-packagr](https://github.com/dherges/ng-packagr)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

# Build and Run

## Build the library

* `npm run build:lib`

This will create a `dist/lib` folder with generated Angular module for distribution

## Local symbolic npm link

Open the prompt in the `dist/lib` folder, and run:
* `npm link`

In the application root e.g. ngx-routerlink-delay folder, run: 
* `npm link @bcodes/ngx-routerlink-delay`

## Run
* `ng serve`

# Testing

The tests are contained in the `lib/src/directives/test` folder. The files to be tested are imported from the `dist/lib` folder, so we are testing the bundled library.

The test files are located outside of the root `src` folder and required the following changes to the test setup:

`tsconfig.spec.json`
```json
tsconfig.spec.json

"include": [
    "../lib/**/*.spec.ts",
    "**/*.spec.ts",
    "**/*.d.ts"
  ]
```
`tests.ts`
```javascript 
const context_lib = require.context('../lib', true, /\.spec\.ts$/);
context_lib.keys().map(context_lib);
```

Run the tests with `ng test`, or `npm run test:lib` to do a build and test








