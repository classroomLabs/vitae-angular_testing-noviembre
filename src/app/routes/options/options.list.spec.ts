import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsList } from './options.list';

describe('The Options List component', () => {
  let component: OptionsList;
  let fixture: ComponentFixture<OptionsList>;

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

  it('should emit delete event when delete button is clicked', () => {
    // ToDo: implement
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
  token = null;
  onDeleteClick(event: any) {
    this.token = event;
  }
}

fdescribe('The Options List hosted', () => {
  // ! testing from the host perspective
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
});
