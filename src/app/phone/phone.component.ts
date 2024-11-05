import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth-services/auth.service'; // Importez le service d'authentification
import { Router } from '@angular/router'; // Importez le Router
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CodeComponent } from '../code-sms/code-sms.component';
import { StorageService } from '../Services/storage-services/storage.service'; // Importation du StorageService

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CodeComponent],
  templateUrl: 'phone.component.html',
  styleUrls: ['phone.component.css']
})
export class PhoneComponent {
  phoneForm: FormGroup;
  codeSent: boolean = false;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService // Injection du StorageService
  ) {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]]
    });
  }

  onSubmit() {
    if (this.phoneForm.valid && !this.isSubmitted) {
      this.isSubmitted = true;
      const phoneNumber = this.phoneForm.value.phone;

      // Enregistrez le numéro de téléphone avec StorageService
      this.storageService.setItem('phoneNumber', phoneNumber);
      
      // Envoyer le numéro de téléphone pour demander l'OTP
      this.authService.requestOtp(phoneNumber).subscribe({
        next: (response) => {
          this.codeSent = true;
          console.log('Code OTP envoyé avec succès','Code OTP', response.data);
          // Redirigez vers le CodeComponent
          this.router.navigate(['/code']);
        },
        error: (err) => {
          console.error('Erreur lors de l’envoi de l’OTP:', err);
          this.isSubmitted = false; // Réinitialiser en cas d'erreur
        },
        complete: () => {
          this.isSubmitted = false; // Réinitialiser après succès ou erreur
        }
      });
    }
  }
}
