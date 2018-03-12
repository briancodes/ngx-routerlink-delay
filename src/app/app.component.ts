import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ngx-routerlinkdelay';
    isMenuOpen = false;
    isDelay = true;

    menuButtonClick(event: MouseEvent) {
        this.isMenuOpen = !this.isMenuOpen;
    }

    onLinkClick(event: MouseEvent) {
        this.isMenuOpen = false;
    }

    onCheckboxChange(event: Event) {
        const value = event.target['checked'];
        this.isDelay = value;
    }
}
