[![Build Status](https://travis-ci.org/briancodes/ngx-routerlink-delay.svg?branch=master)](https://travis-ci.org/briancodes/ngx-routerlink-delay)

# @bcodes/ngx-routerlink-delay

Extension of the RouterLinkWithHref directive `a[routerLink]` with an additional `@Input` data binding for delaying navigation

Packaged as an Angular module using [ng-packagr](https://github.com/dherges/ng-packagr)

Development project generated with [Angular CLI](https://github.com/angular/angular-cli)

# Usage

```bash
npm install @bcodes/ngx-routerlink-delay
```
To use the extended `routerLink` directive, import the module:
```javascript
import { RouterLinkDelayModule } from '@bcodes/ngx-routerlink-delay';`
```
Replace the default `routerLink` and `routerLinkActive` selectors with the extended ones: 

* `routerLink` -> `bcRouterLink` 
* `routerLinkActive` -> `bcRouterLinkActive`

The navigation delay `@Input` is in milliseconds: 
* [navigationDelay]="1000"

### Example
`app.component.html`
```html
<div>
    <a [bcRouterLink]="['/page-one']" bcRouterLinkActive="active" [navigationDelay]="1000">
        Page One
    </a>
    <a bcRouterLink="/page-two" bcRouterLinkActive="active" [navigationDelay]="2000">
        Page Two
    </a>
    <router-outlet></router-outlet>
</div>
```
`app.module.ts`
```typescript
import { AppComponent } from './app.component';

import { RouterLinkDelayModule } from '@bcodes/ngx-routerlink-delay';
import { PageOneComponent } from './pages/page-one/page-one.component';
import { PageTwoComponent } from './pages/page-two/page-two.component';

@NgModule({
    declarations: [
        AppComponent,
        PageOneComponent,
        PageTwoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterLinkDelayModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
> **Why bcRouterLinkActive?** Internally `routerLinkActive` queries the template using the `type` of the `routerLink` directive i.e. `RouterLinkWithHref`. Extending `routerLink` meant we also had to extend `routerLinkActive` to query for the new `type`

# Library Development: Build, Run, Test

## Build the library

* `npm run build:lib`

This will create a `dist/lib` folder with generated Angular module for distribution

### Live Reload

The library source (*lib/src*) is located alongside a ready-to-run *Angular ClI* project. The library module has been imported in `app.module.ts`, and is ready to roll as is. The project can be served with `ng serve`, and any changes made to the the directive source files in *lib/src* will trigger a live reload

### Symbolic npm link

For testing the *bundled* module locally, you can use `npm link`. You will firstly need to replace the `import` in `app.module.ts` as follows: 

```javascript
import { RouterLinkDelayModule } from '../../lib/src/router-link-delay.module';
// replace with 
import { RouterLinkDelayModule } from '@bcodes/ngx-routerlink-delay';
```

From the `dist/lib` folder run:
* `npm link`

In the application root e.g. ngx-routerlink-delay folder, run: 
* `npm link @bcodes/ngx-routerlink-delay`

## Run
* `ng serve` or
* `ng serve --preserve-symlinks`

## Testing

The tests are contained in the `lib/test` folder. The files to be tested are imported from the `dist/lib` folder, so we are testing the bundled library

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








