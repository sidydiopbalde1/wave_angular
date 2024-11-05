import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { BalanceComponent } from './Account/account-balance/account-balance.component';
import {FavoriteServicesComponent} from './Services/favorites-services/favorites-services.component';
import { NewsComponent } from './Services/news/news.component';
import {TransactionHistoryComponent} from './Transactions/transactions/transactions.component';
import {AccountSettingsComponent} from './Account/account-settings/account-settings.component';
import { HelpComponent } from './help/help.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginComponent } from './login/login.component';
import { PhoneComponent } from './phone/phone.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
     HomeComponent,
     BalanceComponent,
     FavoriteServicesComponent,
     NewsComponent,
     TransactionHistoryComponent,
     AccountSettingsComponent,
     HelpComponent,
     WhyChooseUsComponent,
     NotificationsComponent,
     LoginComponent,
     PhoneComponent
   
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wavefrontend';
}
