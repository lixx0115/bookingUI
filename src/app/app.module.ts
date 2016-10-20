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
import { BookingCalendarComponent } from './booking/booking-calendar/booking-calendar.component';
import { DataDrivenComponent } from './data-driven/data-driven.component';
import { DoublePipe } from './double.pipe';
import { FilterPipe } from './filter.pipe';
import { FirebaseService } from './firebase.service';
import { CalendarModule, CalendarDateFormatter, CalendarEventTitle } from 'angular2-calendar/dist/esm/src';
import { BookingHomeComponent } from './booking/booking-home/booking-home.component';
import { BookingNewEventComponent } from './booking/booking-new-event/booking-new-event.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FacebookloginComponent } from './facebooklogin/facebooklogin.component';
import { FacebookService } from './facebook.service';
import { EventService } from './event.service';
import { ServiceProviderComponent, ServiceProviderSetupComponent, ServiceProviderHomeComponent, ServiceProviderCalenderComponent } from './service-provider/';
import { LogginGuard } from './logginGuard';
import { SearchService } from './search.service';

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
    BookingHomeComponent,
    BookingNewEventComponent,
    RegisterUserComponent,
    FacebookloginComponent,
    ServiceProviderSetupComponent,
    ServiceProviderHomeComponent,
    ServiceProviderCalenderComponent

  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, HttpModule,
    routing, CalendarModule
  ],
  providers: [FirebaseService, CalendarDateFormatter, CalendarEventTitle, FacebookService, EventService, LogginGuard, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
