import { Component } from '@angular/core';
import { Router } from '@angular/router';

export const componentsList = [
  'Confirmation'
];

@Component({
  selector: 'ngbxd-side-nav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent {
  components = componentsList;

  constructor(private router: Router) {}

  isActive(currentRoute: any[], exact = true): boolean {
    return this.router.isActive(this.router.createUrlTree(currentRoute), exact);
  }
}
