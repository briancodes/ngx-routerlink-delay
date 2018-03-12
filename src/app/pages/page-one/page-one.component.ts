import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bc-page-one',
    template: `
    <div class="demo-page page-one">
        <h1>Page One</h1>
    </div>
  `,
    styles: [`
        .page-one {
            background-color: #ebb048;
            position: absolute;
            display: flex;
           align-items: center;
           justify-content: center;
            bottom: 10%;
            top: 10%;
            right: 10%;
            left: 10%;
            border-radius: 10px;
            background-size: cover;
            background-position: top center;
            background-image: url('assets/pexels-photo-755385.jpeg');
        }
        h1 {
            text-transform: uppercase;
            font-size: 3em;
            font-weight: bold;
            background-color: #414141;
            color: ghostwhite;
            border-radius: 10px;
            padding: 0px 15px;
        }
    `]
})
export class PageOneComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
