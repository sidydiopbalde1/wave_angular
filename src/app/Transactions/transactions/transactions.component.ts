import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Transaction } from './transactions.model'; // Assurez-vous du bon chemin
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'transactions.component.html',
  styleUrls: ['transactions.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.apiService.get<{ data: any[] }>('recharge/notifications').subscribe(
      response => {
        this.transactions = response.data.reverse(); // Utilisez `response.data` si le tableau est sous le champ `data`
      },
      error => {
        console.error('Erreur de récupération des transactions:', error);
      }
    );
  }
  

  startX = 0;

  startSwipe(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  endSwipe(event: TouchEvent, id: number) {
    const endX = event.changedTouches[0].clientX;
    const distance = this.startX - endX;

    if (distance > 100) {
      this.removeTransaction(id);
    }
  }

  removeTransaction(id: number) {
    this.transactions = this.transactions.filter(transaction => transaction.id !== id);
  }
}
