import {
  AfterContentChecked,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  forwardRef,
  Host,
  Inject,
  Input,
  Optional,
  Output,
  QueryList,
  TemplateRef
} from '@angular/core';

import {isString} from '../util/util';

import {NgbxAccordionConfig} from './accordion-config';

let nextId = 0;

/**
 * A context for the `NgbxPanelHeader` template
 *
 * @since 4.1.0
 */
export interface NgbxPanelHeaderContext {
  /**
   * True if current panel is opened
   */
  opened: boolean;
}

/**
 * A directive to put on a button that toggles panel opening and closing.
 * To be used inside the `NgbxPanelHeader`
 *
 * @since 4.1.0
 */
@Directive({
  selector: 'button[ngbxPanelToggle]',
  host: {
    'type': 'button',
    '[disabled]': 'panel.disabled',
    '[class.collapsed]': '!panel.isOpen',
    '[attr.aria-expanded]': 'panel.isOpen',
    '[attr.aria-controls]': 'panel.id',
    '(click)': 'accordion.toggle(panel.id)'
  }
})
export class NgbxPanelToggle {
  @Input()
  set ngbxPanelToggle(panel: NgbxPanel) {
    if (panel) {
      this.panel = panel;
    }
  }

  constructor(
      @Inject(forwardRef(() => NgbxAccordion)) public accordion: NgbxAccordion,
      @Optional() @Host() @Inject(forwardRef(() => NgbxPanel)) public panel: NgbxPanel) {}
}

/**
 * A directive to wrap an accordion panel header to contain any HTML markup and a toggling button with `NgbxPanelToggle`
 *
 * @since 4.1.0
 */
@Directive({selector: 'ng-template[ngbxPanelHeader]'})
export class NgbxPanelHeader {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
 */
@Directive({selector: 'ng-template[ngbxPanelTitle]'})
export class NgbxPanelTitle {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * This directive must be used to wrap accordion panel content.
 */
@Directive({selector: 'ng-template[ngbxPanelContent]'})
export class NgbxPanelContent {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * The NgbxPanel directive represents an individual panel with the title and collapsible
 * content
 */
@Directive({selector: 'ngbx-panel'})
export class NgbxPanel implements AfterContentChecked {
  /**
   *  A flag determining whether the panel is disabled or not.
   *  When disabled, the panel cannot be toggled.
   */
  @Input() disabled = false;

  /**
   *  An optional id for the panel. The id should be unique.
   *  If not provided, it will be auto-generated.
   */
  @Input() id = `ngbx-panel-${nextId++}`;

  /**
   * A flag telling if the panel is currently open
   */
  isOpen = false;

  /**
   *  The title for the panel.
   */
  @Input() title: string;

  /**
   *  Accordion's types of panels to be applied per panel basis.
   *  Bootstrap recognizes the following types: "primary", "secondary", "success", "danger", "warning", "info", "light"
   * and "dark"
   */
  @Input() type: string;

  titleTpl: NgbxPanelTitle | null;
  headerTpl: NgbxPanelHeader | null;
  contentTpl: NgbxPanelContent | null;

  @ContentChildren(NgbxPanelTitle, {descendants: false}) titleTpls: QueryList<NgbxPanelTitle>;
  @ContentChildren(NgbxPanelHeader, {descendants: false}) headerTpls: QueryList<NgbxPanelHeader>;
  @ContentChildren(NgbxPanelContent, {descendants: false}) contentTpls: QueryList<NgbxPanelContent>;

  ngAfterContentChecked() {
    // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
    // only @ContentChildren allows us to specify the {descendants: false} option.
    // Without {descendants: false} we are hitting bugs described in:
    // https://github.com/rumeth/ng-bootstrap-extras/issues/2240
    this.titleTpl = this.titleTpls.first;
    this.headerTpl = this.headerTpls.first;
    this.contentTpl = this.contentTpls.first;
  }
}

/**
 * The payload of the change event fired right before toggling an accordion panel
 */
export interface NgbxPanelChangeEvent {
  /**
   * Id of the accordion panel that is toggled
   */
  panelId: string;

  /**
   * Whether the panel will be opened (true) or closed (false)
   */
  nextState: boolean;

