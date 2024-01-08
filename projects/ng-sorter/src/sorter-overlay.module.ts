import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { PortalModule } from "@angular/cdk/portal";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { SorterOverlayComponent } from "./sorter-overlay.component";
import { SorterOverlayTriggerDirective } from "./sorter-overlay-trigger.directive";

@NgModule({
  declarations: [SorterOverlayComponent, SorterOverlayTriggerDirective],
  imports: [
    PortalModule,
    CdkDrag,
    CdkDropList,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [SorterOverlayComponent, SorterOverlayTriggerDirective]
})
export class SorterOverlayModule { }
