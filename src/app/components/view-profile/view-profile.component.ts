import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionObject } from 'src/app/models/mocks';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {

  transDetail!: TransactionObject;
  constructor(
    router: Router
  ) {
    const nav = router.getCurrentNavigation();
    const routeProps: any = nav?.extras.state;
    console.log("Navigation state:", routeProps.transactionDetails);
    this.transDetail = routeProps.transactionDetails;
  }

  routeBack() {
    window.history.go(-1); // or window.history.back();
  }
}
