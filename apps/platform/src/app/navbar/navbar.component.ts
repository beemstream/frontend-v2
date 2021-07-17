import { Component, OnDestroy } from '@angular/core';
import {
  faBars,
  faTimes,
  faGift,
  faUserCircle,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import {
  TwitchOauthService,
  TwitchValidateToken,
} from '../twitch-oauth.service';

@Component({
  selector: 'nbp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  navOptions = { exact: true };
  isNavActive = false;
  faBars = faBars;
  faTimes = faTimes;
  faGift = faGift;
  faSignOutAlt = faSignOutAlt;
  logoutSubscription: Subscription | undefined;

  get icon() {
    return this.isNavActive ? this.faTimes : this.faBars;
  }

  faUserCircle = faUserCircle;

  userDetails: Observable<TwitchValidateToken | null> = this.twitchService
    .getValidateUserToken()
    .pipe(share());

  logout() {
    this.logoutSubscription = this.twitchService
      .logout()
      .pipe(tap(() => window.location.reload()))
      .subscribe();
  }

  constructor(private twitchService: TwitchOauthService) {}

  ngOnDestroy() {
    this.logoutSubscription?.unsubscribe();
  }

  toggleMobileNav() {
    this.isNavActive = !this.isNavActive;
  }
}
