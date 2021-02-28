import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit, Component, Input } from '@angular/core';
import { faTv } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nbp-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css'],
})
export class StreamViewComponent implements AfterViewInit {
  @Input() channel?: string;
  @Input() channelImg?: string;

  faTv = faTv;

  @ViewChild('twitchEmbed') twitchEmbedElem?: ElementRef;

  ngAfterViewInit(): void {
    if (this.channel) {
      new Twitch.Embed(this.twitchEmbedElem?.nativeElement, {
        width: '100%',
        height: '100%',
        channel: this.channel,
        theme: 'dark',
      });
    }
  }
}
