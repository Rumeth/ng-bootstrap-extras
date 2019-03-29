import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { NgbxMenu } from './menu';

export { NgbxMenu } from './menu';
export { NgbxMenuList, NgbxMenuItem } from './menu-config';

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [NgbxMenu],
  exports: [NgbxMenu],
  providers: []
})

export class NgbxMenuModule {
}
