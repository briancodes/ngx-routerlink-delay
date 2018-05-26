import { Directive, Input, HostListener, OnDestroy } from '@angular/core';
import { RouterLinkWithHref, Router, ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { timer, SubscriptionLike } from 'rxjs';
/**
 * Extends {@link RouterLinkWithHref}
 * @see https://github.com/angular/angular/blob/master/packages/router/src/directives/router_link.ts
 */
@Directive({
    selector: 'a[bcRouterLink]'
})
export class RouterLinkWithHrefDelay extends RouterLinkWithHref implements OnDestroy {

    @Input() navigationDelay = 0;

    @Input()
    set bcRouterLink(commands: any[] | string) {
        this.routerLink = commands;
    }

    private timerSubscription: SubscriptionLike;

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
        this.timerSubscription = timer(this.navigationDelay)
            .subscribe(t => {
                this.timerSubscription.unsubscribe();
                super.onClick(button, ctrlKey, metaKey, shiftKey);
            });

        return false;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        // If the component is destroyed before the timer completes
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }
}
