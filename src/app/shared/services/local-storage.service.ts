import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem(key: string, value: unknown): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting item in local storage for key ${key}: ${err}`);
    }
  }

  public getItem(key: string): unknown {
    try {
      const storedValue = window.localStorage.getItem(key);

      if (storedValue) {
        return JSON.parse(storedValue);
      }

      return null;
    } catch (error) {
      console.error(`Error getting item from local storage for key ${key}: ${error}`);

      return null;
    }
  }

  public rmItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing item from local storage for key ${key}: ${err}`);
    }
  }

  public clear(): void {
    try {
      window.localStorage.clear();
    } catch (err) {
      console.error(`Error clearing local storage ${err}`);
    }
  }
}
