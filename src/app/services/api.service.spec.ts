import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

fdescribe('ApiService', () => {
  let sut: ApiService;
  let httpTestingController: HttpTestingController;
  const outputId = 'space-y';
  const utilsServiceStub = {
    getHyphened: () => outputId,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ! http client module fake
      providers: [{ provide: UtilsService, useValue: utilsServiceStub }],
    });
    sut = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should not be done this way', () => {
    sut.getAgencies$().subscribe();
    const expectedUrl = 'http://localhost:3000/agencies';
    httpTestingController.expectOne(expectedUrl);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should call the http client get method with the right url', () => {
    // Arrange
    // Act
    sut.getAgencies$().subscribe();
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    const actual = controller.request.method;
    // Assert
    const expectedMethod = 'GET';
    expect(actual).toEqual(expectedMethod);
  });

  it('should return right data when calling get method', () => {
    // Arrange
    const input = [
      {
        id: 'space-y',
        name: 'Space Y',
        range: 'Interplanetary',
        status: 'Active',
      },
      {
        id: 'green-origin',
        name: 'Green Origin',
        range: 'Orbital',
        status: 'Active',
      },
    ];
    // Act
    sut.getAgencies$().subscribe((actual) => {
      // Assert
      const expected = [
        {
          id: 'space-y',
          name: 'Space Y',
          range: 'Interplanetary',
          status: 'Active',
        },
        {
          id: 'green-origin',
          name: 'Green Origin',
          range: 'Orbital',
          status: 'Active',
        },
      ];
      expect(actual).toEqual(expected);
    });
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    controller.flush(input);
  });

  it('should call post method with the right url and payload', () => {
    // Arrange
    const input = {
      id: '',
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    };
    // Act
    sut.postAgency$(input).subscribe((actual) => {
      const expected = {
        id: outputId,
        name: 'Space Y',
        range: 'Interplanetary',
        status: 'Active',
      };
      expect(actual).toEqual(expected);
    });
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    controller.flush({
      id: outputId,
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    });
    const actualMethod = controller.request.method;
    const actualBody = controller.request.body;
    expect(actualMethod).toEqual('POST');
    const expectedBody = {
      id: outputId,
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    };
    expect(actualBody).toEqual(expectedBody);
  });
});
