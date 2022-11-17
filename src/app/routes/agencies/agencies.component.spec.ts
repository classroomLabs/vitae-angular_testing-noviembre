import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Agency } from '@models/agency.interface';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { AgenciesComponent } from './agencies.component';

describe('The Agencies Component _deep dependency_', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    const apiServiceStub = {
      getAgencies$: () =>
        of([
          {
            id: 'space-x',
            name: 'SpaceX',
            range: 'Interplanetary',
            status: 'Active',
          },
        ]),
      getOptions$: () => of([]),
    };
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AgenciesComponent],
      providers: [
        {
          provide: ApiService,
          useValue: apiServiceStub,
        },
      ],
    }).compileComponents();
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have agencies array', () => {
    expect(component.agencies).toBeTruthy();
  });

  it('should call loadAgencies on start', () => {
    // ! constructor cant be spied
    // expect(component.loadAgencies).toHaveBeenCalled();
    // * check effects
    expect(component.agencies.length).toBe(1);
  });

  it('should call loadAgencies on init', () => {
    spyOn(component, 'loadAgencies');
    component.ngOnInit(); // ! need call ngOnInit
    expect(component.loadAgencies).toHaveBeenCalled();
  });

  it('should call getAgencies$ on loadAgencies', () => {
    // ! to spy a dependency need a new stub
    spyOn(apiService, 'getAgencies$').and.returnValue(of([]));
    component.loadAgencies();
    expect(apiService.getAgencies$).toHaveBeenCalled();
  });
});

fdescribe('The Agencies Component _presentation_', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let native: HTMLElement;
  let apiServiceStub: Partial<ApiService>;
  const inputAgencies: Agency[] = [
    {
      id: 'space-x',
      name: 'SpaceX',
      range: 'Interplanetary',
      status: 'Active',
    },
    {
      id: 'blue-origin',
      name: 'Blue Origin',
      range: 'Orbital',
      status: 'Active',
    },
  ];

  beforeEach(async () => {
    apiServiceStub = {
      getAgencies$: () => of(inputAgencies),
      getOptions$: (r: string) => of([]),
    };
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    native = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should instantiate', () => {
    expect(component).toBeTruthy();
  });

  it('should present a table with agencies', () => {
    const actualTable = native.querySelector('table');
    expect(actualTable).toBeTruthy();
    const actualRows = native.querySelectorAll('tbody>tr');
    // expect(actualRows).toBeTruthy();
    expect(actualRows.length).toBe(2);
  });

  it('should call onDeleteClick  when click on delete button', () => {
    spyOn(component, 'onDeleteClick');
    const actualDeleteButtons = native.querySelectorAll('tbody>tr>td>button');
    expect(actualDeleteButtons.length).toBe(2);
    const firstButton = actualDeleteButtons[0] as any;
    firstButton.click();
    expect(component.onDeleteClick).toHaveBeenCalled();
  });
});
