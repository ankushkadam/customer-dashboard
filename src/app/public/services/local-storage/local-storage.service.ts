import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, item: any): void {
    const itemStr = item;
    window.localStorage.setItem(key, itemStr);
  }

  getItem(key: string): any | null {
    const itemStr = window.localStorage.getItem(key);
    return itemStr;
  }

  clear(): void {
    window.localStorage.clear();
  }
}
