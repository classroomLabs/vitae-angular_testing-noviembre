import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OptionsList } from './options.list';

describe('OptionsList', () => {
  let component: OptionsList;
  let fixture: ComponentFixture<OptionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsList],
    })
      .overrideComponent(OptionsList, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OptionsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present a list of options', () => {
    component.options = [{ label: 'test', value: '0' }];
    fixture.detectChanges();
    const actual = fixture.nativeElement.querySelectorAll('li');
    expect(actual.length).toBe(1);
  });
});

@Component({
  template: `
    <app-options-list [options]="input" (delete)="onDeleteClick($event)">
    </app-options-list>
  `,
})
class HostComponent {
  input = [{ label: 'test', value: '0' }];
  token = null;
  onDeleteClick(event: any) {
    this.token = event;
  }
}

fdescribe('The Options List hosted', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let native: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsList, HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    native = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should sent an array to the list component', () => {
    const actualItems = native.querySelectorAll('li');
    expect(actualItems.length).toBe(1);
  });
  it('should emit delete event when click', () => {
    const actualButton = fixture.debugElement.query(By.css('li>span'));
    actualButton.triggerEventHandler('click', null);
    expect(component.token).toBeTruthy();
  });
});
