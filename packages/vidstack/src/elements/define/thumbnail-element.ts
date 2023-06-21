import { effect } from 'maverick.js';
import { Host } from 'maverick.js/element';
import { setAttribute } from 'maverick.js/std';

import { Thumbnail } from '../../components';
import { useMediaContext, type MediaContext } from '../../core/api/media-context';
import { cloneTemplateContent, createTemplate } from '../../utils/dom';

const imgTemplate = /* #__PURE__*/ createTemplate(
  '<img loading="eager" decoding="async" aria-hidden="true">',
);

/**
 * @docs {@link https://www.vidstack.io/docs/player/components/display/thumbnail}
 * @example
 * ```html
 * <media-player thumbnails="https://media-files.vidstack.io/thumbnails.vtt">
 *   <!-- ... -->
 *   <media-thumbnail time="10"></media-thumbnail>
 * </media-player>
 * ```
 */
export class MediaThumbnailElement extends Host(HTMLElement, Thumbnail) {
  static tagName = 'media-thumbnail';

  protected _media!: MediaContext;
  protected _img = this._createImg();

  protected onSetup(): void {
    this._media = useMediaContext();
    this.$state.img.set(this._img);
  }

  protected onConnect(): void {
    const { src } = this.$state,
      { crossorigin } = this._media.$props;

    effect(() => {
      setAttribute(this._img, 'src', src());
      setAttribute(this._img, 'crossorigin', crossorigin());
    });
  }

  private _createImg() {
    const img = cloneTemplateContent<HTMLImageElement>(imgTemplate);
    this.prepend(img);
    return img;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'media-thumbnail': MediaThumbnailElement;
  }
}
