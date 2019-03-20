import { SharedDirectivesModule } from './../shared-directives/shared-directives.module';
import { RouterModule } from '@angular/router';
import { ModalService } from './../shared-component/modal/services/modal.service';
import { SharedComponentModule } from './../shared-component/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { adminRouting } from './admin.routing';
import { ToasterService } from 'angular2-toaster';
import { ForgotComponent } from './forgot/forgot.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    adminRouting,
    SharedComponentModule,
    SharedDirectivesModule,
  ],
  declarations: [
    AdminComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ForgotComponent
  ],
  exports: [
    AdminComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent],
  providers: [ModalService, ToasterService]
})
export class AdminModule { }
