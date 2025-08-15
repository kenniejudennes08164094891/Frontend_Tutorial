import { Component, OnInit } from '@angular/core';
import { TransactionType, TransactionStatus, TransactionObject } from 'src/app/models/mocks';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmmittersService } from 'src/app/services/emmitters.service';

@Component({
  selector: 'app-create-transaction-modal',
  templateUrl: './create-transaction-modal.component.html',
  styleUrls: ['./create-transaction-modal.component.scss']
})
export class CreateTransactionModalComponent implements OnInit {

  paymentTypes: string[] = TransactionType;
  transactionStatus: string[] = TransactionStatus;
  transactionForm!: FormGroup;
  transactionObject: TransactionObject = {
    date: "",
    type: "",
    amount: 0,
    status: "",
    metaData: undefined
  }

  constructor(
    private emmitterService: EmmittersService
  ) { }

  getReactiveForm() {
    this.transactionForm = new FormGroup({
      createdDate: new FormControl(new Date(), [Validators.required]),
      amount: new FormControl("", [Validators.required,  Validators.min(5000), Validators.pattern('[0-9]*')]),  // Validators.min(5000), Validators.max(100000), Validators.minLength(4), Validators.maxLength(7)
      payemntType: new FormControl("", [Validators.required]),
      paymentStatus: new FormControl("", [Validators.required])
    })
  }

  submitTransaction() {
    // console.log("transaction>>", this.transactionForm.value);
    this.transactionObject.amount = Number(this.transactionForm.get('amount')?.value),
    this.transactionObject.date = this.transactionForm.get('createdDate')?.value?.toLocaleDateString(),
    this.transactionObject.status = this.transactionForm.get('paymentStatus')?.value,
    this.transactionObject.type = this.transactionForm.get('payemntType')?.value,
    this.transactionObject.metaData = undefined;
    this.emmitterService.setTransactionData(this.transactionObject);
  }

  ngOnInit(): void {
    this.getReactiveForm();
  }

}
