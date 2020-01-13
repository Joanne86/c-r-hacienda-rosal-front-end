import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/common/login/login.component';
import { ResidentNewsComponent } from './modules/administrator/resident-news/resident-news.component';
import { NotifyResidentsComponent } from './modules/administrator/notify-residents/notify-residents.component';
import { SelectExcelDataComponent } from './modules/administrator/select-excel-data/select-excel-data.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UploaderModule} from '@syncfusion/ej2-angular-inputs';
import {GridAllModule} from '@syncfusion/ej2-angular-grids';
import {CheckBoxModule} from '@syncfusion/ej2-angular-buttons';

import { HttpModule, JsonpModule } from '@angular/http';

import { DialogModule } from '@syncfusion/ej2-angular-popups';
const routes: Routes = [
  { path: 'excel', component: SelectExcelDataComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResidentNewsComponent,
    NotifyResidentsComponent,
    SelectExcelDataComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CheckBoxModule,
    GridAllModule,
    UploaderModule,
    DialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, SelectExcelDataComponent]
})
export class AppModule { }
