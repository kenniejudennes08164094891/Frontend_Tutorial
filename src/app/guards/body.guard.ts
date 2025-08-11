import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
@Injectable({
  providedIn: 'root'
})

export class bodyGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService
  ) { }

  async canActivate(): Promise<boolean> {
    if (!this.authService.isAuthenticated()) {
      await this.router.navigate(['/login'], { relativeTo: this.route });
      return false
    }
    return true;
  }
};
