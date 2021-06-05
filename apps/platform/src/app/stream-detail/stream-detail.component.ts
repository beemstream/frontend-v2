import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { StreamDetailService } from '../stream-detail.service';
import { faTv, faUser } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from '../seo.service';
import { ImgSizePipe } from '@frontend-v2/shared-ui';

@Component({
  selector: 'nbp-stream-detail',
  templateUrl: './stream-detail.component.html',
  styleUrls: ['./stream-detail.component.css'],
  providers: [StreamDetailService],
})
export class StreamDetailComponent {
  streamDetail = this.route.params.pipe(
    switchMap((param) =>
      this.streamDetailService.getStreamDetails(param.username)
    ),
    tap((user) => {
      const title = user.stream_info ? `- ${user.stream_info.title}` : '';
      const imgUrl = this.imgSizePipe.transform(
        user.stream_info?.thumbnail_url ?? user.user_info.profile_image_url,
        250,
        140
      );

      this.seoService
        .addTitle(`${user.user_info.login} ${title}`)
        .addImage(imgUrl, '250', '140');
    })
  );

  faTv = faTv;

  faUser = faUser;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly streamDetailService: StreamDetailService,
    private readonly seoService: SeoService,
    readonly imgSizePipe: ImgSizePipe
  ) {}
}
