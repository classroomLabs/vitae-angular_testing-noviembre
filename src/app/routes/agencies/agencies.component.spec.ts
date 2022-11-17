import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { AgenciesComponent } from './agencies.component';

fdescribe('The Agencies Component _deep dependency_', () => {
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
