import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbxMenuList, NgbxMenuItem } from './menu-config';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbx-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgbxMenu implements OnInit
{
  @Input() ngbxMenuList: NgbxMenuList;

  constructor(private router: Router) { }

  ngOnInit ()
  {
  }

  navigate (ngbxMenuItem: NgbxMenuItem)
  {
    this.router.navigate([ngbxMenuItem.route]);
  }

  performAction (ngbxMenuItem: NgbxMenuItem)
  {
    if (ngbxMenuItem.list)
    {
      ngbxMenuItem.expanded = !ngbxMenuItem.expanded;
    }
    else
    {
      this.navigate(ngbxMenuItem);
    }
  }
}
