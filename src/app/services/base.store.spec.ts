import { BaseStore } from './base.store';
describe('Store', () => {
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
    const input = {};
    // Act
    const sut = new BaseStore(input);
    const actual = sut.getState();
    // Assert
    const expected = {};
    expect(actual).toEqual(expected);
  });
});
