import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) {}

  getLocalStorage() {
    return this.localStorage;
  }

  setItem<T>(key: string, value: T): Storage {
    this.getLocalStorage().setItem(key, JSON.stringify(value));
    return this.getLocalStorage();
  }

  getItem<T = unknown>(key: string): T | null {
    return JSON.parse(this.getLocalStorage().getItem(key) || 'null');
  }

  removeItem(key: string): Storage {
    this.getLocalStorage().removeItem(key);
    return this.getLocalStorage();
  }
}
