import { Injectable } from '@angular/core';

export interface NgbxdDemoConfig {
  title: string;
  code: string;
  markup: string;
  type: any;
}

export interface NgbxdDemoListConfig {
  [demo: string]: NgbxdDemoConfig;
}

export interface NgbxdDemoOverviewConfig {
  [anchor: string]: string;
}

@Injectable({providedIn: 'root'})
export class NgbxdDemoList {
  private _demos: {
    [widget: string]: NgbxdDemoListConfig
  } = {};

  private _overviews: {
    [widget: string]: NgbxdDemoOverviewConfig
  } = {};


  register(widget: string, list: NgbxdDemoListConfig, overview?: NgbxdDemoOverviewConfig) {
    this._demos[widget] = list;
    if (overview) {
      this._overviews[widget] = overview;
    }
  }

  getDemos(widget: string) {
    return this._demos[widget];
  }

  getOverviewSections(widget: string) {
    const overview = this._overviews[widget];
    const sections = {};
    if (overview) {
      Object.keys(overview).forEach(fragment => {
        sections[fragment] = {
          fragment,
          title: overview[fragment]
        };
      });
    }
    return sections;
  }
}
