import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure-page',
  templateUrl: './secure-page.component.html',
  styleUrls: ['./secure-page.component.scss']
})
export class SecurePageComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  public async logout(): Promise<void> {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }

}
