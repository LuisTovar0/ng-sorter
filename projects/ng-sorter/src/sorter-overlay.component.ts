import {moveItemInArray} from "@angular/cdk/drag-drop";
import {FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayConfig, OverlayRef} from "@angular/cdk/overlay";
import {CdkPortal} from "@angular/cdk/portal";
import {
  ChangeDetectionStrategy, Component, inject, Input, OnDestroy, signal, ViewChild, WritableSignal,
} from "@angular/core";
import {cloneDeep} from "lodash-es";
import {Subscription} from "rxjs";

export interface Sortable {
  key: string;
  displayName?: string;
  active: boolean;
}

@Component({
  selector: 'ngx-sorter',
  templateUrl:'sorter-overlay.component.html',
  styleUrl: 'sorter-overlay.component.scss',
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

  // Will update the <code>sortables</code> list's order.
  onDrag( currentIndex: number, previousIndex: number ) {
    this.sortables.update(s => {
      if (!s) return s;
      const copy = cloneDeep(s);
      moveItemInArray(copy, previousIndex, currentIndex);
      return copy;
    });
  }

  // Will update the <code>active</code> value of the <code>keyToUpdate</code>'s Sortable — from the <code>sortables</code> signal — into the provided value.
  checkboxChange(checked: boolean, keyToUpdate: string) {
    this.sortables.update(s => {
      const copy = cloneDeep(s);
      const col = copy?.find(v => v.key === keyToUpdate);
      if (!col) return copy;
      // the col variable is referenced by the "copy" array, that's why we're writing on it
      col.active = checked;
      return copy;
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
