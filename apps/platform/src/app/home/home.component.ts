import { Component } from '@angular/core';
import { SeoService } from '../seo.service';
import { StreamCategoryService } from '../stream-category.service';

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

  constructor(
    private readonly streamCategoryService: StreamCategoryService,
    private readonly seoService: SeoService
  ) {
    this.seoService
      .addTitle('Livestream your Favourite Programming Language')
      .addDescription(
        `BeemStream is a livestream platform currently powered by twitch.tv. Find programming livestreams ranging from web development, mobile development and software development. Sort by programming language, get searching from rustlang, javascript, typescript, python. golang and other diverse languages! Switch between spoken languages and sort by most popular, needs love, longest lived stream to streams that have just started.`
      )
      .addImage('../../assets/logo.png', '600', '600');
  }

  forceRefresh() {
    this.templateStreams = this.streamCategoryService.refreshStreams();
  }
}
