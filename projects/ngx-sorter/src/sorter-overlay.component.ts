import { moveItemInArray } from "@angular/cdk/drag-drop";
import { FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { CdkPortal } from "@angular/cdk/portal";
import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewChild, inject
} from "@angular/core";
import { Subscription } from "rxjs";

export interface Sortable {
  key: string;
  displayName?: string;
  active: boolean;
}

@Component({
  selector: 'ngx-sorter',
  templateUrl: 'sorter-overlay.component.html',
  styleUrls: ['sorter-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSorterOverlayComponent implements OnDestroy {

  private overlay = inject(Overlay);

  origin: FlexibleConnectedPositionStrategyOrigin | undefined;
  @Input() sortables!: Sortable[] | undefined;
  @Output() change = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();
  @Output() hid = new EventEmitter<void>();
  @ViewChild(CdkPortal) private contentTemplate!: CdkPortal;

  #overlayRef!: OverlayRef;
  #subscriptions: Subscription[] = [];
  #overlayIsOpen = false;
  get overlayIsOpen() {
    return this.#overlayIsOpen;
  }

  // Will update the ```sortables``` list's order.
  onDrag(currentIndex: number, previousIndex: number) {
    if (this.sortables) {
      moveItemInArray(this.sortables, previousIndex, currentIndex);
      this.change.emit();
    }
  }

  // Will update the ```active``` value of the ```keyToUpdate```'s Sortable — from the ```sortables``` signal — into the provided value.
  checkboxChange(checked: boolean, keyToUpdate: string) {
    const col = this.sortables?.find(v => v.key === keyToUpdate);
    if (col) {
      col.active = checked;
      this.change.emit();
    }
  }

  showDropdown() {
    if (!this.origin)
      throw new Error("There's not an expertSorterTriggerFor directive pointing to this overlay. Please read how this component should be used at http://wiki.milenio3.local/index.php/@expert/sort-columns");

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPush(true)
      .withPositions([
        { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
        { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const overlayConfig = new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this.#overlayRef = this.overlay.create(overlayConfig);
    this.#overlayRef.attach(this.contentTemplate);
    this.#subscriptions.push(
      this.#overlayRef.backdropClick().subscribe(() => this.hide()),
    );
    this.#overlayIsOpen = true;
    this.opened.emit();
  }

  hide() {
    this.#overlayRef.detach();
    this.#overlayIsOpen = false;
    this.hid.emit();
  }

  ngOnDestroy() { this.#subscriptions.forEach(s => s.unsubscribe()); }

}
