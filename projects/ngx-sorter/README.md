# ngx-sorter

An Angular CDK overlay to sort anything. [Check out the newer versions](https://github.com/LuisTovar0/ngx-sorter).

<img src="https://raw.githubusercontent.com/LuisTovar0/ngx-sorter/main/result.gif" style="border-radius: 6px; border: solid 1px"><!---->

## Compatibility

| ngx-sorter | Angular                     |
|:-----------|:----------------------------|
| 3          | 17+ (uses new flow control) |
| 2          | 16+ (uses signals)          |
| 1          | 14+ (Ivy)                   |

## Version 1 usage

[Demo](https://stackblitz.com/edit/ngx-sorter-v1-demo).

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

Now, the overlay actions will **mutate the `sortables` list**. Your component can react to these changes by reading from the `changes` event emitter.

Note: In newer versions of the library, this kind of reactivity is achieved from the use of signals, instead of an event emitter.


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
| get `overlayIsOpen: boolean` | A read-only boolean, the value of which is synced with whether the overlay is visible or not. |
| Output `opened: EventEmitter<void>` | Emits whenever the overlay becomes open. |
| Output `hid: EventEmitter<void>` | Emits whenever the overlay becomes hidden. |
| Output `change: EventEmitter<void>` | Emits whenever the `sortables` list is updated by the overlay component. |
| `checkboxChange(checked: boolean, keyToUpdate: string): void` | Toggles the `active` state of a sortable element identified by the given key (`keyToUpdate`) and emits the `change` event. |
| `onDrag(currentIndex: number, previousIndex: number)` | Will update the `sortables` list's order and emit the `change` event. It is called when the list order is changed in the overlay. |
| `showDropdown(): void` | Shows the overlay. |
| `hide(): void` | Hides the overlay. |
