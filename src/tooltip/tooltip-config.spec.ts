import {NgbxTooltipConfig} from './tooltip-config';

describe('ngbx-tooltip-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbxTooltipConfig();

    expect(config.autoClose).toBe(true);
    expect(config.placement).toBe('auto');
    expect(config.triggers).toBe('hover focus');
    expect(config.container).toBeUndefined();
    expect(config.disableTooltip).toBe(false);
    expect(config.tooltipClass).toBeUndefined();
    expect(config.openDelay).toBe(0);
    expect(config.closeDelay).toBe(0);
  });
});
