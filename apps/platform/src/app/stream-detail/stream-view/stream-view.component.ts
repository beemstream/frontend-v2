import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AfterViewInit, Component, Input } from '@angular/core';
import { faTv } from '@fortawesome/free-solid-svg-icons';
import {
  TwitchEmbedService,
  TwitchEmbedServiceProvider,
} from '../../services/twitch-embed.service';

@Component({
  selector: 'nbp-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.css'],
  providers: [TwitchEmbedServiceProvider],
})
export class StreamViewComponent implements AfterViewInit {
  @Input() channel!: string;
  @Input() channelImg!: string;

  faTv = faTv;

  @ViewChild('twitchEmbed') twitchEmbedElem!: ElementRef;

  constructor(private twitchEmbedService: TwitchEmbedService) {}

  ngAfterViewInit(): void {
    this.twitchEmbedService.createEmbed(
      this.twitchEmbedElem.nativeElement,
      this.channel
    );
  }
}
