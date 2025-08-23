import { Injectable } from '@angular/core';
import { endpoints, PaginationParams } from '../models/mocks';
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
}
