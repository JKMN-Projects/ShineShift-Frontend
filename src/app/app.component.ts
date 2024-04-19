import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../Services/authentication.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDrawer, MatDrawerContainer, MatIcon, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ShineShift';

  constructor(private authService: AuthenticationService, private router: Router) {
  };

  Logout() {
    this.authService.removeToken();
    this.router.navigateByUrl("/")
  };
};
