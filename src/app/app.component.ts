import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../Services/authentication.service';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { EventBusService } from '../Services/event-bus.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDrawer, MatDrawerContainer, MatCardModule, MatIcon, CommonModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ShineShift';
  eventBusSub?: Subscription;
  isLoggedIn$ = this.authService.loggedIn$;

  constructor(public authService: AuthenticationService, private router: Router, private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.Logout();
    });
  }

  NavigateToHomeView() {
    this.router.navigateByUrl("/");
  }

  NavigateToLoginView() {
    this.router.navigateByUrl("/Login");
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

  IsAdmin(): boolean {
    return this.authService.isAdmin();
  }

  IsSupport(): boolean {
    return this.authService.isSupport();
  }

  Logout() {
    this.authService.removeToken();
    this.router.navigateByUrl("/");
  };
};
