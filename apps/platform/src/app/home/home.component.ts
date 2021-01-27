import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  foo = [];

  ngOnInit(): void {
      let a = [];
      for (let i = 0; i < 200; i++) {
          a.push({ bleh: i });
      }
      this.foo = a;
  }

}
