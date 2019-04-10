import { Component, OnInit } from '@angular/core';
import { DbProvider } from 'src/app/core/db.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/providers/user.service';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public messages$: Observable<any[]>;
  public isAuthenticated: boolean;
  constructor(private db: DbProvider, private authService: AuthService) { }

  ngOnInit() {
    this.authService.loginStateChange$.subscribe((response) => this.isAuthenticated = response);
  }

  public saveDb() {
    this.db.updateAt('testcollection', { message: 'hello test'});
  }

  public getMessages() {
    this.messages$ = this.db.collection$('testcollection');
  }

}
