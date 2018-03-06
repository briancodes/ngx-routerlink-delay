import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

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
