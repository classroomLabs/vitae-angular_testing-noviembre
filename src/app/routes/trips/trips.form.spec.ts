import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { TripsForm } from './trips.form';
import { TripsService } from './trips.service';

class TripsServiceStub {
  loadAgencies() {}
  saveTrip() {}
  selectAgenciesState$() {
    return of({ data: [{ id: 'spaceX', name: 'Space X' }] });
  }
}

fdescribe('TripsForm', () => {
  let component: TripsForm;
  let fixture: ComponentFixture<TripsForm>;
  let native: any;
  let debug: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripsForm],
      imports: [ReactiveFormsModule],
      providers: [{ provide: TripsService, useValue: new TripsServiceStub() }],
    }).compileComponents();

    fixture = TestBed.createComponent(TripsForm);
    component = fixture.componentInstance;
    native = fixture.nativeElement;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    const form = native.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should allow filling the form', () => {
    const inputs = native.querySelectorAll('input');
    inputs[0].value = 'Asteroid';
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = '2025-01-01';
    inputs[1].dispatchEvent(new Event('input'));
    const select = native.querySelector('select');
    select.options[0].selected = true;
    select.dispatchEvent(new Event('change'));
    expect(component.form.value).toEqual({
      destination: 'Asteroid',
      agencyId: 'spaceX',
      startDate: '2025-01-01',
    });
  });
});
