import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  StreamCategory,
  StreamCategoryService,
} from '../stream-category.service';

enum TemplateCategory {
  webdevelopment = 'Web Development',
  mobiledevelopment = 'Mobile Development',
  gamedevelopment = 'Game Development',
  programming = 'General Programming',
}

export enum TemplateDescription {
  webdevelopment = `
  Browse from the most popular React. To a true open source VueJs.
  To the enterprise grade Angular streams! Maybe even finding a framework that was made 12 hours ago!
  Or perhaps you decided to go lower level with Web Assembly using Rustlang?
  How about an ecosystem/language of its own in the frontend world like Svelte?
  We cannot keep up!`,
  mobiledevelopment = `
  Are you a classic Java developer? Or a hipster Kotlin developer?
  Maybe you 1UP everyone by knowing Swift. Mobile developers and all the native goodness are here.
    They say hybrid solutions are growing in the native space as well,
  would someone dare show NativeScript? Or stay safe with React Native or Ionic framework,
  choose your poison. Want a big company backed project? Have you perhaps heard of Flutter?
  `,
  gamedevelopment = `
  From Unity development to storyboarding to full on game engine development.
    Developers seem to share everything these days with all the nitty gritty details!
  They say Godot is coming a long way too! Game development is a vast topic ranging
  from 2D, 3D, designing assets, creating collision libraries, music, digital art.
    The thought of one person doing it all sounds ambitious and yet rewarding for some!
  `,
  programming = `
  Clearly these tags are general enough to suit the common developer.
    Compuer Science/Engineering is a big world. All the out of topic developers are here!
  Variety is always a good thing for viewers. Perhaps some still use Java to show years
    of maturity as a langauge. Or the ever popular and simple Golang?
  Take it up a notch by checking out C++ streams,
  or dare I say the ever competing most loved Rustlang.
    `,
}

@Component({
  selector: 'nbp-browse-category-detail',
  templateUrl: './browse-category-detail.component.html',
  styleUrls: ['./browse-category-detail.component.css'],
})
export class BrowseCategoryDetailComponent {
  searchValue = new BehaviorSubject<string>('');

  category!: StreamCategory;

  templateCategory = TemplateCategory;

  templateDesciption = TemplateDescription;

  streamCategoryList = this.route.params.pipe(
    tap((query) => (this.category = query.category)),
    switchMap((query) => this.categoryService.getStreams(query.category)),
    shareReplay(1)
  );

  availableLanguages?: Observable<
    string[]
  > = this.categoryService.getAvailableLanguages();

  templateStreams = this.streamCategoryList;

  constructor(
    private route: ActivatedRoute,
    private categoryService: StreamCategoryService
  ) {}

  filteredStreams = this.searchValue.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((searchTerm) => {
      return this.categoryService.searchStreams(searchTerm, this.category);
    })
  );

  forceRefresh() {
    this.templateStreams = this.categoryService.getStreams(this.category);
  }
}
