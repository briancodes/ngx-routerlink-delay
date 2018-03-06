import { Directive, Input, HostListener } from '@angular/core';
import { RouterLinkWithHref, Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

/**
 * Extends {@link RouterLinkWithHref}
 * @see https://github.com/angular/angular/blob/master/packages/router/src/directives/router_link.ts
 */
@Directive({
    selector: 'a[bcRouterLink]'
})
export class RouterLinkWithHrefDelay extends RouterLinkWithHref {

    @Input() navigationDelay = 0;

    @Input()
    set bcRouterLink(commands: any[] | string) {
        this.routerLink = commands;
    }

    constructor(router: Router, route: ActivatedRoute, locationStrategy: LocationStrategy) {
        super(router, route, locationStrategy);
    }

    @HostListener('click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'])
    onClick(button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean {
        // clone the checks being made in super()
        if (button !== 0 || ctrlKey || metaKey || shiftKey) {
            return true;
        }

        if (typeof this.target === 'string' && this.target !== '_self') {
            return true;
        }

        // Omits Observable.timer 'period' argument so  runs once
        const timerSub = Observable.timer(this.navigationDelay)
            .subscribe(t => {
                timerSub.unsubscribe();
                super.onClick(button, ctrlKey, metaKey, shiftKey);
            });

        return false;
    }
}
