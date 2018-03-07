import { TestBed, async, tick, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement, Type } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SpyLocation } from '@angular/common/testing';
import { Location } from '@angular/common';

// Importing from the distibutable folder
import { RouterLinkDelayModule, RouterLinkWithHrefDelay } from '../../dist/lib';

// **********************
// Test Components

const firstDelay = 1000;
const secondDelay = 150;

@Component({
    template: `
        <a *ngIf="showPageOneLink"
            [bcRouterLink]="['/page-one']"
            bcRouterLinkActive="active"
            [navigationDelay]="pageOneDelay"
            [preserveFragment]="isPreserveFragment"
            >
            Page One
        </a>
        <a [bcRouterLink]="['page-two']"
            bcRouterLinkActive="active"
            [navigationDelay]="pageTwoDelay"
            [skipLocationChange]="isSkipLocationChange">
            Page Two
        </a>

        <div></div>
        <router-outlet></router-outlet>
    `
})
class AppComponent {
    pageOneDelay = firstDelay;
    pageTwoDelay = secondDelay;

    showPageOneLink = true;

    isPreserveFragment = false;
    isSkipLocationChange = false;
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
let fixtureAppComponent: ComponentFixture<AppComponent>;
let links: DebugElement[];

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

    it('should navigate to "Page One" after delay, become "active" ', fakeAsync(() => {
        createComponent();
        click(pageOneLink);
        tick(firstDelay / 2);
        expectLocationPathToEqual('/page-zero'); // no navigation yet

        // Check active class
        const classes = pageOneLink.classes;
        expect(classes.active).toBe(undefined);

        tick(firstDelay / 2);
        expectLocationPathToEqual('/page-one'); // navigates after delay
        expectFixtureToContain(PageOneComponent);

        // Check active class set
        expect(classes.active).toBe(true);
    }));

    it('should navigate to "Page Two" after delay, become "active" ', fakeAsync(() => {
        createComponent();
        click(pageTwoLink);
        tick(secondDelay / 2);
        expectLocationPathToEqual('/page-zero');

        // Check active class
        const classes = pageTwoLink.classes;
        expect(classes.active).toBe(undefined);

        tick(secondDelay / 2);
        expectLocationPathToEqual('/page-two');
        expectFixtureToContain(PageTwoComponent);

        // Check active class set
        expect(classes.active).toBe(true);

    }));

    it('should not navigate if right click or ctrlKey pressed ', fakeAsync(() => {
        createComponent();
        // Right Click
        click(pageOneLink, ButtonClickEvents.right);
        tick(firstDelay);
        expectLocationPathToEqual('/page-zero');

        // Ctrl Key
        click(pageOneLink, ButtonClickEvents.ctrlKey);
        tick(firstDelay);
        expectLocationPathToEqual('/page-zero');

        // Make sure not false positives - e.g. that tick(firstDelay) would have navigated
        click(pageOneLink);
        tick(firstDelay);
        expectLocationPathToEqual('/page-one');

    }));

    it('should not navigate if ngOnDestroy() called before delay is complete ', fakeAsync(() => {
        createComponent();

        click(pageOneLink);
        tick(firstDelay / 2);
        expectLocationPathToEqual('/page-zero');

        // trigger ngOnDestroy of the <a> element, and it's directives
        fixtureAppComponent.componentInstance.showPageOneLink = false;
        fixtureAppComponent.detectChanges();

        // Complete the timer
        tick(firstDelay);
        expectLocationPathToEqual('/page-zero');

    }));

    it('directive inputs for super class "routerLink" should work e.g. preserveFragment, skipLocationChagne ', fakeAsync(() => {
        createComponent();

        expectLocationPathToEqual('/page-zero');
        // Set a fragment on /page-zero
        router.navigate(['page-zero'], {fragment: 'top'});
        tick();
        expectLocationPathToEqual('/page-zero#top');

        // Update preserveFragment on the page-one link
        fixtureAppComponent.componentInstance.isPreserveFragment = true;
        fixtureAppComponent.detectChanges();

        click(pageOneLink);
        tick(firstDelay);
        expectLocationPathToEqual('/page-one#top'); // fragment was preserved

        // Update skipLocationChange on the page-two link
        fixtureAppComponent.componentInstance.isSkipLocationChange = true;
        fixtureAppComponent.detectChanges();

        click(pageTwoLink);
        tick(secondDelay);
        // Location should not have changed...
        expectLocationPathToEqual('/page-one#top');
        // ...but the Page Two component should be loaded
        expectFixtureToContain(PageTwoComponent);

    }));
});

function createComponent() {
    fixtureAppComponent = TestBed.createComponent(AppComponent);
    fixtureAppComponent.detectChanges();

    const injector = fixtureAppComponent.debugElement.injector;
    location = injector.get(Location) as SpyLocation;
    router = injector.get(Router);

    links = fixtureAppComponent.debugElement.queryAll(By.directive(RouterLinkWithHrefDelay));
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
    right: { button: 2 },
    ctrlKey: { ctrlKey: true },
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
function advance(time?: number): void {

    tick(); // wait while navigating
    fixtureAppComponent.detectChanges(); // update view
    tick(); // wait for async data to arrive
}

function expectLocationPathToEqual(path: string, expectationFailOutput?: any) {
    expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectFixtureToContain(type: Type<any>): any {
    const el = fixtureAppComponent.debugElement.query(By.directive(type));
    expect(el).toBeTruthy('expected an element of type ' + type.name);
    return el;
}
