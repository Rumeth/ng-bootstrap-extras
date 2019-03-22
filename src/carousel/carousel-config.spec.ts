import {NgbxCarouselConfig} from './carousel-config';

describe('ngbx-carousel-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbxCarouselConfig();

    expect(config.interval).toBe(5000);
    expect(config.keyboard).toBe(true);
    expect(config.wrap).toBe(true);
    expect(config.pauseOnHover).toBe(true);
    expect(config.showNavigationIndicators).toBe(true);
    expect(config.showNavigationArrows).toBe(true);
  });
});
