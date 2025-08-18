import { Injectable } from '@angular/core';
import { Transactions, TransactionObject, StatusCards } from '../models/mocks';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmmittersService {

  transactionArray: Transactions[] = [];
  statusCard: StatusCards[] = [];
  emmitTransactionsArray$: BehaviorSubject<Transactions[]> = new BehaviorSubject<Transactions[]>([]);
  // Behaviour subjectb helps to emmit the lattest property in the DOM tree
  constructor() {}

  public setTransactionData(transaction: TransactionObject): void {
    this.transactionArray.push(transaction);

    this. emmitTransactionsArray$.next(this.transactionArray); // is for the statusCard
  }

  public getTransactionData(): Transactions[] {
    return this.transactionArray;
  }

  public getEmmittedTransArray():Observable<Transactions[]>{ // is for the statusCard
    return this.emmitTransactionsArray$.asObservable();
  }


}
