import {NgbxAccordionConfig} from './accordion-config';

describe('ngbx-accordion-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbxAccordionConfig();

    expect(config.closeOthers).toBe(false);
    expect(config.type).toBeUndefined();
  });
});
