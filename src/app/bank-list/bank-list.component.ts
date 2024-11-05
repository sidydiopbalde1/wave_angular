import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-bank-list',
  imports:[CommonModule, FormsModule],
  standalone: true,
  templateUrl: 'bank-list.component.html',
  styleUrls: ['bank-list.component.css'],
})
export class BankListComponent {
  banks: any[] = [];
  selectedBankId: number | null = null;
  amount: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchBanks();
  }

  fetchBanks() {
    this.apiService.get<{ data: any[] }>('banks/alls').subscribe(
      (response) => {
        this.banks = response.data;
      },
      (error) => {
        console.error('Erreur de récupération des banques:', error);
      }
    );
  }

  selectBank(bankId: number) {
    this.selectedBankId = bankId;
    this.amount = null; // Réinitialise le montant à chaque sélection
  }

  submitAmount() {
    if (this.selectedBankId && this.amount) {
      const payload = {
        userBankId: this.selectedBankId,
        amount: this.amount,
      };

      this.apiService.post<any>('recharge/charg-from-bank', payload).subscribe(
        (response) => {
          console.log('Recharge réussie:', response);
          // Afficher un message de succès ou réinitialiser le formulaire
        },
        (error) => {
          console.error("Erreur lors de la recharge :", error);
        }
      );
    }
  }
}
