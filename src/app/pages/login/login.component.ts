import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 email: string = '';
  otp: string = '';
  otpSent: boolean = false;
  
  constructor(private router: Router) {}
 goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  sendOtp() {
    if (this.email) {
      // Simulate sending OTP (replace with API call)
      console.log('OTP sent to', this.email);
      alert(`OTP has been sent to ${this.email}`);
      this.otpSent = true;
    }
  }
    verifyOtp() {
      if (this.otp) {
      // Simulate OTP verification (replace with API call)
      console.log('Verifying OTP:', this.otp);
      alert('OTP Verified Successfully!');
      this.router.navigate(['/dashboard']);
     }
    }
}
