import { Injectable } from '@angular/core';
import { Icon, IconSet } from './programming-language-icon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  getIcon(name: Icon): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return IconSet.find((i) => i.name === name)!.data;
  }
}
