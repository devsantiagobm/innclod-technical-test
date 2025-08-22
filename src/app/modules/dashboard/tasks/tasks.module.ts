import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { SystemDesignModule } from '@/shared/system-design/system-design.module';
import { ArrowLeft, LucideAngularModule, Pencil, Plus, Trash } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TasksListComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SystemDesignModule,
    LucideAngularModule.pick({Plus, ArrowLeft, Pencil, Trash}),
    ReactiveFormsModule
  ]
})
export class TasksModule { }
