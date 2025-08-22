import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './atoms/button/button.component';
import { InputComponent } from './atoms/input/input.component';
import { LoaderComponent } from './atoms/loader/loader.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';



@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    LucideAngularModule.pick({ Eye, EyeOff }),
    ReactiveFormsModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    LoaderComponent
  ]
})
export class SystemDesignModule { }
