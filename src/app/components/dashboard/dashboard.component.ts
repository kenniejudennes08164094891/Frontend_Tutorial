import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, lastValueFrom, map, Subscription, takeWhile, timer } from 'rxjs';
import { transactions, Transactions, TransactionObject, IsMarkedProps } from 'src/app/models/mocks';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private emmitterService: EmmittersService,
    private apiService:ApiService
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

  getCustomerTransactionFromAPI(){
    this.apiService.getCustomerTransaction().subscribe({
      next: (response:any) => {
        console.log("Http response>>", response);
        this.transaction = response;
      },
      error: (err: Error | any) => {
        console.log("error from Http fetch>>", err)
      }
    })
    // http://localhost:3000/customers?_page=4&_limit=5
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


  // npm i ngx-toastr: https://www.npmjs.com/package/ngx-toastr
  // npm install @angular/animations --save

}
