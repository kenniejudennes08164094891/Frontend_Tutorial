import { Component, Inject, OnInit } from '@angular/core';
import { TransactionType, TransactionStatus, TransactionObject } from 'src/app/models/mocks';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmmittersService } from 'src/app/services/emmitters.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.scss']
})
export class UpdateTransactionComponent {

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
  header: string = "";
  btnText: string = "Update Transaction";

  constructor(
    private emmitterService: EmmittersService,
    @Inject(MAT_DIALOG_DATA) public data: any,   // receives from the dashboard
    public dialogRef: MatDialogRef<UpdateTransactionComponent>, // sends to ,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
//    console.log("data from dashboard>>", data);
    this.header = data?.title   // data comes from the matDialog declared in the dashboard component
  }


  getReactiveForm() {
    this.transactionForm = new FormGroup({
      createdDate: new FormControl(new Date(), [Validators.required]),
      amount: new FormControl("", [Validators.required, Validators.min(5000), Validators.pattern('[0-9]*')]),  // Validators.min(5000), Validators.max(100000), Validators.minLength(4), Validators.maxLength(7)
      payemntType: new FormControl("", [Validators.required]),
      paymentStatus: new FormControl("", [Validators.required])
    })
  }

  submitTransaction() {
    this.btnText = "Processing...";
    const entryId = this.data?.entryId;
    // console.log("transaction>>", this.transactionForm.value);
    this.transactionObject.amount = Number(this.transactionForm.get('amount')?.value),
      this.transactionObject.date = this.transactionForm.get('createdDate')?.value?.toLocaleDateString(),
      this.transactionObject.status = this.transactionForm.get('paymentStatus')?.value,
      this.transactionObject.type = this.transactionForm.get('payemntType')?.value,
      this.transactionObject.metaData = undefined;
    // this.emmitterService.setTransactionData(this.transactionObject);
    this.apiService.updateTransaction(entryId,this.transactionObject).subscribe({
      next: (res) => {
        console.log("response from update transaction api>>", res);
        this.dialogRef.close(this.transactionObject);
        this.toastr.success("Transaction updated successfully!", "Success");
        setTimeout(() => location.reload(), 2000);
      },
      error: (err) => {
        console.log("error from create transaction api>>", err);
        this.btnText = "Update Transaction";
        this.toastr.error("Failed to create transaction!", "Error");
      }
    })
  } 

  autoPopulateForm(){
    // console.log("entry details>>", this.data?.entryDetails);
    this.transactionForm.patchValue({
      createdDate: new Date(this.data?.entryDetails?.date),
      amount: this.data?.entryDetails?.amount,
      payemntType: this.data?.entryDetails?.type,
      paymentStatus: this.data?.entryDetails?.status
    });
  }

  ngOnInit(): void {
    this.getReactiveForm();
    this.autoPopulateForm();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
