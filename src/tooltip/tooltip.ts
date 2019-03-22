import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Inject,
  Injector,
  Renderer2,
  ComponentRef,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  NgZone,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {listenToTriggers} from '../util/triggers';
import {ngbxAutoClose} from '../util/autoclose';
import {positionElements, PlacementArray} from '../util/positioning';
import {PopupService} from '../util/popup';

import {NgbxTooltipConfig} from './tooltip-config';

let nextId = 0;

@Component({
  selector: 'ngbx-tooltip-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'[class]': '"tooltip show" + (tooltipClass ? " " + tooltipClass : "")', 'role': 'tooltip', '[id]': 'id'},
  template: `<div class="arrow"></div><div class="tooltip-inner"><ng-content></ng-content></div>`,
  styleUrls: ['./tooltip.scss']
})
export class NgbxTooltipWindow {
  @Input() id: string;
  @Input() tooltipClass: string;
}

/**
 * A lightweight, extensible directive for fancy tooltip creation.
 */
@Directive({selector: '[ngbxTooltip]', exportAs: 'ngbxTooltip'})
export class NgbxTooltip implements OnInit, OnDestroy {
  /**
   * Indicates whether the tooltip should be closed on Escape key and inside/outside clicks.
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
    * Placement of a tooltip accepts:
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
   * A selector specifying the element the tooltip should be appended to.
   * Currently only supports "body".
   */
  @Input() container: string;
  /**
   * A flag indicating if a given tooltip is disabled and should not be displayed.
   *
   * @since 1.1.0
   */
  @Input() disableTooltip: boolean;
  /**
   * An optional class applied to ngbx-tooltip-window
   *
   * @since 3.2.0
   */
  @Input() tooltipClass: string;
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
   * Emits an event when the tooltip is shown
   */
  @Output() shown = new EventEmitter();
  /**
   * Emits an event when the tooltip is hidden
   */
  @Output() hidden = new EventEmitter();

  private _ngbxTooltip: string | TemplateRef<any>;
  private _ngbxTooltipWindowId = `ngbx-tooltip-${nextId++}`;
  private _popupService: PopupService<NgbxTooltipWindow>;
  private _windowRef: ComponentRef<NgbxTooltipWindow>;
  private _unregisterListenersFn;
  private _zoneSubscription: any;

  constructor(
      private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2, injector: Injector,
      componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, config: NgbxTooltipConfig,
      private _ngZone: NgZone, @Inject(DOCUMENT) private _document: any, private _changeDetector: ChangeDetectorRef) {
    this.autoClose = config.autoClose;
    this.placement = config.placement;
    this.triggers = config.triggers;
    this.container = config.container;
    this.disableTooltip = config.disableTooltip;
    this.tooltipClass = config.tooltipClass;
    this.openDelay = config.openDelay;
    this.closeDelay = config.closeDelay;
    this._popupService = new PopupService<NgbxTooltipWindow>(
        NgbxTooltipWindow, injector, viewContainerRef, _renderer, componentFactoryResolver);

    this._zoneSubscription = _ngZone.onStable.subscribe(() => {
      if (this._windowRef) {
        positionElements(
            this._elementRef.nativeElement, this._windowRef.location.nativeElement, this.placement,
            this.container === 'body', 'bs-tooltip');
      }
    });
  }

  /**
   * Content to be displayed as tooltip. If falsy, the tooltip won't open.
   */
  @Input()
  set ngbxTooltip(value: string | TemplateRef<any>) {
    this._ngbxTooltip = value;
    if (!value && this._windowRef) {
      this.close();
    }
  }

  get ngbxTooltip() { return this._ngbxTooltip; }

  /**
   * Opens an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   * The context is an optional value to be injected into the tooltip template when it is created.
   */
  open(context?: any) {
    if (!this._windowRef && this._ngbxTooltip && !this.disableTooltip) {
      this._windowRef = this._popupService.open(this._ngbxTooltip, context);
      this._windowRef.instance.tooltipClass = this.tooltipClass;
      this._windowRef.instance.id = this._ngbxTooltipWindowId;

      this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbxTooltipWindowId);

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
   * Closes an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   */
  close(): void {
    if (this._windowRef != null) {
      this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
      this._popupService.close();
      this._windowRef = null;
      this.hidden.emit();
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   */
  toggle(): void {
    if (this._windowRef) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Returns whether or not the tooltip is currently being shown
   */
  isOpen(): boolean { return this._windowRef != null; }

  ngOnInit() {
    this._unregisterListenersFn = listenToTriggers(
        this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this),
        this.close.bind(this), +this.openDelay, +this.closeDelay);
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
