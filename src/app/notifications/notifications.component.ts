import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../Services/notifications-services/notifications.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService],
  templateUrl: 'notifications.component.html',
  styleUrls: ['notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = []; // Assurez-vous que c'est un tableau vide par défaut

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
    this.notificationService.getNotifications().subscribe(
      (data) => {
        // if (Array.isArray(data)) {
          this.notifications = data.data; // Affecte le tableau directement
         
          
        // } else {
        //   console.error('Data is not an array:', data);
        // }
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
}
