import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/common/login/login.component';
import { ResidentNewsComponent } from './modules/administrator/resident-news/resident-news.component';
import { NotifyResidentsComponent } from './modules/administrator/notify-residents/notify-residents.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResidentNewsComponent,
    NotifyResidentsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
