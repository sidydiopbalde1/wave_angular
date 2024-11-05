import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BalanceComponent } from './Account/account-balance/account-balance.component';
import { FavoriteServicesComponent } from './Services/favorites-services/favorites-services.component';
import { NewsComponent } from './Services/news/news.component';
import { TransactionHistoryComponent } from './Transactions/transactions/transactions.component';
import { AccountSettingsComponent } from './Account/account-settings/account-settings.component';
import { HelpComponent } from './help/help.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginComponent } from './login/login.component';
import { PhoneComponent } from './phone/phone.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CodeComponent } from './code-sms/code-sms.component'; 
import { SettingsComponent } from './settings/settings.component'
import { AuthGuard } from './guards/auth.guard'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent }, // Route d'accueil
  { path: 'balance', component: BalanceComponent },
  { path: 'favorites', component: FavoriteServicesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'transactions', component: TransactionHistoryComponent },
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'why-choose-us', component: WhyChooseUsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'phone', component: PhoneComponent },
  { path: 'code', component: CodeComponent }, // Ajoutez la route pour le CodeComponent
  { path: '**', redirectTo: '' } // Redirection vers l'accueil pour les routes inconnues
];
