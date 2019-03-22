import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {createGenericTestComponent, createKeyEvent} from '../test/common';
import {Key} from '../util/key';

import {ChangeDetectionStrategy, Component, DebugElement} from '@angular/core';

import {NgbxDropdown, NgbxDropdownModule} from './dropdown.module';
import {NgbxDropdownConfig} from './dropdown-config';
import {By} from '@angular/platform-browser';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getDropdownEl(tc) {
  return tc.querySelector(`[ngbxDropdown]`);
}

function getMenuEl(tc) {
  return tc.querySelector(`[ngbxDropdownMenu]`);
}

function createFakeEscapeKeyUpEvent(): Event {
  return createKeyEvent(Key.Escape);
}

function createKeyDownEvent(key: number, target?: HTMLElement) {
  const event = {which: key, preventDefault: () => {}, stopPropagation: () => {}, target};
  spyOn(event, 'preventDefault');
  spyOn(event, 'stopPropagation');
  return event;
}

function triggerKeyDownEvent(element: DebugElement, key: number, target?: HTMLElement) {
  const event = createKeyDownEvent(key, target);
  switch (key) {
    case Key.ArrowDown:
      element.triggerEventHandler('keydown.ArrowDown', event);
      break;
    case Key.ArrowUp:
      element.triggerEventHandler('keydown.ArrowDown', event);
      break;
    case Key.Home:
      element.triggerEventHandler('keydown.Home', event);
      break;
    case Key.End:
      element.triggerEventHandler('keydown.End', event);
      break;
  }
}

function getDebugInput(element: DebugElement): DebugElement {
  return element.query(By.directive(NgbxDropdown));
}

function getDebugInputs(element: DebugElement): DebugElement[] {
  return element.queryAll(By.directive(NgbxDropdown));
}

const jasmineMatchers = {
  toBeShown: function(util, customEqualityTests) {
    return {
      compare: function(actual, content?, selector?) {
        const dropdownEl = getDropdownEl(actual);
        const menuEl = getMenuEl(actual);
        const isOpen = dropdownEl.classList.contains('show') && menuEl.classList.contains('show');

        return {
          pass: isOpen,
          message: `Expected ${actual.outerHTML} to have the "show class on both container and menu"`
        };
      },
      negativeCompare: function(actual) {
        const dropdownEl = getDropdownEl(actual);
        const menuEl = getMenuEl(actual);
        const isClosed = !dropdownEl.classList.contains('show') && !menuEl.classList.contains('show');

        return {
          pass: isClosed,
          message: `Expected ${actual.outerHTML} not to have the "show class both container and menu"`
        };
      }
    };
  }
};

