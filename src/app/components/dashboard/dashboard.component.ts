import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { transactions, Transactions, TransactionObject } from 'src/app/models/mocks';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  transaction: Transactions[] = transactions;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthServiceService
  ) {
    // Initialize or fetch transactions if needed
  }



  viewDetails(details: TransactionObject, idNumber: number) {

    // method1: using queryParams and route state to pass data: i.e http:localhost:4200/view-profile?id=1
    this.router.navigate(['/view-profile'], {
      relativeTo: this.route,
      state: {
        transactionDetails: details
      },
      queryParams: {
        id: idNumber
      }
    });

    // method2: using route params to pass data: i.e http:localhost:4200/view-profile/1
    // this.router.navigate([`/view-profile/${idNumber}`], { 
    //   relativeTo: this.route,
    //   state: { 
    //     transactionDetails: details 
    //   }
    // });
  }

   async logoutUser(): Promise<void> {
    try {
      await this.authService.logoutUser();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }


  // npm i ngx-toastr: https://www.npmjs.com/package/ngx-toastr
  // npm install @angular/animations --save

}
