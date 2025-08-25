import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, lastValueFrom, map, Observable, Subscription, takeWhile, timer } from 'rxjs';
import { transactions, Transactions, TransactionObject, IsMarkedProps, PaginationParams } from 'src/app/models/mocks';
import { ApiService } from 'src/app/services/api.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { EmmittersService } from 'src/app/services/emmitters.service';
import { CreateTransactionModalComponent } from 'src/app/utils/create-transaction-modal/create-transaction-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  transaction: Transactions[] = [] //transactions;
  isToBeMarked: IsMarkedProps = { status: '', marked: false };
  searchQuery: string = "";
  dummyArray: Transactions[] = [];
  evenNumbersSubscription$!: Subscription; // where ! is called a non-null assertion operator
  evenNumbers: string = "";

  // createing a timer coundown
  // Observable for countdown
  timer$ = timer(0, 1000).pipe(
    map((elapsed) => this.totalSeconds - elapsed),
    takeWhile((val) => val >= 0)
  );
  formattedTime: string = '';
  private timerSubscription$!: Subscription;
  private totalSeconds = 60;

  // pagination variables
  paginationParams: PaginationParams = {
    _page: 1,
    _limit: 50
  }
  paginationArrayToShow: any = [];
  showPagination: boolean = true;
  showNoData: boolean | null = null;
  showSpinner: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private emmitterService: EmmittersService,
    private apiService: ApiService
  ) {
    // Initialize or fetch transactions if needed
  }


  listenToInput(event: Event | any) {
    const input = event as string;
    this.searchQuery = input;
    //console.log("input>>", input);
  }


  openTransactionModal() {
    // Open the dialog to send data
    const openModal = this.dialog.open(CreateTransactionModalComponent, {
      width: '1000px',
      data: {
        title: "Create Transaction Modal"   // you can declare object or arrays here too
      }
    })


    // To fetch data from the component
    // openModal.afterClosed().subscribe({
    //   next: (formResult:any) => {
    //     console.log("form result>>", formResult);
    //     this.transaction.push(formResult);
    //   }
    // })
  }


  async deleteTransaction(item: TransactionObject): Promise<any> {
    // item.id is used because the id is optional in the TransactionObject interface
    try {
      const response = await firstValueFrom(this.apiService.deleteTransaction(item.id || ""));
      this.toastr.success("Transaction deleted successfully!", "Success");
      this.ngOnInit();  // to refresh the list after deletion;
    } catch (err) {
      this.toastr.error("Failed to delete transaction!", "Error");
    }
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
    const status: string = event as string; // event as string is a ts code to declare the event message as a string
    let filteredStatus = this.transaction.filter((item: TransactionObject) => item.status?.toLowerCase() === status?.toLowerCase());
    if (!filteredStatus[0]?.status?.toLowerCase().includes(status?.toLowerCase())) {
      filteredStatus = this.dummyArray.filter((item: TransactionObject) => item?.status?.toLowerCase() === status?.toLowerCase());
      // transactions
    }

    this.transaction = filteredStatus.length > 0 ? filteredStatus : this.dummyArray;  // transactions
    // if the filtered status is empty, then return all transactions

    this.toastr.info(`All ${status} status has been fetched succesfully!`, 'Message', {
      timeOut: 1000,
      positionClass: 'toast-top-left',
    });
  }

  showMarked(status: string) {
    this.isToBeMarked = { status: status, marked: true };
  }

  ngOnInit(): void {
    // this.transaction = this.emmitterService.getTransactionData();
    // this.dummyArray = this.emmitterService.getTransactionData();
    // console.log("get transaction>>",this.transaction);
    this.getEvenNumbersEmmitted();
    this.convertObservableIntoPromise();
    this.getCountdownTimer();
    this.getCustomerTransactionFromAPI();
  }



  emmitOddNumbers() {
    this.emmitterService.emmitDummyArray([1, 3, 5, 7])
  }

  getEvenNumbersEmmitted() {
    // Subscription is majorly done in the component
    this.evenNumbersSubscription$ = this.emmitterService.getEmmittedEvenNumbersArray().subscribe({
      next: (evenNumbersArray: number[]) => {
        //  console.log("evenNumbersArray>>",evenNumbersArray);
        this.evenNumbers = evenNumbersArray.toString();
      },
      error: (err: Error | any) => {
        console.error("error from the emmitted observable>>", err);
      },
      complete: () => {
        console.info("Data subscribed succesfully!");
      }
    })
  }

  async convertObservableIntoPromise(): Promise<number[]> {
    try {
      // firstValueFrom is used to convert an observable into a promise.
      // However, it intercepts the first emmission
      // const arrayResponse = await firstValueFrom(this.emmitterService.getEmmittedEvenNumbersArray());
      const arrayResponse = await lastValueFrom(this.emmitterService.getEmmittedEvenNumbersArray());
      // lastValueFrom is used to convert an observable into a promise.
      // However, it intercepts the last emmission
      console.log("arrayResponse>>", arrayResponse);
      this.evenNumbers = arrayResponse.toString();
      return arrayResponse;
    } catch (err: Error | any) {
      console.error("error converting observable to a promise>>", err);
      return []; // error catch
    }
  }


  ngOnDestroy(): void {
    this.evenNumbersSubscription$.unsubscribe();
  }


  getCountdownTimer() {
    this.timerSubscription$ = this.timer$.subscribe({
      next: (time: number) => {
        this.formattedTime = this.formatTime(time);
      },
      complete: () => {
        console.log("Countdown finished!");
      }
    });
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }


  getCustomerTransactionFromAPI() {
    this.apiService.getCustomerTransaction(this.paginationParams).subscribe({
      next: (response: any) => {
        console.log("Http response>>", response);
        this.showSpinner = false;
        this.transaction = response.reverse();
        this.paginationArrayToShow = Array(this.paginationParams._page).fill(this.paginationParams._page).map((_, index) => index + 1);
        if (this.transaction?.length === 0) {
          this.showNoData = true;
          this.showPagination = false;
        } else if (this.transaction?.length > 0) {
          this.showNoData = false;
          this.showPagination = true;
        }
      },
      error: (err: Error | any) => {
        console.log("error from Http fetch>>", err)
      }
    })
    // http://localhost:3000/customers?_page=4&_limit=5
  }


  nextPage() {
    this.paginationParams._page++;
    this.showSpinner = true;
    this.getCustomerTransactionFromAPI();
  }

  prevPage() {
    if (this.paginationParams._page > 0) {
      this.paginationParams._page--;
      this.showSpinner = true;
      this.getCustomerTransactionFromAPI();
    }
  }

  getCurrentPage(pageNoToPull: number) {
    this.paginationParams._page = pageNoToPull;
    this.getCustomerTransactionFromAPI();
  }



  // npm i ngx-toastr: https://www.npmjs.com/package/ngx-toastr
  // npm install @angular/animations --save

}
