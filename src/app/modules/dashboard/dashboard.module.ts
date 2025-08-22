import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SystemDesignModule } from "@/shared/system-design/system-design.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SystemDesignModule,
    
  ]
})
export class DashboardModule { }
