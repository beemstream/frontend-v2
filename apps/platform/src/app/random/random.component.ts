import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  StreamCategoryService,
  StreamCategoryServiceProvider,
} from '../services/stream-category.service';

@Component({
  selector: 'nbp-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
  providers: [StreamCategoryServiceProvider],
})
export class RandomComponent implements OnDestroy {
  readonly subscription: Subscription;

  constructor(
    private streamCategoryService: StreamCategoryService,
    private route: Router
  ) {
    this.subscription = this.streamCategoryService
      .getNewStreams()
      .pipe(
        map((s) => s[Math.floor(Math.random() * s.length)].user_login),
        take(1)
      )
      .subscribe((id) => {
        this.route.navigateByUrl(`/stream/t/${encodeURIComponent(id)}`);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
