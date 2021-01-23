import { Component, OnInit } from '@angular/core';
import { faBars, faTimes, faGift } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nbp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navOptions = { exact: true };
  isNavActive = false;
  faBars = faBars;
  faTimes = faTimes;
  faGift = faGift;

  get icon() {
    return this.isNavActive ? this.faTimes : this.faBars;
  }

  constructor() { }

  ngOnInit(): void {
  }

  toggleMobileNav() {
    this.isNavActive = !this.isNavActive;
  }

}
