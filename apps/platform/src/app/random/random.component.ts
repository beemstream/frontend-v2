import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { flatMap, map, scan } from 'rxjs/operators';
import { StreamCollectionService } from '../stream-collection.service';

@Component({
  selector: 'nbp-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
  providers: [StreamCollectionService],
})
export class RandomComponent implements OnDestroy {
  readonly subscription: Subscription;

  constructor(
    private streamColllectionService: StreamCollectionService,
    private route: Router
  ) {
    this.subscription = this.streamColllectionService
      .getStreams()
      .pipe(
        flatMap((s) => s),
        map((s) => s.user_login),
        scan((acc, value) => {
          acc.push(value);
          return acc;
        }, [] as string[])
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
