import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID } from '@angular/core';

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

export const TwitchEmbedServiceProvider = {
  provide: TwitchEmbedService,
  useFactory: (platformId: string) =>
    isPlatformBrowser(platformId)
      ? new TwitchEmbedService()
      : // eslint-disable-next-line @typescript-eslint/no-empty-function
        { createEmbed: (_element: HTMLElement, _channel: string) => {} },
  deps: [PLATFORM_ID],
};
