import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

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
import { RegistryComponent } from './modules/resident/registry/registry.component';
import { HomeComponent } from './modules/resident/home/home.component';
import { AdminHomeComponent } from './modules/administrator/home/admin-home.component';
import { HeaderWelcomeComponent } from './modules/common/header-welcome/header-welcome.component';
import { NavMenuComponent } from './modules/common/nav-menu/nav-menu.component';
import { PubishComponent } from './modules/administrator/pubish/pubish.component';
import { SendNewsComponent } from './modules/administrator/send-news/send-news.component';
import { RememberDebtorsComponent } from './modules/administrator/remember-debtors/remember-debtors.component';
import { NewsComponent } from './modules/resident/news/news.component';
import { PaymentsStateComponent } from './modules/resident/payments-state/payments-state.component';
import { SendRequestsComponent } from './modules/resident/send-requests/send-requests.component';
import { ModalInputComponent } from './modules/common/modal-input/modal-input.component';

const routes: Routes = [
  { path: 'excel', component: SelectExcelDataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registry', component: RegistryComponent },
  { path: 'resident-home', component: HomeComponent, children: [
    { path: 'news', component: NewsComponent },
    { path: 'payments-state', component: PaymentsStateComponent },
    { path: 'send-requests', component: SendRequestsComponent },
  ]},
  { path: 'admin-home', component: AdminHomeComponent, children: [
    {path: 'publish', component: PubishComponent},
    {path: 'send-news', component: SendNewsComponent},
    {path: 'resident-news', component: ResidentNewsComponent},
    {path: 'remember-debtors', component: RememberDebtorsComponent}
  ]}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResidentNewsComponent,
    NotifyResidentsComponent,
    SelectExcelDataComponent,
    RegistryComponent,
    HomeComponent,
    HeaderWelcomeComponent,
    NavMenuComponent,
    AdminHomeComponent,
    PubishComponent,
    SendNewsComponent,
    RememberDebtorsComponent,
    NewsComponent,
    PaymentsStateComponent,
    SendRequestsComponent,
    ModalInputComponent 
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
  bootstrap: [AppComponent]
})
export class AppModule { }
