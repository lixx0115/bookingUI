import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

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
import { UserService } from './user.service';

import { ServiceProviderComponent, ServiceProviderSetupComponent, ServiceProviderHomeComponent, ServiceProviderCalenderComponent } from './service-provider/';
import { LogginGuard } from './logginGuard';
import { SearchService } from './search.service';
import { SliderTimePipe } from './slider-time.pipe';
import { CalendarComponent } from './shared';
import { DevComponent } from './booking/dev/dev.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { EventCreationComponent } from './shared/event-creation/event-creation.component';
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
    ServiceProviderCalenderComponent,
    SliderTimePipe,
    CalendarComponent,
    DevComponent, EventCreationComponent

  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, HttpModule,
    routing, CalendarModule, ModalModule.forRoot(), BootstrapModalModule
  ],
  providers: [FirebaseService, CalendarDateFormatter, CalendarEventTitle, FacebookService, EventService, LogginGuard, SearchService, UserService],

  bootstrap: [AppComponent],
  entryComponents: [EventCreationComponent]
})
export class AppModule { }
