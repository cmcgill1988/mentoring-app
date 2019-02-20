import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';
import { FIRESTORE_CONFIG } from './firestore.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FIRESTORE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
