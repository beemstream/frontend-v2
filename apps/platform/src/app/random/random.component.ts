import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { flatMap, map, reduce } from 'rxjs/operators';
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
      .getNewStreams()
      .pipe(
        flatMap((s) => s),
        map((s) => s.user_name),
        reduce((acc, value) => {
          acc.push(value);
          return acc;
        }, [] as string[])
      )
      .subscribe((ids) => {
        const randomStream = ids[Math.floor(Math.random() * ids.length)];
        this.route.navigateByUrl(`/stream/${encodeURIComponent(randomStream)}`);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
