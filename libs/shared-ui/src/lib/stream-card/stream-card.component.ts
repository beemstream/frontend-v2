import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { MapToPipeModule, StreamUrlPipeModule } from '../../lib/pipes';
import { IconModule } from '../icon/icon.component';
import { LinkModule } from '../link/link.component';
import { StreamTagModule } from '../stream-tag/stream-tag.component';

const TagLink = {
  'web dev': '/browse/webdevelopment',
  'game dev': '/browse/gamedevelopment',
  'mobile dev': '/browse/mobiledevelopment',
  programming: '/browse/programming',
};

@Component({
  selector: 'ui-stream-card',
  templateUrl: './stream-card.component.html',
  styleUrls: ['./stream-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamCardComponent implements OnChanges {
  @Input() tags?: string[];
  @Input() streamTitle?: string;
  @Input() streamId?: string;
  @Input() img?: string;
  @Input() username?: string;
  @Input() viewerNo?: number;
  @Input() shouldDisplayImage?: boolean = true;
  faUser = faUser;
  faEye = faEye;
  tagLink = TagLink;
  twitchUserLink: string = '';

  ngOnChanges(): void {
    this.twitchUserLink = `https://twitch.tv/${this.username}`;
  }

  trackTag(_index: number, tag: string) {
    return tag;
  }
}

@NgModule({
  declarations: [StreamCardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    LinkModule,
    StreamTagModule,
    IconModule,
    MapToPipeModule,
    StreamUrlPipeModule,
  ],
  exports: [StreamCardComponent],
})
export class StreamCardModule {}
