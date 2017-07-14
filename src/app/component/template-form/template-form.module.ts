import { FormDebugComponent } from './../form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TemplateFormComponent } from './template-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TemplateFormComponent,
    FormDebugComponent
  ]
})
export class TemplateFormModule { }
