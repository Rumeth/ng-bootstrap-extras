import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  OnChanges,
  Inject,
  Injector,
  Renderer2,
  ComponentRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  NgZone,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {listenToTriggers} from '../util/triggers';
import {ngbxAutoClose} from '../util/autoclose';
import {positionElements, PlacementArray} from '../util/positioning';
import {PopupService} from '../util/popup';

import {NgbxPopoverConfig} from './popover-config';

let nextId = 0;

@Component({
  selector: 'ngbx-popover-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'[class]': '"popover" + (popoverClass ? " " + popoverClass : "")', 'role': 'tooltip', '[id]': 'id'},
  template: `
    <div class="arrow"></div>
    <h3 class="popover-header" *ngIf="title != null">
      <ng-template #simpleTitle>{{title}}</ng-template>
      <ng-template [ngTemplateOutlet]="isTitleTemplate() ? title : simpleTitle" [ngTemplateOutletContext]="context"></ng-template>
    </h3>
    <div class="popover-body"><ng-content></ng-content></div>`,
  styleUrls: ['./popover.scss']
})
export class NgbxPopoverWindow {
  @Input() title: undefined | string | TemplateRef<any>;
  @Input() id: string;
  @Input() popoverClass: string;
  @Input() context: any;

  isTitleTemplate() { return this.title instanceof TemplateRef; }
}

/**
 * A lightweight, extensible directive for fancy popover creation.
 */
@Directive({selector: '[ngbxPopover]', exportAs: 'ngbxPopover'})
export class NgbxPopover implements OnInit, OnDestroy, OnChanges {
  /**
   * Indicates whether the popover should be closed on Escape key and inside/outside clicks.
   *
   * - true (default): closes on both outside and inside clicks as well as Escape presses
   * - false: disables the autoClose feature (NB: triggers still apply)
   * - 'inside': closes on inside clicks as well as Escape presses
   * - 'outside': closes on outside clicks (sometimes also achievable through triggers)
   * as well as Escape presses
   *
   * @since 3.0.0
   */
  @Input() autoClose: boolean | 'inside' | 'outside';
  /**
   * Content to be displayed as popover. If title and content are empty, the popover won't open.
   */
  @Input() ngbxPopover: string | TemplateRef<any>;
  /**
   * Title of a popover. If title and content are empty, the popover won't open.
   */
  @Input() popoverTitle: string | TemplateRef<any>;
  /**
    * Placement of a popover accepts:
    *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
    *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom",
    *  array or a space separated string of above values
    */
  @Input() placement: PlacementArray;
  /**
   * Specifies events that should trigger. Supports a space separated list of event names.
   */
  @Input() triggers: string;
  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  @Input() container: string;
  /**
   * A flag indicating if a given popover is disabled and should not be displayed.
   *
   * @since 1.1.0
   */
  @Input() disablePopover: boolean;
  /**
   * An optional class applied to ngbx-popover-window
   *
   * @since 2.2.0
   */
  @Input() popoverClass: string;
  /**
   * Opening delay in ms. Works only for non-manual opening triggers.
   *
   * @since 4.1.0
   */
  @Input() openDelay: number;
  /**
   * Closing delay in ms. Works only for non-manual closing triggers.
   *
   * @since 4.1.0
   */
  @Input() closeDelay: number;
  /**
   * Emits an event when the popover is shown
   */
  @Output() shown = new EventEmitter();
  /**
   * Emits an event when the popover is hidden
   */
  @Output() hidden = new EventEmitter();

  private _ngbxPopoverWindowId = `ngbx-popover-${nextId++}`;
  private _popupService: PopupService<NgbxPopoverWindow>;
  private _windowRef: ComponentRef<NgbxPopoverWindow>;
  private _unregisterListenersFn;
  private _zoneSubscription: any;
  private _isDisabled(): boolean {
    if (this.disablePopover) {
      return true;
    }
    if (!this.ngbxPopover && !this.popoverTitle) {
      return true;
    }
    return false;
  }

  constructor(
      private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2, injector: Injector,
      componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, config: NgbxPopoverConfig,
      private _ngZone: NgZone, @Inject(DOCUMENT) private _document: any, private _changeDetector: ChangeDetectorRef) {
    this.autoClose = config.autoClose;
    this.placement = config.placement;
    this.triggers = config.triggers;
    this.container = config.container;
    this.disablePopover = config.disablePopover;
    this.popoverClass = config.popoverClass;
    this.openDelay = config.openDelay;
    this.closeDelay = config.closeDelay;
    this._popupService = new PopupService<NgbxPopoverWindow>(
        NgbxPopoverWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);

    this._zoneSubscription = _ngZone.onStable.subscribe(() => {
      if (this._windowRef) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
            this.container === 'body', 'bs-popover');
      }
    });
  }

  /**
   * Opens an element’s popover. This is considered a “manual” triggering of the popover.
   * The context is an optional value to be injected into the popover template when it is created.
   */
  open(context?: any) {
    if (!this._windowRef && !this._isDisabled()) {
      this._windowRef = this._popupService.open(this.ngbxPopover, context);
      this._windowRef.instance.title = this.popoverTitle;
      this._windowRef.instance.context = context;
      this._windowRef.instance.popoverClass = this.popoverClass;
      this._windowRef.instance.id = this._ngbxPopoverWindowId;

      this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbxPopoverWindowId);

      if (this.container === 'body') {
        this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
      }

      // apply styling to set basic css-classes on target element, before going for positioning
      this._windowRef.changeDetectorRef.markForCheck();

      ngbxAutoClose(
          this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden,
          [this._windowRef.location.nativeElement]);
      this.shown.emit();
    }
  }

  /**
   * Closes an element’s popover. This is considered a “manual” triggering of the popover.
   */
  close(): void {
    if (this._windowRef) {
      this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
      this._popupService.close();
      this._windowRef = null;
      this.hidden.emit();
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of the popover.
   */
  toggle(): void {
    if (this._windowRef) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Returns whether or not the popover is currently being shown
   */
  isOpen(): boolean { return this._windowRef != null; }

  ngOnInit() {
    this._unregisterListenersFn = listenToTriggers(
        this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this),
        this.close.bind(this), +this.openDelay, +this.closeDelay);
  }

  ngOnChanges(changes: SimpleChanges) {
    // close popover if title and content become empty, or disablePopover set to true
    if ((changes['ngbxPopover'] || changes['popoverTitle'] || changes['disablePopover']) && this._isDisabled()) {
      this.close();
    }
  }

  ngOnDestroy() {
    this.close();
    // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
    // under certain conditions, see: https://github.com/rumeth/ng-bootstrap-extras/issues/2199
    if (this._unregisterListenersFn) {
      this._unregisterListenersFn();
    }
    this._zoneSubscription.unsubscribe();
  }
}
