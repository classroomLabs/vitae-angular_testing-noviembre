import { ApiStore } from './api.store';

// ! integration test depending on BaseStore

describe('The ApiStore class ', () => {
  it('should set initial state', () => {
    const sut = new ApiStore();
    sut.selectState$().subscribe((actual) => {
      const expected = { isWorking: false, error: '', data: [] };
      expect(actual).toEqual(expected);
    });
  });
  it('should change the state', () => {
    const sut = new ApiStore();
    const input = [
      { destination: 'The Moon', startDate: new Date('2022-11-10') },
    ];
    sut.setData(input);
    sut.selectState$().subscribe((actual) => {
      const expected = {
        isWorking: false,
        error: '',
        data: [{ destination: 'The Moon', startDate: new Date('2022-11-10') }],
      };
      expect(actual).toEqual(expected);
    });
  });
  it('should set is working', () => {
    const store = new ApiStore();
    store.setIsWorking();
    store.selectState$().subscribe((actual) => {
      const expected = true;
      expect(actual.isWorking).toEqual(expected);
    });
  });
  it('should set data', () => {
    const store = new ApiStore();
    const data = [{ id: 1 }, { id: 2 }];
    store.setData(data);
    store.selectState$().subscribe((actual) => {
      const expected = data;
      expect(actual.data).toEqual(expected);
    });
  });
  it('should add item', () => {
    // Arrange
    const store = new ApiStore();
    const data = [{ destination: 'The Moon' }, { destination: 'Mars' }];
    store.setData(data);
    const newItem = { destination: 'Earth orbit' };
    // Act
    store.addItem(newItem);
    store.selectState$().subscribe((actual) => {
      // Assert
      const expected = [
        { destination: 'The Moon' },
        { destination: 'Mars' },
        { destination: 'Earth orbit' },
      ];
      expect(actual.data).toEqual(expected);
    });
  });
  it('should delete item', () => {
    // Arrange
    const store = new ApiStore();
    const data = [{ destination: 'The Moon' }, { destination: 'Mars' }];
    store.setData(data);
    const newItem = { destination: 'Earth orbit' };
    store.addItem(newItem);
    // Act
    store.deleteItem(newItem);
    // Assert
    store.selectState$().subscribe((actual) => {
      // Assert
      const expected = [{ destination: 'The Moon' }, { destination: 'Mars' }];
      expect(actual.data).toEqual(expected);
    });
  });
});
