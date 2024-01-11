# ngx-sorter

An Angular CDK overlay to sort anything.

<!-- TOC -->

* [ngx-sorter](#ngx-sorter)
  * [Compatibility table](#compatibility-table)
  * [For Angular 16+](#for-angular-16)

<!-- TOC -->

## Compatibility table

| ngx-sorter | Angular |
|:-----------|:--------|
| 3          | 17+     |
| 2          | 16+     |
| 1          | 14+     |

Check out [the version tags](https://npmjs.org/package/ngx-sorter?activeTab=versions).

## Version 3

This is how it looks:

![](./result.gif)

It works very similarly to the [Angular Material Menu](https://material.angular.io/components/menu).

Make sure to install Angular Material before installing `ngx-sorter`.

**In the TypeScript**, declare a signal of the type `Array<Sortable>` (or of a type that extends it).

### Implementing

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

## Version 2

[Here](https://stackblitz.com/edit/ngx-sorter-v2-demo)'s a working Stackblitz of this version.

Is used exactly like version 3, it's just slightly different under the hood:

+ Version 2 doesn't use Angular 17's new flow control syntax.
+ Angular 16 allows signal mutation.
