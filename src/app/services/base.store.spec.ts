import { BaseStore } from './base.store';

describe('The BaseStore class', () => {
  it('should create an instance', () => {
    // Arrange
    const initialState = {};
    // Act
    const actual = new BaseStore(initialState);
    // Assert
    expect(actual).toBeDefined();
  });

  it('should set initial state', () => {
    // Arrange
    type State = { destination: string; startDate: Date };
    const input = {
      destination: 'The Moon',
      startDate: new Date('2022-11-10'),
    };
    // Act
    const sut = new BaseStore<State>(input);
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'The Moon',
      startDate: new Date('2022-11-10'),
    };
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(input);
  });

  it('should set notify changes', () => {
    // Arrange
    type State = { destination: string; startDate: Date };
    const initialState = {
      destination: 'The Moon',
      startDate: new Date('2022-11-10'),
    };
    const sut = new BaseStore<State>(initialState);
    // Act
    const input = {
      destination: 'Mars',
    };
    sut.setState(input);
    sut
      .select$((state) => state)
      .subscribe((actual) => {
        // Assert
        const expected = {
          destination: 'Mars',
          startDate: new Date('2022-11-10'),
        };
        expect(actual).toEqual(expected);
        expect(actual).not.toBe(initialState);
      });
  });
});
