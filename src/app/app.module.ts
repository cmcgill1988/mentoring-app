import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { FIRESTORE_CONFIG } from './firestore.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { SharedComponentModule } from './shared-component/shared-component.module';
import { SharedDirectivesModule } from './shared-directives/shared-directives.module';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { AuthService } from './providers/auth.service';
import { LikesService } from './providers/likes.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    AdminModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FIRESTORE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AuthenticationModule,
    FormsModule,
    PagesModule,
    ReactiveFormsModule,
    SharedComponentModule,
    SharedDirectivesModule,
    ToasterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
    }),
  ],
  providers: [AuthService, LikesService, NgbDropdownConfig, HammerGestureConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
