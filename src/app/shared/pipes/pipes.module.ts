import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesPipe } from './error-messages/error-messages.pipe';



@NgModule({
  declarations: [
    ErrorMessagesPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorMessagesPipe,
  ]
})
export class PipesModule { }
