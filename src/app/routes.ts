import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { BookingComponent } from './booking/booking.component'
import { DataDrivenComponent } from './data-driven/data-driven.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
const APP_ROUTE: Routes = [
    {
        path: '', component: HomeComponent

    },
    {
        path: 'booking', component: BookingComponent
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