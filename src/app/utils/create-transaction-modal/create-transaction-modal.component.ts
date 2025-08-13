import { Component } from '@angular/core';
import { TransactionType,TransactionStatus } from 'src/app/models/mocks';

@Component({
  selector: 'app-create-transaction-modal',
  templateUrl: './create-transaction-modal.component.html',
  styleUrls: ['./create-transaction-modal.component.scss']
})
export class CreateTransactionModalComponent {

  paymentTypes: string[] = TransactionType;
  transactionStatus: string[] = TransactionStatus;
  constructor(){}

}
