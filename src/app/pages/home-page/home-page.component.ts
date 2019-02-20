import { Component, OnInit } from '@angular/core';
import { DbProvider } from 'src/app/core/db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public messages$: Observable<any[]>;
  constructor(private db: DbProvider) { }

  ngOnInit() {
  }

  public saveDb() {
    this.db.updateAt('testcollection', { message: 'hello test'});
  }

  public getMessages() {
    this.messages$ = this.db.collection$('testcollection');
  }

}
