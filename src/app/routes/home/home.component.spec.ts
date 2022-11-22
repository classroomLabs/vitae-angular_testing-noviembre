import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

describe('The Home Component with fake imports ', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

fdescribe('The Home Component with nested dependencies ', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeServiceStub: jasmine.SpyObj<HomeService>;
  let apiServiceStub: jasmine.SpyObj<ApiService>;
  beforeEach(async () => {
    homeServiceStub = jasmine.createSpyObj('HomeService', [
      'loadTrips',
      'selectTrips$',
    ]);
    homeServiceStub.loadTrips.and.returnValue();
    apiServiceStub = jasmine.createSpyObj('ApiService', ['getTrips$']);
    apiServiceStub.getTrips$.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: HomeService, useValue: homeServiceStub },
        { provide: ApiService, useValue: apiServiceStub },
      ],
    })
      .overrideComponent(HomeComponent, {
        set: {
          providers: [{ provide: HomeService, useValue: homeServiceStub }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class HomeServiceStub {
  loadTrips() {}
  selectTrips$() {
    return of([{ isWorking: false, error: '', data: [] }]);
  }
}

fdescribe('The Home Component with stubbed class ', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    })
      .overrideComponent(HomeComponent, {
        set: {
          providers: [{ provide: HomeService, useClass: HomeServiceStub }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
