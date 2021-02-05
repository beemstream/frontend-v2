import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { StreamCategory, StreamCategoryService } from '../stream-category.service';

enum TemplateCategory {
  webdevelopment = 'Web Development',
  mobiledevelopment = 'Mobile Development',
  gamedevelopment = 'Game Development',
  programming = 'General Programming',
}

enum TemplateDescription {
  webdevelopment = `
  Browse from the most popular React. To a true open source VueJs. To the enterprise grade Angular streams!
  Maybe even finding a framework that was made 12 hours ago!
  `,
  mobiledevelopment = `
  Are you a classic Java developer? Or a hipster Kotlin developer? Maybe you 1UP everyone by knowing
  Swift. Mobile developers and all the native goodness are here.
    `,
  gamedevelopment = `
  From Unity development to storyboarding to full on game engine development.
    Developers seem to share everything these days with all the nitty gritty details!
  `,
  programming = `
  Clearly these tags are general enough to suit the common developer. Compuer Science/Engineering is a big world.
    All the out of topic developers are here!
  `,
}

@Component({
  selector: 'nbp-browse-category-detail',
  templateUrl: './browse-category-detail.component.html',
  styleUrls: ['./browse-category-detail.component.css']
})
export class BrowseCategoryDetailComponent implements OnInit {

  category?: StreamCategory;

  templateCategory = TemplateCategory;

  templateDesciption = TemplateDescription;

  streamCategoryList = this.route.params.pipe(
    tap((query) => this.category = query.category),
    switchMap((query) => this.categoryService.getStreamByCategory(query.category))
  );

  constructor(private route: ActivatedRoute, private categoryService: StreamCategoryService) {}

  ngOnInit(): void {
  }
}