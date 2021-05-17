import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import { StreamCategoryService } from '../stream-category.service';

@Component({
  selector: 'nbp-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
  providers: [StreamCategoryService],
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
        switchMap((s) => s),
        map((s) => s.user_login),
        scan((acc: string[], value) => {
          acc.push(value);
          return acc;
        }, [])
      )
      .subscribe((ids) => {
        const randomStream = ids[Math.floor(Math.random() * ids.length)];
        this.route.navigateByUrl(
          `/stream/t/${encodeURIComponent(randomStream)}`
        );
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
