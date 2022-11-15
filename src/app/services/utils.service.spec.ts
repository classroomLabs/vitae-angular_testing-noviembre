import { TestBed } from '@angular/core/testing';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService],
    });
    sut = TestBed.inject(UtilsService);
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
