import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-account-balance',
  standalone: true,
  imports: [CommonModule, QRCodeModule, MatIconModule, ZXingScannerModule],
  templateUrl: 'account-balance.component.html',
  styleUrls: ['account-balance.component.css']
})
export class BalanceComponent implements OnInit {
  showBalance = false;
  isScanning = false; // Nouveau : Permet de basculer entre QR code et scanner
  balance: any = {};
  qrCodeValue = '';

  constructor(private userService: UserService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUserBalance();
  }

  toggleBalance(): void {
    this.showBalance = !this.showBalance;
    this.updateQRCode();
  }

  toggleScanner(): void {
    this.isScanning = !this.isScanning;
  }

  updateQRCode(): void {
    if (this.balance && this.balance.solde) {
      this.qrCodeValue = `Balance: ${this.balance.solde}`;
    } else {
      this.qrCodeValue = '';
    }
  }

  getUserBalance(): void {
    this.apiService.get<{ data: any }>('user/connected').subscribe(
      response => {
        this.balance = response.data;
        this.updateQRCode();
      },
      error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    );
  }

  onScanSuccess(result: string): void {
    this.isScanning = false;
    console.log("Résultat du scan QR:", result);
    // Logique de traitement après le scan
  }
}
