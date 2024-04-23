import { Routes } from '@angular/router';
import { Login } from '../Components/login/login.component';
import { SensorViewComponent } from '../Components/sensor-view/sensor-view.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { HubViewComponent } from '../Components/hub-view/hub-view.component';
import { UserViewComponent } from '../Components/user-view/user-view.component';
import { MyHubViewComponent } from '../Components/my-hub-view/my-hub-view.component';

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
    path: 'Hubs',
    component: HubViewComponent
  },
  {
    path: 'MyHubs',
    component: MyHubViewComponent
  },
  {
    path: 'Sensors',
    component: SensorViewComponent
  },
  {
    path: 'Users',
    component: UserViewComponent
  }
];
