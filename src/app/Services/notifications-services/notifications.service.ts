import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'recharge/notifications';

  constructor(private apiService: ApiService) {}

  getNotifications(): Observable<any> {
    return this.apiService.get<any>(this.baseUrl);
  }
}
