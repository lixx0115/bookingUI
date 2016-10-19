import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { BookingComponent } from './booking/booking.component'
import { BookingCalendarComponent } from './booking/booking-calendar/booking-calendar.component';
import { BookingHomeComponent } from './booking/booking-home/booking-home.component';
import { BookingNewEventComponent } from './booking/booking-new-event/booking-new-event.component'
import { DataDrivenComponent } from './data-driven/data-driven.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { RegisterUserComponent } from './register-user/register-user.component';
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
                path: 'newevent', component: BookingNewEventComponent
            },
            {
                path: 'calendar', component: BookingCalendarComponent
            }

        ]

    }
    , {
        path: 'serviceprovider', component: ServiceProviderComponent
    },
    {
        path: 'datadriven', component: DataDrivenComponent
    },
    {
        path: 'signin', component: SigninComponent
    }

]

export const routing = RouterModule.forRoot(APP_ROUTE);