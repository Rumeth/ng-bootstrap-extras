import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component} from '@angular/core';

import {NgbxAlertModule} from './alert.module';
import {NgbxAlert} from './alert';
import {NgbxAlertConfig} from './alert-config';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getAlertElement(element: HTMLElement): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.alert');
}

function getCloseButton(element: HTMLElement): HTMLButtonElement {
  return <HTMLButtonElement>element.querySelector('button');
}

function getCloseButtonIcon(element: HTMLElement): HTMLSpanElement {
  return <HTMLSpanElement>element.querySelector('button > span');
}

describe('ngbx-alert', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbxAlertModule]}); });

  it('should initialize inputs with default values', () => {
    const defaultConfig = new NgbxAlertConfig();
    const alertCmp = TestBed.createComponent(NgbxAlert).componentInstance;
    expect(alertCmp.dismissible).toBe(defaultConfig.dismissible);
    expect(alertCmp.type).toBe(defaultConfig.type);
  });

  it('should apply those default values to the template', () => {
    const fixture = createTestComponent('<ngbx-alert>Cool!</ngbx-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl.getAttribute('role')).toEqual('alert');
    expect(alertEl).toHaveCssClass('alert-warning');
    expect(alertEl).toHaveCssClass('alert-dismissible');
  });

  it('should allow specifying alert type', () => {
    const fixture = createTestComponent('<ngbx-alert type="success">Cool!</ngbx-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl.getAttribute('role')).toEqual('alert');
    expect(alertEl).toHaveCssClass('alert-success');
  });

  it('should allow changing alert type', () => {
    const fixture = createTestComponent('<ngbx-alert [type]="type">Cool!</ngbx-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl).toHaveCssClass('alert-success');
    expect(alertEl).not.toHaveCssClass('alert-warning');

    fixture.componentInstance.type = 'warning';
    fixture.detectChanges();
    expect(alertEl).not.toHaveCssClass('alert-success');
    expect(alertEl).toHaveCssClass('alert-warning');
  });

  it('should allow adding custom CSS classes', () => {
    const fixture = createTestComponent('<ngbx-alert type="success" class="myClass">Cool!</ngbx-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl).toHaveCssClass('alert');
    expect(alertEl).toHaveCssClass('alert-success');
    expect(alertEl).toHaveCssClass('myClass');
  });

  it('should render close button when dismissible', () => {
    const fixture = createTestComponent('<ngbx-alert [dismissible]="true">Watch out!</ngbx-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);
    const buttonEl = getCloseButton(alertEl);
    const buttonIconEl = getCloseButtonIcon(alertEl);

    expect(alertEl).toHaveCssClass('alert-dismissible');
    expect(buttonEl).toBeTruthy();
    expect(buttonEl.getAttribute('class')).toContain('close');
    expect(buttonEl.getAttribute('aria-label')).toBe('Close');
    expect(buttonIconEl.getAttribute('aria-hidden')).toBe('true');
    expect(buttonIconEl.textContent).toBe('×');
  });

  it('should not render the close button if it is not dismissible', () => {
    const fixture = createTestComponent(`<ngbx-alert [dismissible]="false">Don't close!</ngbx-alert>`);
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl).not.toHaveCssClass('alert-dismissible');
    expect(getCloseButton(alertEl)).toBeFalsy();
  });

  it('should fire an event after closing a dismissible alert', () => {
    const fixture =
        createTestComponent('<ngbx-alert [dismissible]="true" (close)="closed = true">Watch out!</ngbx-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);
    const buttonEl = getCloseButton(alertEl);

    expect(fixture.componentInstance.closed).toBe(false);
    buttonEl.click();
    expect(fixture.componentInstance.closed).toBe(true);
  });

  it('should project the content given into the component', () => {
    const fixture = createTestComponent('<ngbx-alert>Cool!</ngbx-alert>');
    const alertEl = getAlertElement(fixture.nativeElement);

    expect(alertEl.textContent).toContain('Cool!');
  });

  describe('Custom config', () => {
    let config: NgbxAlertConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [NgbxAlertModule]}); });

    beforeEach(inject([NgbxAlertConfig], (c: NgbxAlertConfig) => {
      config = c;
      config.dismissible = false;
      config.type = 'success';
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(NgbxAlert);
      fixture.detectChanges();

      const alert = fixture.componentInstance;
      expect(alert.dismissible).toBe(config.dismissible);
      expect(alert.type).toBe(config.type);
    });
  });

  describe('Custom config as provider', () => {
    let config = new NgbxAlertConfig();
    config.dismissible = false;
    config.type = 'success';

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbxAlertModule], providers: [{provide: NgbxAlertConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(NgbxAlert);
      fixture.detectChanges();

      const alert = fixture.componentInstance;
      expect(alert.dismissible).toBe(config.dismissible);
      expect(alert.type).toBe(config.type);
    });
  });
});

@Component({selector: 'test-cmp', template: '', entryComponents: [NgbxAlert]})
class TestComponent {
  name = 'World';
  closed = false;
  type = 'success';
}
