import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { StreamDetailService } from '../stream-detail.service';
import { faTv, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nbp-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.css'],
  providers: [StreamDetailService],
})
export class StreamDetailComponent {

  streamDetail = this.route.params.pipe(
    switchMap(param => this.streamDetailService.getStreamDetails(param.username)),
  );

  faTv = faTv;

  faUser = faUser;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly streamDetailService: StreamDetailService  ) {}

}
