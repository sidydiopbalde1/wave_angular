import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../Services/storage-services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(): boolean {
    const authToken = this.storageService.getItem('token'); // Token d'authentification
    const sessionToken = this.storageService.getItemWithExpiration('session_token'); // Token de session avec vérification d'expiration
    console.log('token',authToken, 'session_token',sessionToken);
    
    if (authToken && sessionToken) {
      // Si les deux tokens existent et que le session_token est valide, permettez l'accès à la route
      return true;
    } else {
      // Si l'un des tokens est absent ou expiré, redirigez vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
