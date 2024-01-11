# ngx-sorter

An Angular CDK overlay to sort anything.

![](https://raw.githubusercontent.com/LuisTovar0/ngx-sorter/main/result.gif)

## Compatibility

| ngx-sorter | Angular                     |
|:-----------|:----------------------------|
| 3          | 17+ (uses new flow control) |
| 2          | 16+ (uses signals)          |
| 1          | 14+ (Ivy)                   |

## Version 1 usage

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
| `overlayIsOpen: boolean` | A signal, the boolean value of which is synced with whether the overlay is visible or not. |
| `change: EventEmitter<void>` | Emits whenever the `sortables` list is updated by the overlay component. |
| `checkboxChange(checked: boolean, keyToUpdate: string): void` | Will update the `active` value of the `keyToUpdate`'s Sortable — from the `sortables` list — into the provided value. It is called when a checkbox's value changes. This triggers a `change` emitter event. |
| `onDrag(currentIndex: number, previousIndex: number)` | Will update the `sortables` list's order. It is called when the list order is changed in the overlay. This triggers a `change` emitter event. |
| `showDropdown(): void` | Shows the overlay. |
| `hide(): void` | Hides the overlay. |
