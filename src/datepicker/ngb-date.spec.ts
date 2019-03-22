import {NgbxDate} from './ngbx-date';

describe('ngbx-date', () => {

  describe('from', () => {

    it('should create a date from a structure',
       () => { expect(NgbxDate.from({year: 2010, month: 10, day: 2})).toEqual(new NgbxDate(2010, 10, 2)); });

    it('should work with non-numeric values', () => {
      expect(NgbxDate.from({year: null, month: null, day: null})).toEqual(new NgbxDate(null, null, null));
      expect(NgbxDate.from({year: undefined, month: undefined, day: undefined}))
          .toEqual(new NgbxDate(null, null, null));
      expect(NgbxDate.from({year: <any>'2010', month: <any>'10', day: <any>'2'}))
          .toEqual(new NgbxDate(null, null, null));
    });

    it('should return the same NgbxDate object', () => {
      const date = new NgbxDate(2010, 10, 10);
      expect(NgbxDate.from(date)).toBe(date);
    });
  });

  describe('equals', () => {
    const date = new NgbxDate(2016, 8, 18);

    it('should return true for the same dates', () => { expect(date.equals(new NgbxDate(2016, 8, 18))).toBeTruthy(); });

    it('should work with structures', () => { expect(date.equals({day: 18, month: 8, year: 2016})).toBeTruthy(); });

    it('should return false different dates', () => {
      expect(date.equals(new NgbxDate(0, 8, 18))).toBeFalsy();
      expect(date.equals(new NgbxDate(2016, 0, 18))).toBeFalsy();
      expect(date.equals(new NgbxDate(2016, 8, 0))).toBeFalsy();
    });

    it('should return false undefined and null values', () => {
      expect(date.equals(null)).toBeFalsy();
      expect(date.equals(undefined)).toBeFalsy();
    });
  });

  describe('before', () => {
    const date = new NgbxDate(2016, 8, 18);

    it('should return false undefined and null values', () => {
      expect(date.before(null)).toBeFalsy();
      expect(date.before(undefined)).toBeFalsy();
    });

    it('should work with structures', () => { expect(date.before({day: 18, month: 9, year: 2016})).toBeTruthy(); });

    it('should return true if current date is before the other one', () => {
      expect(date.before(new NgbxDate(2016, 8, 19))).toBeTruthy();
      expect(date.before(new NgbxDate(2016, 9, 18))).toBeTruthy();
      expect(date.before(new NgbxDate(2017, 8, 18))).toBeTruthy();
    });

    it('should return false if current date is after the other one', () => {
      expect(date.before(new NgbxDate(2016, 8, 17))).toBeFalsy();
      expect(date.before(new NgbxDate(2016, 7, 18))).toBeFalsy();
      expect(date.before(new NgbxDate(2015, 8, 18))).toBeFalsy();
    });
  });

  describe('after', () => {
    const date = new NgbxDate(2016, 8, 18);

    it('should return false undefined and null values', () => {
      expect(date.after(null)).toBeFalsy();
      expect(date.after(undefined)).toBeFalsy();
    });

    it('should work with structures', () => { expect(date.after({day: 17, month: 8, year: 2016})).toBeTruthy(); });

    it('should return true if current date is after the other one', () => {
      expect(date.after(new NgbxDate(2016, 8, 17))).toBeTruthy();
      expect(date.after(new NgbxDate(2016, 7, 18))).toBeTruthy();
      expect(date.after(new NgbxDate(2015, 8, 18))).toBeTruthy();
    });

    it('should return false if current date is before the other one', () => {
      expect(date.after(new NgbxDate(2016, 8, 19))).toBeFalsy();
      expect(date.after(new NgbxDate(2016, 9, 18))).toBeFalsy();
      expect(date.after(new NgbxDate(2017, 8, 18))).toBeFalsy();
    });
  });
});
