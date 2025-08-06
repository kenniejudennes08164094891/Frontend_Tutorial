import { Component } from '@angular/core';
import { ImageIcons } from 'src/app/models/mocks';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  bgImage = ImageIcons.bgImage;
  constructor(
    private router: Router
  ) {}


 async routeToDashboard(): Promise<any> {
    // Logic to navigate to the dashboard can be added here
   await this.router.navigate(['/dashboard'])
  }
}
