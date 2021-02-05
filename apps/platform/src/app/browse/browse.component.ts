import { Component } from '@angular/core';
import {
  faArrowRight,
  faGamepad,
  faKeyboard,
  faLaptop,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { forkJoin, Observable } from 'rxjs';
import { flatMap, reduce, take } from 'rxjs/operators';
import {
  StreamCategoryService,
  StreamCategory,
} from '../stream-category.service';
import { StreamInfo } from '../stream-info';

@Component({
  selector: 'nbp-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  providers: [StreamCategoryService],
})
export class BrowseComponent {
  limit = 5;
  readonly web = this.limitTo(
    this.streamService.getStreamByCategory(StreamCategory.WebDevelopment),
    this.limit
  );
  readonly mobile = this.limitTo(
    this.streamService.getStreamByCategory(StreamCategory.MobileDevelopment),
    this.limit
  );
  readonly game = this.limitTo(
    this.streamService.getStreamByCategory(StreamCategory.GameDevelopment),
    this.limit
  );
  readonly programming = this.limitTo(
    this.streamService.getStreamByCategory(StreamCategory.Programming),
    this.limit
  );

  readonly allCategories = forkJoin([
    this.game,
    this.web,
    this.mobile,
    this.programming,
  ]);

  faGamepad = faGamepad;

  faMobileAlt = faMobileAlt;

  faLaptop = faLaptop;

  faKeyboard = faKeyboard;

  faArrowRight = faArrowRight;

  streamCategory = StreamCategory;

  constructor(private streamService: StreamCategoryService) {}

  limitTo(stream: Observable<StreamInfo[]>, limit: number) {
    return stream.pipe(
      flatMap((s) => s),
      take(limit),
      reduce((a, c) => {
        a.push(c);
        return a;
      }, [] as StreamInfo[])
    );
  }
}
