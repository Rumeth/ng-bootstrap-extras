import {NgbxTabsetConfig} from './tabset-config';

describe('ngbx-tabset-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbxTabsetConfig();

    expect(config.type).toBe('tabs');
    expect(config.justify).toBe('start');
  });
});
