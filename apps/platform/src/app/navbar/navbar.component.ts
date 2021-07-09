import { Component } from '@angular/core';
import { faBars, faTimes, faGift } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import {
  TwitchOauthService,
  TwitchValidateToken,
} from '../twitch-oauth.service';

@Component({
  selector: 'nbp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navOptions = { exact: true };
  isNavActive = false;
  faBars = faBars;
  faTimes = faTimes;
  faGift = faGift;

  get icon() {
    return this.isNavActive ? this.faTimes : this.faBars;
  }

  userDetails: Observable<TwitchValidateToken> = this.twitchService.getValidateUserToken();

  constructor(private twitchService: TwitchOauthService) {}

  toggleMobileNav() {
    this.isNavActive = !this.isNavActive;
  }
}
