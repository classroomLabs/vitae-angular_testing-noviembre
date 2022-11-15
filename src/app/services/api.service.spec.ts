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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ! http client module fake
      providers: [UtilsService],
    });
    sut = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
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
});
