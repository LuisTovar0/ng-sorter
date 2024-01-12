import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgxSorterModule } from 'ngx-sorter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NgxSorterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
