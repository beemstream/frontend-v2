import { Injectable } from '@angular/core';

@Injectable()
export class TwitchEmbedService {
  createEmbed(element: HTMLElement, channel: string) {
    new Twitch.Embed(element, {
      width: '100%',
      height: '100%',
      channel: channel,
      theme: 'dark',
    });
  }
}
