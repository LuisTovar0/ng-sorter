import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { NgFor } from "@angular/common";
import { NgModule } from "@angular/core"
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { NgxSorterOverlayComponent } from "./sorter-overlay.component";
import { SorterTriggerDirective } from "./sorter-trigger.directive";
import { OverlayModule } from "@angular/cdk/overlay";

@NgModule({
  declarations: [NgxSorterOverlayComponent, SorterTriggerDirective],
  imports: [
    NgFor,
    PortalModule,
    OverlayModule,
    DragDropModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  exports: [NgxSorterOverlayComponent, SorterTriggerDirective],
})
export class NgxSorterModule { }
