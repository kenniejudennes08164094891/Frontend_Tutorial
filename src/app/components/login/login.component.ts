import { Component } from '@angular/core';
import { ImageIcons, OTPVerification, UserCredentials } from 'src/app/models/mocks';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  bgImage = ImageIcons.bgImage;
  showOTPInput: boolean = false;
  userCredentials: UserCredentials = {
    email: '',
    password: '',
  }

  otpInput: OTPVerification = {
    otp: '',
  };
  loginText: string = 'Login Securely';
  otpText: string = 'Verify OTP';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) { }


  async loginSubmit(): Promise<any> {
    try {
      this.loginText = 'Logging in...';
      // Logic to navigate to the dashboard can be added here

      // firstValueFrom converts the Observable to a Promise
      const loginResponse = await firstValueFrom(this.authService.setUserLogin(this.userCredentials));
      if (loginResponse.HttpResponse === 200) {
        this.showOTPInput = true;
        this.toastr.success(`Generated OTP: ${loginResponse.otp}`, 'Login Successful', {
          timeOut: 7000,
          positionClass: 'toast-top-right',
        });
      }

    } catch (error: any) {
      this.loginText = 'Login Securely';
      console.error('Login failed:', error);
      this.showOTPInput = false; // Hide OTP input on error
      this.toastr.error(error, 'Login Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  async handleOTPInput(): Promise<void> {
    try {
      this.otpText = 'Verifying...';
      console.clear();
      // Logic to handle OTP input can be added here
      this.otpInput = {
        otp: this.otpInput.otp.trim()
      }
      const otpResponse = await firstValueFrom(this.authService.matchOTP(this.otpInput));
      if (otpResponse.isVerified === true) {
        this.router.navigate(['/dashboard'], { relativeTo: this.route });
        this.toastr.success(otpResponse.message, 'OTP Verified', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      } else {
        this.otpText = 'Verify OTP';
        this.toastr.error(otpResponse.message, 'OTP Verification Failed', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        return;
      }


    } catch (error) {
      this.otpText = 'Verify OTP';
      console.error('Error handling OTP input:', error);
      this.toastr.error('Error handling OTP input. Please try again.', 'OTP Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }





}