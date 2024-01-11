import { moveItemInArray } from "@angular/cdk/drag-drop";
import { FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { CdkPortal } from "@angular/cdk/portal";
import {
  ChangeDetectionStrategy, Component, inject, Input, OnDestroy, signal, ViewChild, WritableSignal,
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

  #overlay = inject(Overlay);

  origin: FlexibleConnectedPositionStrategyOrigin | undefined;
  @Input({ required: true }) sortables!: WritableSignal<Sortable[] | undefined>;
  @ViewChild(CdkPortal) private contentTemplate!: CdkPortal;

  #overlayRef!: OverlayRef;
  #subscriptions: Subscription[] = [];
  overlayIsOpen = signal(false);

  // Will update the ```sortables``` list's order.
  onDrag(currentIndex: number, previousIndex: number) {
    this.sortables.update(s => {
      if (!s) return s;
      const copy = [ ...s ];
      moveItemInArray(copy, previousIndex, currentIndex);
      return copy;
    });
  }

  // Will update the ```active``` value of the ```keyToUpdate```'s Sortable — from the ```sortables``` signal — into the provided value.
  checkboxChange(checked: boolean, keyToUpdate: string) {
    this.sortables.update(s => {
      const col = s?.find(v => v.key === keyToUpdate);
      if (!col || !s) return s;
      col.active = checked;
      return [ ...s ];
    });
  }

  showDropdown() {
    if (!this.origin)
      throw new Error("There's not an expertSorterTriggerFor directive pointing to this overlay. Please read how this component should be used at http://wiki.milenio3.local/index.php/@expert/sort-columns");

    const positionStrategy = this.#overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPush(true)
      .withPositions([
        { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
        { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
      ]);

    const scrollStrategy = this.#overlay.scrollStrategies.reposition();
    const overlayConfig = new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this.#overlayRef = this.#overlay.create(overlayConfig);
    this.#overlayRef.attach(this.contentTemplate);
    this.#subscriptions.push(
      this.#overlayRef.backdropClick().subscribe(() => this.hide()),
    );
    this.overlayIsOpen.set(true);
  }

  hide() {
    this.#overlayRef.detach();
    this.overlayIsOpen.set(false);
  }

  ngOnDestroy() { this.#subscriptions.forEach(s => s.unsubscribe()); }

}