  /**
   * Function that will prevent panel toggling if called
   */
  preventDefault: () => void;
}

/**
 * The NgbxAccordion directive is a collection of panels.
 * It can assure that only one panel can be opened at a time.
 */
@Component({
  selector: 'ngbx-accordion',
  exportAs: 'ngbxAccordion',
  host: {'class': 'accordion', 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels'},
  template: `
    <ng-template #t ngbxPanelHeader let-panel>
      <button class="btn btn-link" [ngbxPanelToggle]="panel">
        {{panel.title}}<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
      </button>
    </ng-template>
    <ng-template ngFor let-panel [ngForOf]="panels">
      <div class="card">
        <div role="tab" id="{{panel.id}}-header" [class]="'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')">
          <ng-template [ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
                       [ngTemplateOutletContext]="{$implicit: panel, opened: panel.isOpen}"></ng-template>
        </div>
        <div id="{{panel.id}}" role="tabpanel" [attr.aria-labelledby]="panel.id + '-header'"
             class="collapse" [class.show]="panel.isOpen" *ngIf="!destroyOnHide || panel.isOpen">
          <div class="card-body">
               <ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef"></ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class NgbxAccordion implements AfterContentChecked {
  @ContentChildren(NgbxPanel) panels: QueryList<NgbxPanel>;

  /**
   * An array or comma separated strings of panel identifiers that should be opened
   */
  @Input() activeIds: string | string[] = [];

  /**
   *  Whether the other panels should be closed when a panel is opened
   */
  @Input('closeOthers') closeOtherPanels: boolean;

  /**
   * Whether the closed panels should be hidden without destroying them
   */
  @Input() destroyOnHide = true;

  /**
   *  Accordion's types of panels to be applied globally.
   *  Bootstrap recognizes the following types: "primary", "secondary", "success", "danger", "warning", "info", "light"
   * and "dark
   */
  @Input() type: string;

  /**
   * A panel change event fired right before the panel toggle happens. See NgbxPanelChangeEvent for payload details
   */
  @Output() panelChange = new EventEmitter<NgbxPanelChangeEvent>();

  constructor(config: NgbxAccordionConfig) {
    this.type = config.type;
    this.closeOtherPanels = config.closeOthers;
  }

  /**
   * Checks if a panel with a given id is expanded or not.
   */
  isExpanded(panelId: string): boolean { return this.activeIds.indexOf(panelId) > -1; }

  /**
   * Expands a panel with a given id. Has no effect if the panel is already expanded or disabled.
   */
  expand(panelId: string): void { this._changeOpenState(this._findPanelById(panelId), true); }

  /**
   * Expands all panels if [closeOthers]="false". For the [closeOthers]="true" case will have no effect if there is an
   * open panel, otherwise the first panel will be expanded.
   */
  expandAll(): void {
    if (this.closeOtherPanels) {
      if (this.activeIds.length === 0 && this.panels.length) {
        this._changeOpenState(this.panels.first, true);
      }
    } else {
      this.panels.forEach(panel => this._changeOpenState(panel, true));
    }
  }

  /**
   * Collapses a panel with a given id. Has no effect if the panel is already collapsed or disabled.
   */
  collapse(panelId: string) { this._changeOpenState(this._findPanelById(panelId), false); }

  /**
   * Collapses all open panels.
   */
  collapseAll() {
    this.panels.forEach((panel) => { this._changeOpenState(panel, false); });
  }

  /**
   * Programmatically toggle a panel with a given id. Has no effect if the panel is disabled.
   */
  toggle(panelId: string) {
    const panel = this._findPanelById(panelId);
    if (panel) {
      this._changeOpenState(panel, !panel.isOpen);
    }
  }

  ngAfterContentChecked() {
    // active id updates
    if (isString(this.activeIds)) {
      this.activeIds = this.activeIds.split(/\s*,\s*/);
    }

    // update panels open states
    this.panels.forEach(panel => panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1);

    // closeOthers updates
    if (this.activeIds.length > 1 && this.closeOtherPanels) {
      this._closeOthers(this.activeIds[0]);
      this._updateActiveIds();
    }
  }

  private _changeOpenState(panel: NgbxPanel, nextState: boolean) {
    if (panel && !panel.disabled && panel.isOpen !== nextState) {
      let defaultPrevented = false;

      this.panelChange.emit(
          {panelId: panel.id, nextState: nextState, preventDefault: () => { defaultPrevented = true; }});

      if (!defaultPrevented) {
        panel.isOpen = nextState;

        if (nextState && this.closeOtherPanels) {
          this._closeOthers(panel.id);
        }
        this._updateActiveIds();
      }
    }
  }

  private _closeOthers(panelId: string) {
    this.panels.forEach(panel => {
      if (panel.id !== panelId) {
        panel.isOpen = false;
      }
    });
  }

  private _findPanelById(panelId: string): NgbxPanel | null { return this.panels.find(p => p.id === panelId); }

  private _updateActiveIds() {
    this.activeIds = this.panels.filter(panel => panel.isOpen && !panel.disabled).map(panel => panel.id);
  }
}
