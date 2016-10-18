import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule, FormBuilder } from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { routing } from './routes';
import { BookingComponent } from './booking/booking.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { BookingCalendarComponent } from './booking/booking-calendar/booking-calendar.component';
import { DataDrivenComponent } from './data-driven/data-driven.component';
import { DoublePipe } from './double.pipe';
import { FilterPipe } from './filter.pipe';
import { FirebaseService } from './firebase.service';
import { CalendarModule, CalendarDateFormatter, CalendarEventTitle } from 'angular2-calendar/dist/esm/src';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    BookingComponent,
    ServiceProviderComponent,
    BookingCalendarComponent,
    DataDrivenComponent,
    DoublePipe,
    FilterPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, HttpModule,
    routing, CalendarModule
  ],
  providers: [FirebaseService, CalendarDateFormatter, CalendarEventTitle],
  bootstrap: [AppComponent]
})
export class AppModule { }
