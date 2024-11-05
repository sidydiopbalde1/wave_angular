import { Component } from '@angular/core';
import { SettingService } from '../Services/setting.service'; // Assurez-vous que le chemin est correct
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  standalone: true,
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent {
  notificationEnabled: boolean = true;
  theme: string = 'light';

  constructor(private settingService: SettingService) {
    const settings = this.settingService.getSettings();
    this.notificationEnabled = settings.notificationEnabled ?? true;
    this.theme = settings.theme ?? 'light';
  }

  saveSettings() {
    const settings = {
      notificationEnabled: this.notificationEnabled,
      theme: this.theme,
    };
    this.settingService.saveSettings(settings);
    console.log('Settings saved:', settings);
  }
}
