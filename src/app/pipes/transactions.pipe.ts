import { Pipe, PipeTransform } from '@angular/core';
import { TransactionObject, Transactions } from '../models/mocks';

@Pipe({
  name: 'transactions'
})
export class TransactionsPipe implements PipeTransform {

  // array must be at the LHS. While the string must be at the RHS...i.e transform(array, string)
  transform(transactionArray: Transactions[],searchedString: string): any {
    let filteredResult:any[] = [];

    if(searchedString?.trim()?.length === 0 || transactionArray.length === 0){
     return filteredResult = transactionArray;
    }

    filteredResult = transactionArray.filter((item: TransactionObject) => JSON.stringify(item)?.toLocaleLowerCase()?.includes(searchedString.trim()?.toLocaleLowerCase()));
    return filteredResult;
  }

}
