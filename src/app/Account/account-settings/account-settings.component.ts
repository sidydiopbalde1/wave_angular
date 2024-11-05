import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-account-settings',
  imports: [MatIconModule, CommonModule],
  standalone: true,
  templateUrl: 'account-settings.component.html',
  styleUrls: ['account-settings.component.css']
})
export class AccountSettingsComponent {
  accountOptions = [
    { label: 'Changer le code PIN', icon: 'lock' },
    { label: 'Déplafonner le compte', icon: 'account_balance' },
  ];
}
