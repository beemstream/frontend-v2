import { Component } from '@angular/core';
import {
  faGamepad,
  faKeyboard,
  faLaptop,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TemplateDescription } from './browse-category-detail/browse-category-detail.component';
import {
  StreamCategory,
  StreamCategoryService,
  StreamCategoryServiceProvider,
} from '../services/stream-category.service';
import { StreamInfo } from '../stream-info';

@Component({
  selector: 'nbp-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers: [StreamCategoryServiceProvider],
})
export class BrowseComponent {
  limit = 5;

  readonly web = this.limitLength(
    this.streamService.getStreams(StreamCategory.WebDevelopment)
  );

  readonly mobile = this.limitLength(
    this.streamService.getStreams(StreamCategory.MobileDevelopment)
  );

  readonly game = this.limitLength(
    this.streamService.getStreams(StreamCategory.GameDevelopment)
  );

  readonly programming = this.limitLength(
    this.streamService.getStreams(StreamCategory.Programming)
  );

  readonly allCategories = zip(
    this.game,
    this.web,
    this.mobile,
    this.programming
  );

  readonly streamCategories = [
    {
      link: StreamCategory.GameDevelopment,
      icon: faGamepad,
      title: 'Game Development',
      description: TemplateDescription.gamedevelopment,
    },
    {
      link: StreamCategory.WebDevelopment,
      icon: faLaptop,
      title: 'Web Development',
      description: TemplateDescription.webdevelopment,
    },
    {
      link: StreamCategory.MobileDevelopment,
      icon: faMobileAlt,
      title: 'Mobile Development',
      description: TemplateDescription.mobiledevelopment,
    },
    {
      link: StreamCategory.Programming,
      icon: faKeyboard,
      title: 'General Programming',
      description: TemplateDescription.programming,
    },
  ];

  constructor(private streamService: StreamCategoryService) {}

  limitLength(stream: Observable<StreamInfo[]>) {
    const limit = stream.pipe(map((s) => s.slice(0, this.limit)));

    return stream.pipe(switchMap((s) => (s.length > 0 ? limit : stream)));
  }

  trackStreamCategory(index: number) {
    return index;
  }
}
