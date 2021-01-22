import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  foo = [1,2,3,4,5];

  ngOnInit(): void {
  }

}
