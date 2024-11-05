import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth-services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../Services/storage-services/storage.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-sms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'code-sms.component.html',
  styleUrls: ['code-sms.component.css']
})
export class CodeComponent {
  codeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit() {
    if (this.codeForm.valid) {
      const otp = this.codeForm.value.code;
      const phoneNumber = this.storageService.getItem('phoneNumber');

      if (phoneNumber) {
        this.authService.verifyOtp(phoneNumber, otp).subscribe({
          next: (response) => {
            console.log('Token reçu:', response.token);
            
            // Enregistrement du token dans StorageService
            this.storageService.setItem('token', response.token); 
            this.router.navigate(['/login']); // Rediriger vers la page d'entrée du PIN
          },
          error: (err) => {
            console.error('Erreur lors de la vérification de l’OTP:', err);
          }
        });
      } else {
        console.error('Numéro de téléphone introuvable dans le stockage');
        this.router.navigate(['/phone']); // Rediriger vers la page de connexion si le numéro est introuvable
      }
    }
  }
}
