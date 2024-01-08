import {Directive, ElementRef, inject, Input, OnInit} from '@angular/core';
import {SorterOverlayComponent} from "./sorter-overlay.component";

@Directive({
  selector: '[expertSorterTriggerFor]',
})
export class SorterOverlayTriggerDirective implements OnInit {

  #elementRef = inject(ElementRef<HTMLElement>);

  @Input() expertSorterTriggerFor!: SorterOverlayComponent;

  ngOnInit() {
    if (this.expertSorterTriggerFor.origin)
      throw "Only one expertSorterTriggerFor directive should point to a sorter overlay.";
    this.expertSorterTriggerFor.origin = this.#elementRef;
    this.#elementRef.nativeElement.addEventListener('click', () => this.expertSorterTriggerFor.showDropdown());
  }

}
