import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  setItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser()) {
      return (localStorage.getItem(key) || '').replace(/"/g, '');
    }
    return null;
  }

  // Méthode pour définir un item avec une date d'expiration
  setItemWithExpiration(key: string, value: string, ttl: number): void {
    if (this.isBrowser()) {
      const now = new Date();
      const item = {
        value,
        expiration: now.getTime() + ttl // TTL en millisecondes
      };
      localStorage.setItem(key, JSON.stringify(item));
    }
  }

  // Méthode pour récupérer un item en vérifiant l'expiration
  getItemWithExpiration(key: string): string | null {
    if (this.isBrowser()) {
      const itemStr = localStorage.getItem(key);
      console.log(itemStr);
      
      if (!itemStr) {
        return null;
      }
  
      try {
        const item = JSON.parse(itemStr);
        const now = new Date();
  
        // Vérifie si le token est expiré
        if (now.getTime() > item.expiration) {
          localStorage.removeItem(key); // Supprime l'item expiré
          return null;
        }
        return item.value;
      } catch (error) {
        console.error('Erreur lors du parsing de l\'item:', error);
        localStorage.removeItem(key); // Supprime l'item invalide
        return null; // retourne null en cas d'erreur
      }
    }
    return null;
  }
  

  clear(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  clearItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
