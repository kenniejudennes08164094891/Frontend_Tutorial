import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// FormsModule is used for template-driven forms i.e [(ngModel)] binding
// ReactiveFormsModule is used for form controls and validations. It is the most effecient form method in Angular

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChildComponent } from './components/dashboard/child/child.component';
import { TransactionsPipe } from './pipes/transactions.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CreateTransactionModalComponent } from './utils/create-transaction-modal/create-transaction-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormatAmountDirective } from './validators/format-amount.directive';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { UpdateTransactionComponent } from './utils/update-transaction/update-transaction.component';

const materialModules = [
  MatDialogModule,MatButtonModule,MatFormFieldModule,MatInputModule,
  MatIconModule,MatRadioModule,MatSelectModule,MatToolbarModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ViewProfileComponent,
    ChildComponent,
    TransactionsPipe,
    CreateTransactionModalComponent,
    FormatAmountDirective,
    UpdateTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    materialModules,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


//  npm install -g json-server
//  json-server --watch db.json