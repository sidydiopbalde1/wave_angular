import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { StorageService } from '../Services/storage-services/storage.service';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { NewsComponent } from '../Services/news/news.component'; // Import du composant Notifications

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, ZXingScannerModule, CommonModule, NewsComponent],
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo: any;
  qrResult: string | null = null;
  scanning: boolean = true;
  scanMessage: string | null = null;
  isNotificationVisible: boolean = false; // Propriété pour gérer l'état de visibilité des notifications
  isHovered: boolean = false; 

  constructor(
    private storageService: StorageService,
    private router: Router,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  openMenu() {
    console.log("Menu clicked");
  }

  logout() {
    this.storageService.clearItem('token');
    this.storageService.clearItem('session_token');
    this.userService.clearUserInfo();
    this.router.navigate(['/phone']);
  }

  getUserInfo() {
    this.apiService.get<{ data: any }>('user/connected').subscribe(
      response => {
        this.userService.setUserInfo(response.data);
        this.userInfo = response.data;
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    );
  }

  // Gestionnaire d'événement pour le succès du scan
  onScanSuccess(result: string) {
    this.qrResult = result;
    this.scanning = false; 

    this.scanMessage = "Retrait effectué avec succès";

    console.log("Résultat du scan QR:", result);
  }

  // Méthode pour démarrer ou arrêter le scanner
  toggleScanner() {
    this.scanning = !this.scanning;
    this.scanMessage = null; 
  }

  // Méthode pour afficher ou masquer le modal des notifications
  toggleNotifications() {
    this.isNotificationVisible = !this.isNotificationVisible;
  }
}
