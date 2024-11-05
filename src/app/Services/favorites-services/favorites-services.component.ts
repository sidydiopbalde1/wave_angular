import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BankListComponent } from '../../bank-list/bank-list.component';
import { PaymentModalComponent } from '../../payment/payment.component';
import { TransferManagementComponent } from '../../transfer-management/transfer-management.component';
import { CreditPurchaseComponent } from '../../credit-purchase-component/credit-purchase-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-services',
  standalone: true,
  imports: [CommonModule,TransferManagementComponent, CreditPurchaseComponent,MatIconModule ],
  templateUrl: 'favorites-services.component.html',
  styleUrls: ['favorites-services.component.css'],
})
export class FavoriteServicesComponent {
  services = [
    { name: 'Transfert', icon: 'send', stats: '120 transactions' },
    { name: 'Retrait', icon: 'account_balance_wallet', stats: '80 retraits' },
    { name: 'Achat Crédit', icon: 'account_balance_wallet', stats: '80 rechargements' },
    { name: 'Paiements', icon: 'monetization_on', stats: '2 paiements' },
    { name: 'Services', icon: 'build', stats: '60 services' },
    { name: 'Rechargement', icon: 'payment', stats: '60 recharges' },
  ];

  isAllServicesModalOpen = false;
  isCreditPurchaseModalOpen = false;
  isTransferModalOpen = false;
  userId = 1;
  selectedService: any;

  constructor(private dialog: MatDialog) {}

  openBankList() {
    this.dialog.open(BankListComponent, {
      width: '400px',
      height: '400px',
    });
  }

  openPaymentModal() {
    this.dialog.open(PaymentModalComponent, {
      width: '600px',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }

  openTransferModal() {
    this.isTransferModalOpen = true;
  }

  closeTransferModal() {
    this.isTransferModalOpen = false;
  }

  handleServiceClick(service: any) {
    this.selectedService = service;
    switch(service.name) {
      case 'Rechargement':
        this.openBankList();
        break;
      case 'Transfert':
        this.openTransferModal();
        break;
      case 'Paiements':
        this.openPaymentModal();
        break;
      case 'Achat Crédit':
        this.openCreditPurchaseModal();
        break;
    }
  }

  openCreditPurchaseModal() {
    this.isCreditPurchaseModalOpen = true;
  }

  closeCreditPurchaseModal() {
    this.isCreditPurchaseModalOpen = false;
  }

  openAllServicesModal() {
    this.isAllServicesModalOpen = true;
  }

  closeAllServicesModal() {
    this.isAllServicesModalOpen = false;
  }
}
