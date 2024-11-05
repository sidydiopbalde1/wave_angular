// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  requestOtp(phoneNumber: string): Observable<any> {
    return this.apiService.post('user/request-otp', { phoneNumber });
  }

  verifyOtp(phoneNumber: string, otp: string): Observable<any> {
    return this.apiService.post('user/verify-otp', { phoneNumber, otp });
  }

  verifyPin(pin: string): Observable<any> {
    return this.apiService.post('user/verify-pin', { pin });
  }

 

  
}
