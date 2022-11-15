import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from './utils.service';

fdescribe('The Utils Service', () => {
  let sut: UtilsService;

  beforeEach(() => {
    sut = new UtilsService();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should return a hyphened string', () => {
    // Arrange
    const input = 'The Moon';
    // Act
    const actual = sut.getHyphened(input);
    // Arrange
    const expected = 'the-moon';
    expect(actual).toEqual(expected);
  });

  it('should return a hyphened string for complex inputs', () => {
    // Arrange
    const input = 'The #1 email address of The Moon is: moon@earth.sun';
    // Act
    const actual = sut.getHyphened(input);
    // Arrange
    const expected = 'the-1-email-address-of-the-moon-is-moon-earth-sun';
    expect(actual).toEqual(expected);
  });
});

fdescribe('UtilsService', () => {
  let sut: UtilsService;
  let input: ActivatedRoute;
  const inputNotFoundParam = 'notFound';
  beforeEach(() => {
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (paramId: string) => {
            if (paramId === inputNotFoundParam) return null;
            return paramId;
          },
        },
      },
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: UtilsService, useClass: UtilsService },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    });
    sut = TestBed.inject(UtilsService);
  });

  it('should get the default param from the ActivatedRoute', () => {
    // Arrange
    input = TestBed.inject(ActivatedRoute);
    // Act
    const actual = sut.getParam(input);
    // Assert
    const expected = 'id';
    expect(actual).toEqual(expected);
  });

  it('should get the specified param from the ActivatedRoute', () => {
    // Arrange
    input = TestBed.inject(ActivatedRoute);
    const inputParam = 'tripId';
    // Act
    const actual = sut.getParam(input, inputParam);
    // Assert
    const expected = 'tripId';
    expect(actual).toEqual(expected);
  });

  it('should get empty string for not found params', () => {
    // Arrange
    input = TestBed.inject(ActivatedRoute);
    const inputParam = inputNotFoundParam;
    // Act
    const actual = sut.getParam(input, inputParam);
    // Assert
    const expected = '';
    expect(actual).toEqual(expected);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });
});
