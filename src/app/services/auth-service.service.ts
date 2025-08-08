import { Injectable } from '@angular/core';
import { OTPVerification, UserCredentials } from '../models/mocks';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  otpGenerated: string | null = null;
  constructor() { }

  // At this service, we can implement authentication methods like login, logout, and check if a user is authenticated.


  public setUserCredentials(token: string): void {
    sessionStorage.setItem('userDetails', token);
  }

  public getUserCredentials(): UserCredentials | null {
    const user: string | null = sessionStorage.getItem('userDetails');
    return user ? JSON.parse(atob(user)) : null;
  }

  public clearUserCredentials(): void {
    sessionStorage.removeItem('userDetails');
  }

  public isAuthenticated(): boolean {
    return this.getUserCredentials() !== null;
  }

   generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }

  public setUserLogin(userDetail: UserCredentials): Observable<any> {

    // error handling for user credentials
    if(!userDetail.email.includes('@') || userDetail.password.length < 8) {
     throw new Error('Email or password do not meet the required format!');
    }


    // Simulating a JWT token generation and storing user credentials
    const JWTToken = btoa(JSON.stringify(userDetail)); // Simulating a JWT token encryption
    this.setUserCredentials(JWTToken);
    this.otpGenerated = this.generateOTP();

    // of converts a promise into an Observable
    return of({
      message: 'User is logged in successfully',
      user: userDetail,
      otp: this.otpGenerated,
      token: JWTToken, // Simulating a JWT token
      HttpResponse: 200
    })
  }


  public matchOTP(otpEnum: OTPVerification) {
    const isVerified = otpEnum.otp === this.otpGenerated ? true : false;
    return of({
      message: isVerified === true ? 'OTP verified successfully' : 'Invalid OTP',
      isVerified: isVerified,
      HttpResponse: isVerified ? 200 : 401
    });
  }

  async logoutUser(): Promise<void> {
    return new Promise((resolve) => {
      this.clearUserCredentials();
      this.otpGenerated = null; // Clear the OTP after logout
      resolve();
    });
  }

}
