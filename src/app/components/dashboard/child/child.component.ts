import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { IsMarkedProps, statsCards } from 'src/app/models/mocks';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnChanges{

  statsCards: any[] = statsCards;
  cardStatus: string = '';

  @Output() emmitCard: EventEmitter<string> = new EventEmitter<string>();

  // Communication from child component to parent component: @Output() decorator is used using event emitters.

  @Input() isMarked: IsMarkedProps = { status: null, marked: false };
  // Communication from parent to child component is done using @Input() decorator by property binding.


  constructor() {}


  fetchStatus(cardProp: any) {
    this.cardStatus = cardProp.status ?? null;
    this.emmitCard.emit(this.cardStatus); // emit the card's status to the parent component  
  }


  ngOnChanges(changes: SimpleChanges): void {
    // This lifecycle hook is called when any data-bound property of a directive changes.
    console.log('isMarked:', this.isMarked);
  }

}
