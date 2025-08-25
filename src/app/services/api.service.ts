import { Injectable } from '@angular/core';
import { endpoints, PaginationParams,TransactionObject } from '../models/mocks';
import { environment } from '../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  public getCustomerTransaction(pagination:PaginationParams):Observable<any>{
    const header: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "method": "GET"
    })
    
    let paginationParams: HttpParams = new HttpParams().set('_page',String(pagination._page)).set('_limit', String(pagination._limit));
    const endpointUrl = `${environment.baseUrl}/${endpoints.getTransactions}`;
   return this.http.get<any>(endpointUrl,{headers: header, params: paginationParams });
  
  }

  public createTransaction(payload:TransactionObject):Observable<any>{
    const header: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "method": "POST"
    })
    const endpointUrl = `${environment.baseUrl}/${endpoints.createTransaction}`;
    const body = JSON.stringify(payload)
   return this.http.post<any>(endpointUrl,body,{headers: header});
  }

  public deleteTransaction(id:string):Observable<any>{
    const header: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "method": "DELETE"
    })
    const endpointUrl = `${environment.baseUrl}/${endpoints.deleteTransaction}/${id}`;
   return this.http.delete<any>(endpointUrl,{headers: header});
  } 

}
