import { Injectable } from '@angular/core';
import { StorageService } from '../Services/storage-services/storage.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfo: any; // Stockage des informations de l'utilisateur

  constructor(private storageService: StorageService) {}

  setUserInfo(data: any): void {
    this.userInfo = data; 
    this.storageService.setItem('user_info', JSON.stringify(data)); 
  }

  getUserInfo(): any {
    const userInfo = this.storageService.getItem('user_info');
    console.log('Retrieved user info:', userInfo);
    if (userInfo) {
      return userInfo;
      // try {
      //   return JSON.parse(userInfo);
      // } catch (error) {
      //   console.error('Error parsing user info:', error);
      //   return null; // Retourner null ou une valeur par défaut en cas d'erreur
      // }
    }
    return null;
  }
  

  clearUserInfo(): void {
    this.userInfo = null; // Méthode pour effacer les informations de l'utilisateur
    this.storageService.clearItem('user_info'); // Assurez-vous d'effacer le stockage
  }

  // fixUserInfoFormat(userInfo: string): string {
  //   return userInfo
  //     .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":') // Ajoute des guillemets autour des noms de propriété
  //     .replace(/:\s*([^,"\d{}\[\]]+)(?=[,}])/g, ':"$1"') // Ajoute des guillemets autour des chaînes
  //     .replace(/:\s*(https?:\/\/[^\s"]+)/g, ':"$1"') // Assure que les URLs sont entourées de guillemets
  //     .replace(/:\s*(\d+)(?=[,}])/g, ':$1'); // Assure que les nombres ne sont pas entourés de guillemets
  // }
}

