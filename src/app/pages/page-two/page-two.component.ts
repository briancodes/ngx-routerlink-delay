import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'bc-page-two',
    template: `
    <div class="demo-page page-two">
        <h1>Page Two</h1>
    </div>
  `,
    styles: [`
       .page-two {
           position: absolute;
           display: flex;
           align-items: center;
           justify-content: center;
           bottom: 10%;
           top: 10%;
           right: 10%;
           left: 10%;
           border-radius: 10px;
           background-color: #d96666;
           background-size: cover;
           background-position: top center;
           background-image: url('/assets/pexels-photo-440731.jpeg');
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
export class PageTwoComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
