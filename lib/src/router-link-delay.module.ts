import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHrefDelay } from './directives/router-link-delay';
import { RouterLinkActiveDelay } from './directives/router-link-active-delay';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RouterLinkWithHrefDelay,
        RouterLinkActiveDelay
    ],
    exports: [
        RouterLinkWithHrefDelay,
        RouterLinkActiveDelay
    ]
})
export class RouterLinkDelayModule { }
