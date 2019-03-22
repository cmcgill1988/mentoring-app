import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { routerAnimation } from './_animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation]
})
export class AppComponent {
  title = 'mentoring-app';

  constructor() {
  }

  public prepareRoute(outlet: RouterOutlet): void {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
