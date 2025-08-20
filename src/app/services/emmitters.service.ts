import { Injectable } from '@angular/core';
import { Transactions, TransactionObject, StatusCards } from '../models/mocks';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmmittersService {

  transactionArray: Transactions[] = [];
  statusCard: StatusCards[] = [];
  emmitTransactionsArray$: BehaviorSubject<Transactions[]> = new BehaviorSubject<Transactions[]>([]);
  // Behaviour subjectb helps to emmit the lattest property in the DOM tree


  dummyArrayTransmitter$: Subject<number[]> = new Subject<number[]>()

  constructor() {

  }

  public setTransactionData(transaction: TransactionObject): void { // emmitter
    this.transactionArray.push(transaction);

    this. emmitTransactionsArray$.next(this.transactionArray); // transmitter or transformers (middleware)
  }

  public getTransactionData(): Transactions[] {
    return this.transactionArray;
  }

  public getEmmittedTransArray():Observable<Transactions[]>{ // subscriber
    return this.emmitTransactionsArray$.asObservable();
  }

  // emmitters: kenny. The emmitters are the setters
  // transformers(middleware): air + google meet . In RxJs transformers are BehaviorSubject, ReplaySubject, Subject
  // subscribers: vic + sam. The subscribers are the getters


  // transformers or transformers or middleware:
  //1) BehaviorSubject: transmits the latest meaningful data...else it asummes null
  //2) ReplaySubject: transmits any sample of a meaningful emmition over a period of time.
  // ReplaySubject is a superset to BehaviorSubject

  // i.e emmited statement: Hello Victory...how are you.
  // BehaviorSubject would return "you." else it retuns null
  // But ReplaySubject can return any subset of the statement "Hello Victory...how are you."

  //3) Subject: returns any word in the statement "Hello Victory...how are you."
  //  ReplaySubject > Subject > BehaviorSubject


  // Emmitters: setters (emmitters are creators)
  emmitDummyArray(oddNumbers: number[]):void{
    this.dummyArrayTransmitter$.next(oddNumbers); // dummyArrayTransmitter$ is the middleware
    // .next is used to create an emmission...it creates a data as an observable
  }

  // subscriber: is now called in the component needing the data
  getEmmittedEvenNumbersArray():Observable<number[]>{
    // .asObservable() converts an emmitted data into a subcribable data
    return this.dummyArrayTransmitter$.asObservable().pipe( 
      map((arr: number[]) => arr.map((item) => 2 * item))
    )
  }

}
