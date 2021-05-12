import { Injectable } from '@angular/core';
import { Icon, IconSet } from './programming-language-icon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  getIcon(name: Icon) {
    return IconSet.find((i) => i.name === name)!.data;
  }
}
