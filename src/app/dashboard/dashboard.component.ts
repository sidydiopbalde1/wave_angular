import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component'; // Mettez à jour le chemin selon votre structure
import { BalanceComponent } from '../Account/account-balance/account-balance.component';
import { FavoriteServicesComponent } from '../Services/favorites-services/favorites-services.component';
import { TransactionHistoryComponent } from '../Transactions/transactions/transactions.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HomeComponent,
    BalanceComponent,
    FavoriteServicesComponent,
    TransactionHistoryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // Logique du composant Dashboard
}
