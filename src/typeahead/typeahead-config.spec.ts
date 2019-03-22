import {NgbxTypeaheadConfig} from './typeahead-config';

describe('ngbx-typeahead-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbxTypeaheadConfig();

    expect(config.container).toBeUndefined();
    expect(config.editable).toBeTruthy();
    expect(config.focusFirst).toBeTruthy();
    expect(config.showHint).toBeFalsy();
  });
});
