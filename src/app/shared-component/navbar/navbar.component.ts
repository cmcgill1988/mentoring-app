import { AuthService } from '../../providers/auth.service';
import { AvatarComponent } from './../avatar/avatar.component';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [AvatarComponent]
})

export class NavbarComponent implements OnInit {
  public authenticated: any;
  public currentUser: any;
  public isCollapsed: boolean = false;
  constructor(public authService: AuthService, private toasterService: ToasterService) { }

  public ngOnInit(): void {
    this.authService.user$.subscribe((response) => {
      this.currentUser = response;
    });

    if (window.screen.width < 800) {
      this.isCollapsed = true;
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.authenticated = false;
      this.toasterService.pop('success', 'Success', 'Logout Successful');
    } catch (error) {
      console.error(error);
      this.toasterService.pop('error', 'Error', 'Logout failed');
    }
  }
}
