import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbxdDemoList } from '../demo-list';

@Component({
  template: `
    <ngbxd-widget-demo
      *ngFor="let demo of demos"
      [id]="demo.id"
      [demoTitle]="demo.title"
      [code]="demo.code"
      [markup]="demo.markup"
      [component]="component"
    >
      <ng-template [ngComponentOutlet]="demo.type"></ng-template>
    </ngbxd-widget-demo>
  `
})
export class NgbxdExamplesPage {
  component: string;
  demos = [];

  constructor(route: ActivatedRoute, demoList: NgbxdDemoList) {
    // We go up to parent route defining /components/:widget to read the widget name
    // This route is declared in root app.routing.ts.
    const componentName = this.component = route.parent.parent.snapshot.url[1].path;
    if (componentName) {
      const demos = demoList.getDemos(componentName);
      if (demos) {
        this.demos = Object.keys(demos).map(id => {
          return {
            id,
            ...demos[id]
          };
        });
      }
    }
  }
}
