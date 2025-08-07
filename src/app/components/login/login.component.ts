import { Component } from '@angular/core';
import { ImageIcons } from 'src/app/models/mocks';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  bgImage = ImageIcons.bgImage;

  constructor(private router: Router, private route: ActivatedRoute) {}

  async routeToDashboard(): Promise<any> {
    //Login Logic to navigate to dashboard
    await this.router.navigate(['/dashboard']);
  }
}
