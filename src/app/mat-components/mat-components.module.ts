import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class MatComponentsModule { }
