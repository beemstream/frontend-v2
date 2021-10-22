import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { SeoService } from '../../services/seo.service';
import {
  StreamCategory,
  StreamCategoryService,
} from '../../services/stream-category.service';

enum TemplateCategory {
  webdevelopment = 'Web Development',
  mobiledevelopment = 'Mobile Development',
  gamedevelopment = 'Game Development',
  programming = 'General Programming',
}

export enum TemplateDescription {
  webdevelopment = `
  Browse from the most popular <a class="text-red-500 hover:text-red-700" href="https/reactjs.org" target="_blank" title="ReactJs">React</a>. To a true open source <a class="text-red-500 hover:text-red-700" href="https://vuejs.org" target="_blank" title="VueJs">VueJs</a>.
  To the enterprise grade <a class="text-red-500 hover:text-red-700" href="https://angular.io" target="_blank" title="Angular">Angular</a> streams! Maybe even finding a framework that was made 12 hours ago!
  Or perhaps you decided to go lower level with Web Assembly using <a class="text-red-500 hover:text-red-700" href="https://rust-lang.org" target="_blank" title="Rustlang">Rustlang</a>?
  How about an ecosystem/language of its own in the frontend world like <a class="text-red-500 hover:text-red-700" href="https://svelte.dev" title="Svelte" target="_blank">Svelte</a>?
  We cannot keep up!`,
  mobiledevelopment = `
  Are you a classic <a class="text-red-500 hover:text-red-700" href="https://docs.oracle.com/en/java/index.html" target="_blank" title="Java">Java</a> developer? Or a hipster <a class="text-red-500 hover:text-red-700" href="https://kotlinlang.org" target="_blank" title="Kotlin">Kotlin</a> developer?
  Maybe you 1UP everyone by knowing <a class="text-red-500 hover:text-red-700" href="https://swift.org" target="_blank" title="Swift">Swift<a>. Mobile developers and all the native goodness are here.
    They say hybrid solutions are growing in the native space as well,
  would someone dare show <a class="text-red-500 hover:text-red-700" href="https://nativescript.org" target="_blank" title="NativeScript">NativeScript</a>? Or stay safe with <a class="text-red-500 hover:text-red-700" href="https://reactnative.dev" target="_blank" title="React Native">React Native</a> or <a class="text-red-500 hover:text-red-700" href="https://ionicframework.com" target="_blank" title="Iconic Framework">Ionic framework</a>,
  choose your poison. Want a big company backed project? Have you perhaps heard of <a class="text-red-500 hover:text-red-700" href="https://flutter.dev" target="_blank" title="Flutter">Flutter</a>?
  `,
  gamedevelopment = `
  From <a class="text-red-500 hover:text-red-700" href="https://unity.com" title="Unity Engine" target="_blank">Unity</a> development to storyboarding to full on game engine development.
    Developers seem to share everything these days with all the nitty gritty details!
  They say <a class="text-red-500 hover:text-red-700" href="https://godotengine.org" title="Godot Engine" target="_blank">Godot</a> is coming a long way too! Game development is a vast topic ranging
  from 2D, 3D, designing assets, creating collision libraries, music, digital art.
    The thought of one person doing it all sounds ambitious and yet rewarding for some!
  `,
  programming = `
  Clearly these tags are general enough to suit the common developer.
    Compuer Science/Engineering is a big world. All the out of topic developers are here!
  Variety is always a good thing for viewers. Perhaps some still use <a class="text-red-500 hover:text-red-700" href="https://docs.oracle.com/en/java/index.html" title="Java" target="_blank">Java</a> to show years
    of maturity as a langauge. Or the ever popular and simple <a class="text-red-500 hover:text-red-700" href="https://golang.org" target="_blank" title="GoLang">Golang</a>?
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
  templateCategory = TemplateCategory;

  templateDesciption = TemplateDescription;

  category: Observable<StreamCategory> = this.route.params.pipe(
    map((query) => query.category)
  );

  streamCategoryList = this.category.pipe(
    tap((category) =>
      this.seoService.addTitle(
        `Livestream ${
          this.templateCategory[category as keyof typeof TemplateCategory]
        } with your Favourite Technologies`
      )
    ),
    switchMap((category) => this.categoryService.getStreams(category)),
    shareReplay(1)
  );

  availableLanguages = this.streamCategoryList.pipe(
    switchMap(() => this.categoryService.getAvailableLanguages())
  );

  availableProgrammingLanauges = this.streamCategoryList.pipe(
    switchMap(() => this.categoryService.getAvailableProgrammingLanguages())
  );

  templateStreams = this.streamCategoryList;

  constructor(
    private route: ActivatedRoute,
    private categoryService: StreamCategoryService,
    private readonly seoService: SeoService
  ) {}

  forceRefresh(category: StreamCategory) {
    this.templateStreams = this.categoryService.getStreams(category);
  }
}
