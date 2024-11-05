// contact.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

interface Contact {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  photo?: string;
  identifiant: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private endpoint = 'user/client';

  constructor(private apiService: ApiService) {}

  getContacts() {
    // Ajoutez "return" pour retourner l'observable
    this.apiService.get<{ data: any[] }>(this.endpoint).subscribe(
      response =>{ response.data
        console.log(response.data);
        
      },
      error => {
        console.error('Erreur lors du chargement des contacts:', error)
    }
    );
  }
}
