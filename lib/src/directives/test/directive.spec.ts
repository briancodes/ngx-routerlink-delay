import { TestBed, async, tick, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement, Type } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SpyLocation } from '@angular/common/testing';
import { Location } from '@angular/common';

import { RouterLinkDelayModule } from '../../router-link-delay.module';
import { RouterLinkWithHrefDelay } from '../router-link-delay';
import { create } from 'domain';

// **********************
// Test Components

@Component({
    template: `
        <a [bcRouterLink]="['/page-one']" bcRouterLinkActive="active" [navigationDelay]="1000">
            Page One
        </a>
        <a bcRouterLink="/page-two" bcRouterLinkActive="active" [navigationDelay]="2000">
            Page Two
        </a>
        <div></div>
        <router-outlet></router-outlet>
    `
})
class AppComponent {
}

@Component({
    template: `Page Zero Template`
})
class PageZeroComponent {
}

@Component({
    template: `Page One Template`
})
class PageOneComponent {
}

@Component({
    template: `Page Two Template`
})
class PageTwoComponent {
}

const routes: Routes = [
    { path: '', redirectTo: 'page-zero', pathMatch: 'full' },
    { path: 'page-zero', component: PageZeroComponent },
    { path: 'page-one', component: PageOneComponent },
    { path: 'page-two', component: PageTwoComponent }
];

// **********************
// Tests

let location: SpyLocation;
let router: Router;
let fixture: ComponentFixture<AppComponent>;
let links;

let pageOneLink: DebugElement;
let pageTwoLink: DebugElement;

// @see https://github.com/angular/angular/blob/master/aio/content/examples/testing/src/app/app.component.router.spec.ts
describe('Routing with RouterLinkWithHrefDelay', () => {

    // run before each enclosed spec (it)
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                RouterLinkDelayModule
            ],
            declarations: [
                AppComponent,
                PageZeroComponent,
                PageOneComponent,
                PageTwoComponent,
            ]
        });
    });

    it('should navigate to "Page Zero" immediately', fakeAsync(() => {
        createComponent();
        expectLocationPathToEqual('/page-zero');
        expectFixtureToContain(PageZeroComponent);
    }));
});

function createComponent() {
    fixture = TestBed.createComponent(AppComponent);

    const injector = fixture.debugElement.injector;
    location = injector.get(Location) as SpyLocation;
    router = injector.get(Router);

    links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHrefDelay));
    pageOneLink = links[0];
    pageTwoLink = links[1];

    router.initialNavigation();
    advance();
}

// **********************
// Helper Functions:
// See https://github.com/angular/angular/blob/master/aio/content/examples/testing/src/testing/index.ts

// See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
const ButtonClickEvents = {
    left: { button: 0 },
    right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}

/**
 * Advance to the routed page
 * Wait a tick, then detect changes, and tick again
 */
function advance(): void {
    tick(); // wait while navigating
    fixture.detectChanges(); // update view
    tick(); // wait for async data to arrive
}

function expectLocationPathToEqual(path: string, expectationFailOutput?: any) {
    expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectFixtureToContain(type: Type<any>): any {
    const el = fixture.debugElement.query(By.directive(type));
    expect(el).toBeTruthy('expected an element for ' + type.name);
    return el;
}
