import { RouterLinkActive, Router } from '@angular/router';
import { Directive, ContentChildren, QueryList, ElementRef, Renderer2, ChangeDetectorRef, Input } from '@angular/core';
import { RouterLinkWithHrefDelay } from './router-link-delay';

/**
 * Extends {@link RouterLinkActive }
 * @see https://github.com/angular/angular/blob/master/packages/router/src/directives/router_link_active.ts
 */
@Directive({
    selector: 'a[bcRouterLinkActive]'
})
export class RouterLinkActiveDelay extends RouterLinkActive {

    // Override the linksWithHrefs with our selector component
    @ContentChildren(RouterLinkWithHrefDelay, { descendants: true })
    linksWithHrefs: QueryList<RouterLinkWithHrefDelay>;

    constructor(router: Router, element: ElementRef, renderer: Renderer2, cdr: ChangeDetectorRef) {
        super(router, element, renderer, cdr);
    }

    @Input()
    set bcRouterLinkActive(data: string[] | string) {
        this.routerLinkActive = data;
    }
}
