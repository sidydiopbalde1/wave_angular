import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-why-choose-us',
  standalone : true,
  imports: [ MatIconModule ,CommonModule],  // Import the MatIconModule
  templateUrl: 'why-choose-us.component.html',
  styleUrls: ['why-choose-us.component.css']
})
export class WhyChooseUsComponent {
  benefits = [
    { text: '4G de qualité', icon: 'network_wifi' },
    { text: 'Mastercard disponible', icon: 'credit_card' },
  ];
}
