import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Booking } from '@models/booking.interface';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { BookingsComponent } from './bookings.component';

fdescribe('BookingsComponent', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;
  let debug: DebugElement;
  const inputBookings: Booking[] = [
    {
      id: '1',
      tripId: '1',
      customer: {
        name: 'John Doe',
        email: 'john@acme.org',
        phone: '123456789',
        gender: 'male',
      },
      seats: 1,
      premiumFood: false,
      paymentMethod: 'cash',
      date: '2021-01-01',
      status: 'pending',
    },
  ];
  beforeEach(async () => {
    const apiServiceStub = {
      getBookings$: () => of(inputBookings),
      deleteBooking$: () => of({}),
    };
    await TestBed.configureTestingModule({
      declarations: [BookingsComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.bookings$).toBeTruthy();
  });

  it('should present a table with bookings', () => {
    const actualTable = debug.query(By.css('table'));
    expect(actualTable).toBeTruthy();
    const actualRows = debug.queryAll(By.css('tbody>tr'));
    expect(actualRows).toBeTruthy();
    expect(actualRows.length).toBe(1);
  });

  it('should call onDeleteClick', () => {
    spyOn(component, 'onDeleteClick');
    const firstDeleteButton = debug.query(By.css('tbody>tr>td>button'));
    firstDeleteButton.triggerEventHandler('click', null),
      expect(component.onDeleteClick).toHaveBeenCalled();
  });
});
