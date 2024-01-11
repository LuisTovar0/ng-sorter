# ngx-sorter

An Angular CDK overlay to sort anything.

![](./result.gif)

## Compatibility

| ngx-sorter | Angular                     |
|:-----------|:----------------------------|
| 3          | 17+ (uses new flow control) |
| 2          | 16+ (uses signals)          |
| 1          | 14+ (Ivy)                   |

Check out [the version tags](https://npmjs.org/package/ngx-sorter?activeTab=versions).

## Versions 2 and 3

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

| Name | Description |
|:-|:-|
| `overlayIsOpen: Signal<boolean>` | A signal, the boolean value of which is synced with whether the overlay is visible or not.
| `checkboxChange(checked: boolean, keyToUpdate: string): void` | Will update the `active` value of the `keyToUpdate`'s Sortable — from the `sortables` signal — into the provided value. It is called when a checkbox's value changes. |
| `onDrag(currentIndex: number, previousIndex: number)` | Will update the `sortables` list's order. It is called when the list order is changed in the overlay. |
| `showDropdown(): void` | Shows the overlay. |
| `hide(): void` | Hides the overlay. |

## Version 1

Make sure to install Angular Material before installing `ngx-sorter`.

**In the TypeScript**, declare a list of `Sortable`.

```typescript
import {Sortable} from "ngx-sorter";

@Component({/*...*/})
export class MyComponent {
  sortables: Sortable[] = [
    //...
  ];
}
```

**In the template**, declare the overlay and define its trigger:

```html
<button [ngxSorterTriggerFor]="sorter">Sort</button>
<ngx-sorter #sorter [sortables]="sortables"/>
```
