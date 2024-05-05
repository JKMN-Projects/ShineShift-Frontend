import { Routes } from '@angular/router';
import { Login } from '../Components/Views/login/login.component';
import { HomePageComponent } from '../Components/Views/home-page/home-page.component';
import { UserViewComponent } from '../Components/Views/user-view/user-view.component';
import { MyHubViewComponent } from '../Components/Views/my-hub-view/my-hub-view.component';
import { SensorReadingViewComponent } from '../Components/Views/sensor-reading-view/sensor-reading-view.component';
import { HubDetailsComponent } from '../Components/Views/hub-details/hub-details.component';
import { UserDetailsComponent } from '../Components/Views/user-details/user-details.component';
import { DashboardViewComponent } from '../Components/Views/dashboard-view/dashboard-view.component';
import { AuthenticationService } from '../Services/authentication.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'Login',
    component: Login
  },
  {
    path: 'Dashboards',
    component: DashboardViewComponent,
    canActivate: [() => inject(AuthenticationService).isSupport()]
  },
  {
    path: 'MyHubs',
    component: MyHubViewComponent,
    canActivate: [() => inject(AuthenticationService).isSupport()]
  },
  {
    path: 'HubDetails',
    component: HubDetailsComponent,
    canActivate: [() => inject(AuthenticationService).isSupport()]
  },
  {
    path: 'SensorReading',
    component: SensorReadingViewComponent,
    canActivate: [() => inject(AuthenticationService).isSupport()]
  },
  {
    path: 'Users',
    component: UserViewComponent,
    canActivate: [() => inject(AuthenticationService).isAdmin()]
  },
  {
    path: 'UserDetails',
    component: UserDetailsComponent,
    canActivate: [() => inject(AuthenticationService).isAdmin()]
  }
];