describe('ngbx-dropdown', () => {

  beforeEach(() => {
    jasmine.addMatchers(jasmineMatchers);
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbxDropdownModule]});
  });

  it('should be closed and down by default', () => {
    const html = `
      <div ngbxDropdown>
          <button ngbxDropdownAnchor></button>
          <div ngbxDropdownMenu>
            <a class="dropdown-item">dropDown item</a>
            <a class="dropdown-item">dropDown item</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(compiled).not.toBeShown();
  });

  it('should have dropup CSS class if placed on top', () => {
    const html = `
      <div ngbxDropdown placement="top">
          <button ngbxDropdownAnchor></button>
          <div ngbxDropdownMenu>
            <a class="dropdown-item">dropDown item</a>
            <a class="dropdown-item">dropDown item</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
  });

  it('should have dropdown CSS class if placement is other than top', () => {
    const html = `
      <div ngbxDropdown placement="bottom">
          <button ngbxDropdownAnchor></button>
          <div ngbxDropdownMenu>
            <a class="dropdown-item">dropDown item</a>
            <a class="dropdown-item">dropDown item</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getDropdownEl(compiled)).toHaveCssClass('dropdown');
  });

  it('should have x-placement attribute reflecting placement', () => {
    const html = `
      <div ngbxDropdown placement="bottom-right">
          <button ngbxDropdownAnchor></button>
          <div ngbxDropdownMenu>
            <a class="dropdown-item">dropDown item</a>
            <a class="dropdown-item">dropDown item</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(getMenuEl(compiled).getAttribute('x-placement')).toBe('bottom-right');
  });

  it('should be open initially if open expression is true', () => {
    const html = `
      <div ngbxDropdown [open]="true">
          <button ngbxDropdownAnchor></button>
          <div ngbxDropdownMenu>
            <a class="dropdown-item">dropDown item</a>
            <a class="dropdown-item">dropDown item</a>
          </div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(compiled).toBeShown();
  });

  it('should toggle open on "open" binding change', () => {
    const html = `
      <div ngbxDropdown [open]="isOpen">
        <button ngbxDropdownAnchor></button>
        <div ngbxDropdownMenu></div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    expect(compiled).not.toBeShown();

    fixture.componentInstance.isOpen = true;
    fixture.detectChanges();
    expect(compiled).toBeShown();

    fixture.componentInstance.isOpen = false;
    fixture.detectChanges();
    expect(compiled).not.toBeShown();
  });

  it('should allow toggling dropdown from outside', () => {
    const html = `
      <button (click)="drop.open(); $event.stopPropagation()">Open</button>
      <button (click)="drop.close(); $event.stopPropagation()">Close</button>
      <button (click)="drop.toggle(); $event.stopPropagation()">Toggle</button>
      <div ngbxDropdown #drop="ngbxDropdown">
        <button ngbxDropdownAnchor></button>
        <div ngbxDropdownMenu></div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let buttonEls = compiled.querySelectorAll('button');

    buttonEls[0].click();
    fixture.detectChanges();
    expect(compiled).toBeShown();

    buttonEls[1].click();
    fixture.detectChanges();
    expect(compiled).not.toBeShown();

    buttonEls[2].click();
    fixture.detectChanges();
    expect(compiled).toBeShown();

    buttonEls[2].click();
    fixture.detectChanges();
    expect(compiled).not.toBeShown();
  });

  it('should allow binding to open output', () => {
    const html = `
      <button (click)="drop.toggle(); $event.stopPropagation()">Toggle</button>
      <div ngbxDropdown [(open)]="isOpen" #drop="ngbxDropdown"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let buttonEl = compiled.querySelector('button');

    expect(fixture.componentInstance.isOpen).toBe(false);

    buttonEl.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.isOpen).toBe(true);

    buttonEl.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.isOpen).toBe(false);
  });

  it('should not raise open events if open state does not change', () => {
    const html = `
      <button (click)="drop.open(); $event.stopPropagation()">Open</button>
      <button (click)="drop.close(); $event.stopPropagation()">Close</button>
      <div ngbxDropdown (openChange)="recordStateChange($event)" #drop="ngbxDropdown"></div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let buttonEls = compiled.querySelectorAll('button');

    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([]);

    buttonEls[1].click();  // close a closed one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([]);

    buttonEls[0].click();  // open a closed one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(true);
    expect(fixture.componentInstance.stateChanges).toEqual([true]);

    buttonEls[0].click();  // open an opened one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(true);
    expect(fixture.componentInstance.stateChanges).toEqual([true]);

    buttonEls[1].click();  // close an opened one
    fixture.detectChanges();
    expect(fixture.componentInstance.isOpen).toBe(false);
    expect(fixture.componentInstance.stateChanges).toEqual([true, false]);
  });

  describe('Arrow Key Navigation', () => {
    it('should select the first element on ArrowDown if focus is not on any element in list', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem>Action 1</button>
        <button ngbxDropdownItem>Action 2</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      const target = compiled.querySelector('button[ngbxDropdownToggle]');
      fixture.componentInstance.isOpen = true;
      const elms = compiled.querySelectorAll('.dropdown-item');
      spyOn(elms[0], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.ArrowDown, target);
      fixture.detectChanges();
      expect(elms[0].focus).toHaveBeenCalled();
    });

    it('should select the bottom element of the dropup on ArrowUp if focus is not on any element in list', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" placement="top" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem>Action 1</button>
        <button ngbxDropdownItem>Action 2</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      const target = compiled.querySelector('button[ngbxDropdownToggle]');
      fixture.componentInstance.isOpen = true;
      const elms = compiled.querySelectorAll('.dropdown-item');
      spyOn(elms[1], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.ArrowUp, target);
      fixture.detectChanges();
      expect(elms[1].focus).toHaveBeenCalled();
    });

    it('should select the next element on ArrowDown if is on a element in list', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem>Action 1</button>
        <button ngbxDropdownItem>Action 2</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      fixture.componentInstance.isOpen = true;
      const elms = compiled.querySelectorAll('.dropdown-item');
      elms[0].focus();
      spyOn(elms[1], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.ArrowDown, elms[0]);
      fixture.detectChanges();
      expect(elms[1].focus).toHaveBeenCalled();
    });

    it('should select the next element on ArrowDown when the next element in the list is added later', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem *ngFor="let item of items">{{item}}</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      fixture.componentInstance.isOpen = true;
      fixture.componentInstance.items = ['Item 1', 'item 2'];
      fixture.detectChanges();
      const elms = compiled.querySelectorAll('.dropdown-item');
      elms[0].focus();
      spyOn(elms[1], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.ArrowDown, elms[0]);
      fixture.detectChanges();
      expect(elms[1].focus).toHaveBeenCalled();
    });

    it('should select the previous element on ArrowUp', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem>Action 1</button>
        <button ngbxDropdownItem>Action 2</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      fixture.componentInstance.isOpen = true;
      const elms = compiled.querySelectorAll('.dropdown-item');
      elms[1].focus();
      spyOn(elms[0], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.ArrowUp, elms[1]);
      fixture.detectChanges();
      expect(elms[0].focus).toHaveBeenCalled();
    });

    it('should stay on the same element on ArrowDown if the last element of the list is selected', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem>Action 1</button>
        <button ngbxDropdownItem>Action 2</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      fixture.componentInstance.isOpen = true;
      const elms = compiled.querySelectorAll('.dropdown-item');
      elms[1].focus();
      spyOn(elms[1], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.ArrowDown, elms[1]);
      fixture.detectChanges();
      expect(elms[1].focus).toHaveBeenCalled();
    });

    it('should skip disabled elements on ArrowDown if is on a element in list', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem>Action 1</button>
        <button ngbxDropdownItem [disabled]="true">Action 2</button>
        <button ngbxDropdownItem>Action 3</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      fixture.componentInstance.isOpen = true;
      const elms = compiled.querySelectorAll('.dropdown-item');
      elms[0].focus();
      spyOn(elms[2], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.ArrowDown, elms[0]);
      fixture.detectChanges();
      expect(elms[2].focus).toHaveBeenCalled();
    });

    it('should select the first element on Home if there are elements in the list', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem>Action 1</button>
        <button ngbxDropdownItem>Action 2</button>
        <button ngbxDropdownItem>Action 3</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      fixture.componentInstance.isOpen = true;
      const elms = compiled.querySelectorAll('.dropdown-item');
      elms[2].focus();
      spyOn(elms[0], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.Home, elms[2]);
      fixture.detectChanges();
      expect(elms[0].focus).toHaveBeenCalled();
    });

    it('should select the last element on End if there are elements in the list', () => {
      const fixture = createTestComponent(
          `<div ngbxDropdown id="ngbxDropdown" (openChange)="recordStateChange($event)" [open]="isOpen">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <button ngbxDropdownItem>Action 1</button>
        <button ngbxDropdownItem>Action 2</button>
        <button ngbxDropdownItem>Action 3</button>
      </div>
    </div>`);
      const compiled = fixture.nativeElement;
      fixture.componentInstance.isOpen = true;
      const elms = compiled.querySelectorAll('.dropdown-item');
      elms[0].focus();
      spyOn(elms[2], 'focus');
      triggerKeyDownEvent(getDebugInput(fixture.debugElement), Key.End, elms[0]);
      fixture.detectChanges();
      expect(elms[2].focus).toHaveBeenCalled();
    });

    it('should select the first element on ArrowDown in a nested dropdown', () => {
      const fixture = createTestComponent(`<div ngbxDropdown id="ngbxDropdown" [open]="true">
      <button ngbxDropdownToggle>Toggle dropdown 1</button>
      <div ngbxDropdownMenu>
        <div ngbxDropdown id="nestedDropdown" [open]="isOpen">
          <input ngbxDropdownAnchor/>
          <div ngbxDropdownMenu>
            <button ngbxDropdownItem>Action 1</button>
            <button ngbxDropdownItem>Action 2</button>
            <button ngbxDropdownItem>Action 3</button>
          </div>
        </div>
      </div>
    </div>`);
      const[buttonElement, inputElement] = getDebugInputs(fixture.debugElement);

      const compiled = fixture.nativeElement;
      fixture.componentInstance.isOpen = true;
      const input = compiled.querySelector('input[ngbxDropdownAnchor]');
      const elms = compiled.querySelectorAll('#nestedDropdown .dropdown-item');
      spyOn(elms[0], 'focus');
      spyOn(elms[1], 'focus');
      spyOn(elms[2], 'focus');
      triggerKeyDownEvent(buttonElement, Key.ArrowDown, input);
      expect(elms[0].focus).not.toHaveBeenCalled();
      expect(elms[1].focus).not.toHaveBeenCalled();
      expect(elms[2].focus).not.toHaveBeenCalled();

      triggerKeyDownEvent(inputElement, Key.ArrowDown, input);
      fixture.detectChanges();

      expect(elms[0].focus.calls.count()).toBe(1);
      expect(elms[1].focus).not.toHaveBeenCalled();
      expect(elms[2].focus).not.toHaveBeenCalled();
    });
  });
});

describe('ngbx-dropdown-toggle', () => {
  beforeEach(() => {
    jasmine.addMatchers(jasmineMatchers);
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbxDropdownModule]});
  });

  it('should toggle dropdown on click', () => {
    const html = `
      <div ngbxDropdown>
          <button ngbxDropdownToggle>Toggle dropdown</button>
          <div ngbxDropdownMenu></div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    let dropdownEl = getDropdownEl(compiled);
    let buttonEl = compiled.querySelector('button');

    expect(dropdownEl).not.toHaveCssClass('show');
    expect(buttonEl.getAttribute('aria-haspopup')).toBe('true');
    expect(buttonEl.getAttribute('aria-expanded')).toBe('false');

    buttonEl.click();
    fixture.detectChanges();
    expect(compiled).toBeShown();
    expect(buttonEl.getAttribute('aria-expanded')).toBe('true');

    buttonEl.click();
    fixture.detectChanges();
    expect(compiled).not.toBeShown();
    expect(buttonEl.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle dropdown on click of child of toggle', () => {
    const html = `
      <div ngbxDropdown>
          <button ngbxDropdownToggle>
            <span class="toggle">Toggle dropdown</span>
          </button>
          <div ngbxDropdownMenu></div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    const toggleEl = compiled.querySelector('.toggle');

    expect(compiled).not.toBeShown();

    toggleEl.click();
    fixture.detectChanges();
    expect(compiled).toBeShown();

    toggleEl.click();
    fixture.detectChanges();
    expect(compiled).not.toBeShown();
  });

  it('should be appended to body', () => {
    const html = `
      <div ngbxDropdown container="body">
          <button ngbxDropdownToggle>
            <span class="toggle">Toggle dropdown</span>
          </button>
          <div ngbxDropdownMenu></div>
      </div>`;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;
    const dropdown = fixture.debugElement.query(By.directive(NgbxDropdown)).injector.get(NgbxDropdown);
    dropdown.open();
    const dropdownElement = document.querySelector('div[ngbxDropdownMenu]');
    const parentContainer = dropdownElement.parentNode;
    expect(parentContainer).toHaveCssClass('dropdown');
    expect(parentContainer.parentNode).toBe(document.body, 'The dropdown should be attached to the body');

  });

  describe('Custom config', () => {
    let config: NgbxDropdownConfig;

    beforeEach(() => {
      TestBed.configureTestingModule({imports: [NgbxDropdownModule]});
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
      <div ngbxDropdown>
          <div ngbxDropdownMenu>
            <a ngbxDropdownItem>dropDown item</a>
            <a ngbxDropdownItem>dropDown item</a>
          </div>
      </div>`
        }
      });
    });

    beforeEach(inject([NgbxDropdownConfig], (c: NgbxDropdownConfig) => {
      config = c;
      config.placement = 'top-right';
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;

      expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
    });
  });

  describe('Custom config as provider', () => {
    let config = new NgbxDropdownConfig();
    config.placement = 'top-right';

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbxDropdownModule], providers: [{provide: NgbxDropdownConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = createTestComponent(`
      <div ngbxDropdown>
          <div ngbxDropdownMenu>
            <a ngbxDropdownItem>dropup item</a>
            <a ngbxDropdownItem>dropup item</a>
          </div>
      </div>`);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;

      expect(getDropdownEl(compiled)).toHaveCssClass('dropup');
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  isOpen = false;
  stateChanges = [];
  items = [];

  recordStateChange($event) {
    this.stateChanges.push($event);
    this.isOpen = $event;
  }
}
