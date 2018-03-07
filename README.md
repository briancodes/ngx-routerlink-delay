# NOTE: WIP - Do not install yet

# NgxRouterlinkDelay

Extension of the RouterLinkWithHref directive `a[routerLink]` with an additional `@Input` data binding for delaying navigation: `[navigationDelay]="100"`

Packaged as an Angular compliant module using [ng-packagr](https://github.com/dherges/ng-packagr)

Project generated with [Angular CLI](https://github.com/angular/angular-cli)

# Usage

```bash
npm install @bcodes/ngx-routerlink-delay
```
Replace `routerLink` with `bcRouterLink` and `routerLinkActive` with `bcRouterLinkActive`

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
> Internally `routerLinkActive` queries the template for the `type` of the `routerLink` directive. Extending `routerLink` means we also have to extend `routerLinkActive` to query for the new `type` 

# Library Development: Build, Run, Test

## Build the library

* `npm run build:lib`

This will create a `dist/lib` folder with generated Angular module for distribution

### Local symbolic npm link

For testing the bundled module locally, you can use `npm link`. You will firstly need to replace the `import` in `app.module.ts` as follows: 

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








