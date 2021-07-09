import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith, switchMap } from 'rxjs/operators';
import { SeoService } from '../seo.service';
import { StreamCategoryService } from '../stream-category.service';
import { TwitchOauthService } from '../twitch-oauth.service';
import { TwitchService } from '../twitch.service';

@Component({
  selector: 'nbp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StreamCategoryService],
})
export class HomeComponent {
  streams = this.streamCategoryService.getStreams();

  availableLanguages = this.streamCategoryService.getAvailableLanguages();

  availableProgrammingLanguages = this.streamCategoryService.getAvailableProgrammingLanguages();

  templateStreams = this.streams;

  userFollows = this.twitchOauthService.getAccessToken().pipe(
    combineLatestWith(this.twitchOauthService.getValidateUserToken()),
    switchMap(([first, second]) => {
      return this.twitchService.getUserFollows(
        first.access_token,
        second.user_id
      );
    })
  );

  token = this.route.queryParams.pipe(
    switchMap(
      (params) =>
        params.code && this.twitchOauthService.fetchAccessToken(params.code)
    ),
    switchMap(() => this.twitchOauthService.getAccessToken())
  );

  constructor(
    private readonly streamCategoryService: StreamCategoryService,
    private readonly seoService: SeoService,
    private readonly twitchOauthService: TwitchOauthService,
    private readonly route: ActivatedRoute,
    private readonly twitchService: TwitchService
  ) {
    this.seoService
      .addTitle('Livestream your Favourite Programming Language')
      .addDescription(
        `BeemStream is a livestream platform currently powered by twitch.tv. Find programming livestreams ranging from web development, mobile development and software development. Sort by programming language, get searching from rustlang, javascript, typescript, python. golang and other diverse languages! Switch between spoken languages and sort by most popular, needs love, longest lived stream to streams that have just started.`
      )
      .addImage('https://beemstream.com/assets/logo.png', 600, 600);
  }

  forceRefresh() {
    this.templateStreams = this.streamCategoryService.refreshStreams();
  }
}
