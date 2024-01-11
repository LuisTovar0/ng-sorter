import {Directive, ElementRef, inject, Input, OnInit} from '@angular/core';
import {NgxSorterOverlayComponent} from "./sorter-overlay.component";

@Directive({ selector: '[ngxSorterTriggerFor]' })
export class SorterTriggerDirective implements OnInit {

  #elementRef = inject(ElementRef<HTMLElement>);

  @Input() ngxSorterTriggerFor!: NgxSorterOverlayComponent;

  ngOnInit() {
    if (this.ngxSorterTriggerFor.origin)
      throw "Only one expertSorterTriggerFor directive should point to a sorter overlay.";
    this.ngxSorterTriggerFor.origin = this.#elementRef;
    this.#elementRef.nativeElement.addEventListener('click', () => this.ngxSorterTriggerFor.showDropdown());
  }

}
