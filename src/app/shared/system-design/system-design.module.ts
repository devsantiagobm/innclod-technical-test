import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './atoms/button/button.component';
import { InputComponent } from './atoms/input/input.component';
import { LoaderComponent } from './atoms/loader/loader.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Eye, EyeOff, LucideAngularModule, X } from 'lucide-angular';
import { ModalComponent } from './molecules/modal/modal.component';



@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    LoaderComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    LucideAngularModule.pick({ Eye, EyeOff, X }),
    ReactiveFormsModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    LoaderComponent,
    ModalComponent
  ]
})
export class SystemDesignModule { }
