import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawComponent } from './draw.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    DrawComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class DrawModule { }
