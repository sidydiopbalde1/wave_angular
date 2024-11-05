import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Validators, FormControl } from '@angular/forms';

interface Contact {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  photo?: string;
  solde:number
}

@Component({
  selector: 'app-transfer-modal',
  standalone: true,
  templateUrl: 'transfert.component.html',
  styleUrls: ['transfert.component.css'],
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class TransferModalComponent implements OnInit {
  searchControl: FormControl<string | null> = new FormControl('');
  amountControl: FormControl<string | number | null> = new FormControl('', {
    validators: [Validators.required, Validators.min(100), Validators.max(1000000)]
  });
  selectedContact: Contact | null = null;
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  isOpen = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadContacts();
    this.setupSearch();
  }

  // Méthode pour charger les contacts depuis le backend
  loadContacts() {
    this.apiService.get<{ data: Contact[] }>('user/client').subscribe(
      response => {
        this.contacts = response.data;
        this.filteredContacts = this.contacts; // Initialiser avec tous les contacts
      },
      error => {
        console.error('Erreur lors du chargement des contacts:', error);
      }
    );
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => this.filterContacts(value || ''));
  }

  private filterContacts(searchTerm: string): void {
    searchTerm = searchTerm.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact =>
      contact.nom.toLowerCase().includes(searchTerm) ||
      contact.prenom.toLowerCase().includes(searchTerm) ||
      contact.telephone.includes(searchTerm)
    );
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
  }

  goBack(): void {
    this.selectedContact = null;
    this.amountControl.reset(); // Réinitialiser le champ du montant
  }

  formatAmount(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value) {
        value = parseInt(value, 10).toLocaleString('fr-FR');
        input.value = value;
    }
}

  confirmTransfer() {
    if (this.selectedContact && this.amountControl.valid) {
      const transferData = {
        receiverId: this.selectedContact.id,
        montant: parseFloat(this.amountControl.value!.toString().replace(/[^0-9.]/g, '')),
      };

      // Appel de l'API de transfert
      this.apiService.post<{ transactions: string }>('api/transfer/send', transferData).subscribe(
        response => {
          console.log('Transfert réussi:', response);
          this.close(); // Fermer le modal après le transfert réussi
        },
        error => {
          console.error('Erreur lors du transfert:', error);
          // Gérer l'erreur ici (affichage d'un message d'erreur)
        }
      );
    }
  }

  closeModal(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  close(): void {
    this.isOpen = false;
    console.log('Modal closed');
  }
}
