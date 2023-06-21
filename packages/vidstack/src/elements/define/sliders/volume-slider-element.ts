import { Host } from 'maverick.js/element';

import { VolumeSlider } from '../../../components';

/**
 * @docs {@link https://www.vidstack.io/docs/player/components/sliders/volume-slider}
 * @example
 * ```html
 * <media-volume-slider>
 *   <div class="slider-track"></div>
 *   <div class="slider-track-fill"></div>
 *   <div class="slider-track-progress"></div>
 *   <div class="slider-thumb"></div>
 * </media-volume-slider>
 * ```
 * @example
 * ```html
 * <media-volume-slider>
 *   <!-- ... -->
 *   <media-slider-preview>
 *     <media-slider-value type="pointer" format="percent"></media-slider-value>
 *   </media-slider-preview>
 * </media-volume-slider>
 * ```
 */
export class MediaVolumeSliderElement extends Host(HTMLElement, VolumeSlider) {
  static tagName = 'media-volume-slider';
}

declare global {
  interface HTMLElementTagNameMap {
    'media-volume-slider': MediaVolumeSliderElement;
  }
}
