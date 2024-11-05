import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; 
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit {
  notifications: any[] = []; // Liste des notifications

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getNotifications(); // Appel pour récupérer les notifications
  }

  // Méthode pour récupérer les notifications
  getNotifications() {
    this.apiService.get<{ data: any[] }>('user/notifications').subscribe(
      response => {
        this.notifications = response.data; // Assurez-vous que l'API retourne le bon format
      },
      error => {
        console.error('Erreur lors de la récupération des notifications:', error);
      }
    );
  }
}
