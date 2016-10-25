import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { BookingComponent } from './booking/booking.component'
import { BookingCalendarComponent } from './booking/booking-calendar/booking-calendar.component';
import { BookingHomeComponent } from './booking/booking-home/booking-home.component';
import { BookingNewEventComponent } from './booking/booking-new-event/booking-new-event.component'
import { DataDrivenComponent } from './data-driven/data-driven.component';
import { ServiceProviderComponent, ServiceProviderCalenderComponent, ServiceProviderSetupComponent, ServiceProviderHomeComponent } from './service-provider';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LogginGuard } from './logginGuard';

import { DevComponent } from './booking/dev/dev.component';
const APP_ROUTE: Routes = [
    {
        path: '', component: HomeComponent

    },
    {
        path: 'booking', component: BookingComponent
    },
    {
        path: 'register', component: RegisterUserComponent
    },
    {
        path: 'booking', component: BookingComponent,
        children: [

            {
                path: 'home', component: BookingHomeComponent
            },
            {
                path: 'newevent', component: BookingNewEventComponent, canActivate: [LogginGuard]
            },
            {
                path: 'calendar', component: BookingCalendarComponent, canActivate: [LogginGuard]
            },
            {
                path: 'dev', component: DevComponent, canActivate: [LogginGuard]
            }


        ]

    }
    , {
        path: 'serviceprovider', component: ServiceProviderComponent
    },
    {
        path: 'serviceprovider', component: ServiceProviderComponent,
        children: [

            {
                path: 'home', component: ServiceProviderHomeComponent
            },
            {
                path: 'setup', component: ServiceProviderSetupComponent, canActivate: [LogginGuard]
            },
            {
                path: 'calendar', component: ServiceProviderCalenderComponent, canActivate: [LogginGuard]
            }

        ]

    },
    {
        path: 'datadriven', component: DataDrivenComponent
    },
    {
        path: 'signin', component: SigninComponent
    }

]

export const routing = RouterModule.forRoot(APP_ROUTE);