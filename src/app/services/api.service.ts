import { Injectable } from '@angular/core';
import { endpoints } from '../models/mocks';
import { environment } from '../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  public getCustomerTransaction():Observable<any>{
    const header: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "method": "GET"
    })
    const endpointUrl = `${environment.baseUrl}/${endpoints.getTransactions}`;
   return this.http.get<any>(endpointUrl,{headers: header});
  
  }
}
