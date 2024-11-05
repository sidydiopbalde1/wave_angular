import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private settingsKey = 'user-settings';

  constructor() {}

  getSettings(): any {
    const settings = localStorage.getItem(this.settingsKey);
    return settings ? JSON.parse(settings) : {};
  }

  saveSettings(settings: any): void {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }
}
