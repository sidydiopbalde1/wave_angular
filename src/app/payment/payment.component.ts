import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
interface Societe {
  id: number;
  nom: string;
  prenom: string;
  photo?: string;
  type_societe: string;
  identifiant?: string;
}

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule,FormsModule],
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.css']
})
export class PaymentModalComponent implements OnInit {
  isModalOpen = false;
  societes: Societe[] = [];
  societeTypes: string[] = [];
  selectedSociete: Societe | null = null;
  montant: number | null = null; // Champ pour le montant

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadSocietes();
  }

  loadSocietes() {
    this.apiService.get<{ users: any[] }>('user/societe').subscribe({
      next: (response) => {
        this.societes = response.users;
        
        console.log(this.societes);
        if (Array.isArray(this.societes)) {
          this.societeTypes = [...new Set(this.societes.map(s => s.type_societe))];
        } else {
          console.error('La propriété users n\'est pas un tableau:', this.societes);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des sociétés:', error);
      }
    });
  }

  filteredSocietes(type: string): Societe[] {
    return this.societes.filter(s => s.type_societe == type);
  }

  onTabChange(event: any) {
    this.selectedSociete = null;
    this.montant = null;
  }

  selectCompany(societe: Societe) {
    this.selectedSociete = societe;
    this.montant = null; // Réinitialiser le montant pour chaque sélection de société
  }

  makePayment() {
    if (this.selectedSociete && this.montant) {
      const paymentData = {
        societeId: this.selectedSociete.id,
        montant: this.montant
      };

      this.apiService.post('paiement/service', paymentData).subscribe({
        next: (response) => {
          console.log('Paiement réussi:', response);
          this.close();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur de paiement:', error.message);
        }
      });
    } else {
      console.warn('Veuillez sélectionner une société et saisir un montant.');
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(event?: Event) {
    if (event && (event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  close() {
    this.isModalOpen = false;
    this.selectedSociete = null;
    this.montant = null;
  }
}
