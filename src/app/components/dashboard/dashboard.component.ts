import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { transactions, Transactions, TransactionObject, IsMarkedProps } from 'src/app/models/mocks';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CreateTransactionModalComponent } from 'src/app/utils/create-transaction-modal/create-transaction-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  transaction: Transactions[] = transactions;
  isToBeMarked: IsMarkedProps = { status: '', marked: false };
  searchQuery: string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    // Initialize or fetch transactions if needed
  }


  listenToInput(event:Event | any){
    const input = event as string;
    this.searchQuery = input;
    console.log("input>>", input);
  }


  openTransactionModal(){
    this.dialog.open(CreateTransactionModalComponent);
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

  getStatusFromChild(event: Event | any): void {
    // This method will receive the emitted status from the child component
    const status:string = event as string; // event as string is a ts code to declare the event message as a string
    let filteredStatus = this.transaction.filter((item: TransactionObject) => item.status?.toLowerCase() === status?.toLowerCase());
    if(!filteredStatus[0]?.status?.toLowerCase().includes(status?.toLowerCase())){
        filteredStatus = transactions.filter((item: TransactionObject) => item?.status?.toLowerCase() === status?.toLowerCase());
    }

      this.transaction = filteredStatus.length > 0 ? filteredStatus : transactions; // if the filtered status is empty, then return all transactions

    this.toastr.info(`All ${status} status has been fetched succesfully!`, 'Message', {
      timeOut: 1000,
      positionClass: 'toast-top-left',
    });
  }

  showMarked(status:string){
    this.isToBeMarked = { status: status, marked: true};

  }



  // npm i ngx-toastr: https://www.npmjs.com/package/ngx-toastr
  // npm install @angular/animations --save

}
