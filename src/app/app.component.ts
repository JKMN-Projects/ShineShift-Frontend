import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../Services/authentication.service';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDrawer, MatDrawerContainer, MatCardModule, MatIcon, CommonModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ShineShift';

  constructor(private authService: AuthenticationService, private router: Router) {
  };

  NavigateToHomeView() {
    this.router.navigateByUrl("/");
  }

  NavigateToDashboardView() {
    this.router.navigateByUrl("/Dashboards");
  }

  NavigateToSensorView() {
    this.router.navigateByUrl("/Sensors");
  }

  NavigateToHubView() {
    this.router.navigateByUrl("/Hubs");
  }

  NavigateToMyHubsView() {
    this.router.navigateByUrl("/MyHubs");
  }

  NavigateToUserView() {
    this.router.navigateByUrl("/Users");
  }

  Logout() {
    this.authService.removeToken();
    this.router.navigateByUrl("/")
  };
};
