import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OptionsList } from './options.list';

describe('The Options List component', () => {
  let component: OptionsList;
  let fixture: ComponentFixture<OptionsList>;
  let native: any;
  let debug: any;
  beforeEach(async () => {
    // ! hack; changeDetection to default
    await TestBed.configureTestingModule({
      declarations: [OptionsList],
    })
      .overrideComponent(OptionsList, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OptionsList);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    native = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present a list of options', () => {
    component.options = [{ label: 'test', value: '0' }];
    fixture.detectChanges();
    const actual = native.querySelectorAll('li');
    expect(actual.length).toBe(1);
  });

  it('should emit delete event when delete button is clicked', () => {
    const input = [
      { label: 'test', value: 'test' },
      { label: 'test2', value: 'test2' },
    ];
    component.options = input;
    fixture.detectChanges();
    const deleteButtons = debug.queryAll(By.css('span[name="delete"]'));
    const actual = spyOn(component.delete, 'emit');
    deleteButtons[0].triggerEventHandler('click', null);
    expect(actual).toHaveBeenCalledWith({ label: 'test', value: 'test' });
  });
});

// * hosting the component in a test container

@Component({
  template: `
    <app-options-list [options]="input" (delete)="onDeleteClick($event)">
    </app-options-list>
  `,
})
class HostComponent {
  input = [{ label: 'test', value: '0' }];
  token: any = null;
  onDeleteClick(event: any) {
    this.token = event;
  }
}

fdescribe('The Options List hosted', () => {
  // ! testing from the host perspective
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let native: any;
  let debug: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsList, HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    native = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should sent an array to the list component', () => {
    const actualItems = native.querySelectorAll('li');
    expect(actualItems.length).toBe(1);
  });

  it('should subscribe to delete event', () => {
    // arrange
    fixture.detectChanges();
    const deleteButtons = debug.queryAll(By.css('span[name="delete"]'));
    // act
    deleteButtons[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    // assert
    const actual = component.token; // ! using an effect instead of spy
    const expected = component.input[0];
    expect(actual).toEqual(expected);
  });
});
