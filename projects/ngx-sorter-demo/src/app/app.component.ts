import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { NgxSorterModule, Sortable } from "ngx-sorter";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, NgxSorterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  // The target type is string, there's the need for an object specifically for sorting. It will need mapping so it can be displayed.
  sortableColumns: Sortable[] = [
    { key: 'position', active: true, displayName: 'Position' },
    { key: 'name', active: true, displayName: 'Name' },
    { key: 'weight', active: true, displayName: 'Weight' },
    { key: 'symbol', active: true, displayName: 'Symbol' },
  ];
  displayedColumns!: string[];

  // The target type is an object, so it can be merged with the Sortable type. This way it won't need mapping in order to be displayed.
  sortableRows = ELEMENT_DATA.map(elem => ({ ...elem, key: elem.name, active: true }))
  dataSource!: PeriodicElement[];

  constructor() {
    this.setDisplayedColumns();
    this.setDataSource();
  }

  setDisplayedColumns() {
    this.displayedColumns = this.sortableColumns
      .filter(s => s.active)
      .map(s => s.key);
  }

  setDataSource() {
    this.dataSource = this.sortableRows.filter(s => s.active);
  }

}
