import { Routes } from '@angular/router';
import { Login } from '../Components/login/login.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { UserViewComponent } from '../Components/user-view/user-view.component';
import { MyHubViewComponent } from '../Components/my-hub-view/my-hub-view.component';
import { SensorReadingViewComponent } from '../Components/sensor-reading-view/sensor-reading-view.component';
import { HubDetailsComponent } from '../Components/hub-details/hub-details.component';
import { UserDetailsComponent } from '../Components/user-details/user-details.component';
import { DashboardViewComponent } from '../Components/dashboard-view/dashboard-view.component';

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
    component: DashboardViewComponent
  },
  {
    path: 'MyHubs',
    component: MyHubViewComponent
  },
  {
    path: 'HubDetails',
    component: HubDetailsComponent
  },
  {
    path: 'SensorReading',
    component: SensorReadingViewComponent
  },
  {
    path: 'Users',
    component: UserViewComponent
  },
  {
    path: 'UserDetails',
    component: UserDetailsComponent
  }
];
