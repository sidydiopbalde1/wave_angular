import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth-services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { StorageService } from '../Services/storage-services/storage.service'; // Importation du StorageService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService // Injection du StorageService
  ) {
    this.loginForm = this.fb.group({
      code0: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      code1: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      code2: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
      code3: ['', [Validators.required, Validators.pattern(/^[0-9]$/)]],
    });
  }

  onDigitInput(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    // Si un chiffre est saisi, déplacez le focus vers le champ suivant
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const pin = Object.values(this.loginForm.value).join('');
      const token = this.storageService.getItem('token'); // Utilisation de StorageService pour obtenir le token

      if (token) {
        this.authService.verifyPin(pin).subscribe({
          next: (response) => { 
            // Vérification de la réponse pour s'assurer que le session_token est présent
            if (response.sessionToken) {
              console.log(response.sessionToken);
              
              // Stocker le session_token avec une expiration de 5 minutes (300000 millisecondes)
              this.storageService.setItemWithExpiration('session_token', response.sessionToken, 300000); // 5 minutes
              this.router.navigate(['/dashboard']);
            } else {
              console.error('Aucun token de session reçu.');
            }
          },
          error: (err) => {
            console.error('Erreur lors de la vérification du code PIN:', err);
            alert('Erreur lors de la vérification du code PIN. Veuillez réessayer.');
          }
        });
       
      } else {
        alert('Token d\'authentification manquant. Veuillez vous reconnecter.');
        this.router.navigate(['/login']); // Rediriger vers la page de connexion si le token est manquant
      }
    }
  }
}
