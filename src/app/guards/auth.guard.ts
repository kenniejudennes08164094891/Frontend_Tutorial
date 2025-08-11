import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService
  ) { }

async  canActivate(): Promise<boolean> {
    if (this.authService.isAuthenticated() === false) {
     await this.router.navigate(['/login'], { relativeTo: this.route });
      this.authService.logoutUser();
      return false
    }
    return this.authService.isAuthenticated();
  }
}