import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterSubmitDirective } from './control-directives/enter-submit.directive';
import { HoverLiftDirective } from './style-directives/hover-lift.directive';
import { StopRightClickDirective } from './control-directives/stop-right-click.directive';
import { NoImageSavingDirective } from './control-directives/no-image-saving.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EnterSubmitDirective, HoverLiftDirective, NoImageSavingDirective, StopRightClickDirective],
  exports: [
    CommonModule,
    EnterSubmitDirective,
    HoverLiftDirective,
    NoImageSavingDirective,
    StopRightClickDirective
  ]
})
export class SharedDirectivesModule {

 }
