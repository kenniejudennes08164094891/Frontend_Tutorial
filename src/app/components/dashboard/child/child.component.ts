import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IsMarkedProps, statsCards, StatusCards, TransactionObject, Transactions, TransStatus } from 'src/app/models/mocks';
import { EmmittersService } from 'src/app/services/emmitters.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  statsCards: StatusCards[] = []; //statsCards;
  cardStatus: string = '';

  @Output() emmitCard: EventEmitter<string> = new EventEmitter<string>();

  // Communication from child component to parent component: @Output() decorator is used using event emitters.

  @Input() isMarked: IsMarkedProps = { status: null, marked: false };
  // Communication from parent to child component is done using @Input() decorator by property binding.

  transactionArray: Transactions[] = [];


  constructor(
    private emmitterService: EmmittersService
  ) { }


  fetchStatus(cardProp: any) {
    this.cardStatus = cardProp.status ?? null;
    this.emmitCard.emit(this.cardStatus); // emit the card's status to the parent component  
  }


  ngOnInit(): void {
    //  console.log("stats cards in child component>>", this.emmitterService.getStatusCard());
    this.getStatusCard();
    this.getEmmittedTransArray();
  }

  public getEmmittedTransArray() {
    this.emmitterService.getEmmittedTransArray().subscribe({
      next: (transactionArray: Transactions[]) => {
        let totalTransactions = transactionArray.length;
        let completedTransactions = transactionArray.filter((transaction: TransactionObject) => transaction.status?.trim().toLowerCase() === TransStatus.completed?.trim().toLowerCase());
        let pendingTransactions = transactionArray.filter((transaction: TransactionObject) => transaction.status?.trim().toLowerCase() === TransStatus.pending?.trim().toLowerCase())
        let failedTransactions = transactionArray.filter((transaction: TransactionObject) => transaction.status?.trim().toLowerCase() === TransStatus.failed?.trim().toLowerCase())


        const statsCards = [
          { title: 'Total Transactions amount', value: String(totalTransactions), color: 'text-gray-800' },
          { title: 'Pending Transactions', value: String(pendingTransactions.length), color: 'text-yellow-500', status: TransStatus.pending },
          { title: 'Completed Transactions', value: String(completedTransactions.length), color: 'text-green-500', status: TransStatus.completed },
          { title: 'Failed Transactions', value: String(failedTransactions.length), color: 'text-red-500', status: TransStatus.failed }
        ]

        this.statsCards = statsCards;
      }
    })
  }


  public getStatusCard(): void {
    let transactionArray: any[] = this.emmitterService.getTransactionData();

  }



}
