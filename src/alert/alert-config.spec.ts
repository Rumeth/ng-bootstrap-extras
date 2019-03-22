import {NgbxAlertConfig} from './alert-config';

describe('ngbx-alert-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbxAlertConfig();

    expect(config.dismissible).toBe(true);
    expect(config.type).toBe('warning');
  });
});
