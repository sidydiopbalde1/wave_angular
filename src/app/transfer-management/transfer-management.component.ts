import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs'; 
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-transfer-management',
  standalone: true,
  imports: [CommonModule, MatTabsModule, FormsModule], // Ajouter FormsModule ici
  templateUrl: 'transfer-management.component.html',
  styleUrls: ['transfer-management.component.css'],
  animations: [
    trigger('translateTab', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
})
export class TransferManagementComponent implements OnInit {
  isModalOpen = false;
  users: any[] = [];
  selectedUser: any = null;
  montant: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.get<{ data: any }>('user/client').subscribe({
      next: (response) => {
        this.users = response.data;
        console.log(response.data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedUser = null;
    this.montant = 0;
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.openModal();
  }

  makePayment() {
    if (!this.selectedUser || this.montant <= 0) {
      alert('Veuillez sélectionner un utilisateur et entrer un montant valide.');
      return;
    }

    const payload = {
      receiverId: this.selectedUser.id,
      montant: this.montant
    };

    this.apiService.post('api/transfer/send', payload).subscribe({
      next: (response) => {
        console.log('Transfert effectué avec succès:', response);
        alert('Le paiement a été effectué avec succès.');
        this.closeModal();
      },
      error: (error) => {
        console.error('Erreur lors du paiement:', error);
      }
    });
  }
}
