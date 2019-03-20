import { SharedDirectivesModule } from './../shared-directives/shared-directives.module';
import { RouterModule } from '@angular/router';
import { ModalService } from './../shared-component/modal/services/modal.service';
import { SharedComponentModule } from './../shared-component/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { adminRouting } from './admin.routing';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    adminRouting,
    SharedComponentModule,
    SharedDirectivesModule
  ],
  declarations: [
    AdminComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  exports: [
    AdminComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent],
  providers: [ModalService]
})
export class AdminModule { }
