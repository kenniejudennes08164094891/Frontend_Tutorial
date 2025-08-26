import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionObject } from 'src/app/models/mocks';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  transDetail!: TransactionObject;
  entryId: string | any;
  constructor(
    router: Router,
    private apiService: ApiService
  ) {
    const nav = router.getCurrentNavigation();
    const routeProps: any = nav?.extras.state;
    this.entryId = routeProps.transactionDetails;
  }

  routeBack() {
    window.history.go(-1); // or window.history.back();
  }

  getSingleTransaction(){
    this.apiService.getSingleTransaction(this.entryId).subscribe({
      next:(res:any)=>{
        console.log("Single transaction>>", res);
        this.transDetail = res;
      },
      error:(err:Error)=>{
        console.log("Error>>", err);    
      }
    })
  }
  

  ngOnInit(): void {
    this.getSingleTransaction();
  }
}
