import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { SystemDesignModule } from "@/shared/system-design/system-design.module";
import { LucideAngularModule, Plus, LogOut, Building2, Mail, Phone, Globe, Logs, Trash, Pencil, } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SystemDesignModule,
    LucideAngularModule.pick({ Plus, LogOut, Building2, Mail, Phone, Globe, Logs, Trash, Pencil }),
    ReactiveFormsModule
  ]
})
export class ProjectsModule { }
