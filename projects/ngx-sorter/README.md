# ngx-sorter v2

An Angular CDK overlay to sort anything.

![GIF of how it looks](https://raw.githubusercontent.com/LuisTovar0/ngx-sorter/main/result.gif)

Version 2 is used exactly like [version 3](https://npmjs.org/package/ngx-sorter/v/v3-lts), it's just slightly different under the hood:
+ Version 2 doesn't use Angular 17's new flow control syntax.
+ Angular 16 allows signal mutation.

The difference is bigger against version 1:
+ Version 1 does not use a signal to represent the list that's being sorted, so it mutates a plain object. This drastically changes the way the `ngx-sorter` component is used.

## Usage

[Here](https://stackblitz.com/edit/ngx-sorter-v2-demo)'s a working Stackblitz of this version.

Make sure to add Angular Material to the project before installing `ngx-sorter`.

**In the TypeScript**, declare a signal of the type `Array<Sortable>` (or of a type that extends it).

```typescript
import {signal} from "@angular/core";
import {Sortable} from "ngx-sorter";

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
