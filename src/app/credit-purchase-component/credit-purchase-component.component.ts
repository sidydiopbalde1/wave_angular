import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-credit-purchase',
  standalone: true,
  imports: [CommonModule, FormsModule,MatProgressSpinnerModule],
  templateUrl: 'credit-purchase-component.component.html',
  styleUrls: ['credit-purchase-component.component.css']
})
export class CreditPurchaseComponent {
  @Input() userId!: number;
  @Output() purchaseComplete = new EventEmitter<void>();
  
  montant: number = 0;
  contacts: any[] = [];
  selectedContact: any | null = null;
  searchTerm: string = '';
  isLoading: boolean = false;
  isProcessing: boolean = false;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading = true;
    this.apiService.get<{ data: any[] }>(`users/contacts?search=${this.searchTerm}`).subscribe({
      next: (response) => {
        this.contacts = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des contacts:", error);
        this.snackBar.open('Erreur lors du chargement des contacts', 'Fermer', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  get filteredContacts() {
    return this.contacts.filter(contact => 
      `${contact.nom} ${contact.prenom}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      contact.telephone.includes(this.searchTerm)
    );
  }

  onSearchTermChange() {
    this.loadContacts();
  }

  selectContact(contact: any) {
    this.selectedContact = contact;
  }

  buyCredit() {
    if (!this.selectedContact || !this.montant) {
      this.snackBar.open('Veuillez sélectionner un contact et spécifier un montant', 'Fermer', {
        duration: 3000
      });
      return;
    }
    
    this.isProcessing = true;
    const endpoint = `v1/credit/purchase`;
    
    this.apiService.post(endpoint, {
      montant: this.montant,
      telephone: this.selectedContact.telephone
    }).subscribe({
      next: (response) => {
        this.snackBar.open('Achat de crédit réussi!', 'Fermer', {
          duration: 3000
        });
        this.purchaseComplete.emit();
        this.montant = 0;
        this.selectedContact = null;
        this.isProcessing = false;
      },
      error: (error) => {
        console.error("Erreur lors de l'achat de crédit:", error);
        this.snackBar.open('Erreur lors de l\'achat de crédit', 'Fermer', {
          duration: 3000
        });
        this.isProcessing = false;
      }
    });
  }
}
