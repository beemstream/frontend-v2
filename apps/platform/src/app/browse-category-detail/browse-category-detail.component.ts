import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StreamCategoryService } from '../stream-category.service';

@Component({
  selector: 'nbp-browse-category-detail',
  templateUrl: './browse-category-detail.component.html',
  styleUrls: ['./browse-category-detail.component.css']
})
export class BrowseCategoryDetailComponent implements OnInit {

  streamCategoryList = this.route.params.pipe(
    switchMap((query) => this.categoryService.getStreamByCategory(query.category))
  );

  constructor(private route: ActivatedRoute, private categoryService: StreamCategoryService) {
  }

  ngOnInit(): void {
  }

}
