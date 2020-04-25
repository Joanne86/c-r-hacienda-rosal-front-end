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
import { HomeComponent } from './modules/resident/home/home.component';
import { AdminHomeComponent } from './modules/administrator/home/admin-home.component';
import { HeaderWelcomeComponent } from './modules/common/header-welcome/header-welcome.component';
import { NavMenuComponent } from './modules/common/nav-menu/nav-menu.component';
import { PubishComponent } from './modules/administrator/pubish/pubish.component';
import { RememberDebtorsComponent } from './modules/administrator/remember-debtors/remember-debtors.component';
import { NewsComponent } from './modules/resident/news/news.component';
import { PaymentsStateComponent } from './modules/resident/payments-state/payments-state.component';
import { SendRequestsComponent } from './modules/resident/send-requests/send-requests.component';
import { ModalInputComponent } from './modules/common/modal-input/modal-input.component';
import { NewsResponseComponent } from './modules/resident/news-response/news-response.component';
import { RepositoryService } from './core/services/repository.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequestService } from './core/services/request.service';
import { InputSearchComponent } from './modules/common/input-search/input-search.component';
import { AddResidentComponent } from './modules/administrator/add-resident/add-resident.component';
import { ModalCommentariesComponent } from './modules/common/modal-commentaries/modal-commentaries.component';
import {SecurityComponentsService} from './core/services/security-components.service';
import { FiltersComponent } from './modules/common/filters/filters.component';
import { UpdateInfoComponent } from './modules/administrator/update-info/update-info.component';
import { UpdateInfoRComponent } from './modules/resident/update-info-r/update-info-r.component';

const routes: Routes = [
  { path: 'excel', component: SelectExcelDataComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '*', redirectTo: '/login' },
  { path: 'resident-home', component: HomeComponent, children: [
    { path: 'news', component: NewsComponent },
    { path: 'payments-state', component: PaymentsStateComponent },
    { path: 'send-requests', component: SendRequestsComponent },
    { path: 'responses', component: NewsResponseComponent },
      { path: 'update-info', component: UpdateInfoRComponent }
  ]},
    { path: 'admin-home', component: AdminHomeComponent, children: [
    {path: 'publish', component: PubishComponent},
    {path: 'send-sms', component: NotifyResidentsComponent},
    {path: 'resident-news', component: ResidentNewsComponent},
    {path: 'remember-debtors', component: RememberDebtorsComponent},
      { path: 'update-info', component: UpdateInfoComponent }
  ]}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResidentNewsComponent,
    NotifyResidentsComponent,
    SelectExcelDataComponent,
    HomeComponent,
    HeaderWelcomeComponent,
    NavMenuComponent,
    AdminHomeComponent,
    PubishComponent,
    RememberDebtorsComponent,
    NewsComponent,
    PaymentsStateComponent,
    SendRequestsComponent,
    ModalInputComponent,
    NewsResponseComponent,
    InputSearchComponent,
    AddResidentComponent,
    ModalCommentariesComponent,
    FiltersComponent,
    UpdateInfoComponent,
    UpdateInfoRComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
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
    HttpClientModule
  ],
  providers: [RepositoryService, RequestService, HttpClient, SecurityComponentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
