# ngx-sorter

An Angular CDK overlay to sort anything.

![](https://raw.githubusercontent.com/LuisTovar0/ngx-sorter/main/result.gif)

## Compatibility

| ngx-sorter | Angular                     |
|:-----------|:----------------------------|
| 3          | 17+ (uses new flow control) |
| 2          | 16+ (uses signals)          |
| 1          | 14+ (Ivy)                   |

## Versions 2 and 3 usage

[V2 demo](https://stackblitz.com/edit/ngx-sorter-v2-demo) and [V3 demo](https://stackblitz.com/edit/ngx-sorter-v3-demo) (they're the same, just using different versions of Angular and `ngx-sorter`).

It works very similarly to the [Angular Material Menu](https://material.angular.io/components/menu).

Make sure to install Angular Material before installing `ngx-sorter`.

**In the TypeScript**, declare a signal of the type `Array<Sortable>`.

```typescript
import {signal} from "@angular/core";
import {Sortable} from "ngx-sorter";

@Component({/*...*/})
export class MyComponent {
  sortablesSig = signal<Sortable[]>([
    //...
  ]);
}
```

**In the template**, declare the overlay and define its trigger:

```html
<button [ngxSorterTriggerFor]="sorter">Sort</button>
<ngx-sorter #sorter [sortables]="sortablesSig"/>
```

### Specifications

#### Sortable type

```typescript
interface Sortable {
  active: boolean
  key: string           // must be unique
  displayName?: string  // if omitted, the key is displayed
}
```

#### NgxSorterOverlayComponent's available methods and properties

| Declaration | Description |
|:-|:-|
| `overlayIsOpen: Signal<boolean>` | A signal, the boolean value of which is synced with whether the overlay is visible or not.
| `checkboxChange(checked: boolean, keyToUpdate: string): void` | Will update the `active` value of the `keyToUpdate`'s Sortable — from the `sortables` signal — into the provided value. It is called when a checkbox's value changes. |
| `onDrag(currentIndex: number, previousIndex: number)` | Will update the `sortables` list's order. It is called when the list order is changed in the overlay. |
| `showDropdown(): void` | Shows the overlay. |
| `hide(): void` | Hides the overlay. |
