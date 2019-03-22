import {NgbxRatingConfig} from './rating-config';

describe('ngbx-rating-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbxRatingConfig();

    expect(config.max).toBe(10);
    expect(config.readonly).toBe(false);
    expect(config.resettable).toBe(false);
  });
});
