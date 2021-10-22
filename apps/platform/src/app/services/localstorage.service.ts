import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  getLocalStorage() {
    return localStorage;
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
