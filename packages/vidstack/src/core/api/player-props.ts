import type { LogLevel } from '../../foundation/logger/log-level';
import type { ScreenOrientationLockType } from '../../foundation/orientation/types';
import { MEDIA_KEY_SHORTCUTS } from '../keyboard/controller';
import type { MediaKeyShortcuts, MediaKeyTarget } from '../keyboard/types';
import type { MediaState } from './player-state';
import type { MediaLoadingStrategy, MediaResource } from './types';

export const mediaPlayerProps: MediaPlayerProps = {
  autoplay: false,
  controls: false,
  currentTime: 0,
  crossorigin: null,
  fullscreenOrientation: 'landscape',
  load: 'visible',
  logLevel: __DEV__ ? 'warn' : 'silent',
  loop: false,
  muted: false,
  paused: true,
  playsinline: false,
  playbackRate: 1,
  poster: '',
  preload: 'metadata',
  preferNativeHLS: false,
  src: '',
  controlsDelay: 2000,
  viewType: 'unknown',
  streamType: 'unknown',
  volume: 1,
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  keyDisabled: false,
  keyTarget: 'player',
  keyShortcuts: MEDIA_KEY_SHORTCUTS,
  title: '',
};

export interface MediaStateAccessors
  extends Pick<
    MediaState,
    'paused' | 'muted' | 'volume' | 'currentTime' | 'playsinline' | 'playbackRate'
  > {}

export type MediaSrc =
  | MediaResource
  | { src: MediaResource; type?: string }
  | { src: MediaResource; type?: string }[];

export interface MediaPlayerProps
  // Prefer picking off the `MediaStore` type to ensure docs are kept in-sync.
  extends Pick<
    MediaState,
    | 'autoplay'
    | 'controls'
    | 'currentTime'
    | 'loop'
    | 'muted'
    | 'paused'
    | 'playsinline'
    | 'poster'
    | 'preload'
    | 'playbackRate'
    | 'title'
    | 'viewType'
    | 'volume'
    // live
    | 'streamType'
    | 'liveEdgeTolerance'
    | 'minLiveDVRWindow'
  > {
  /**
   * Defines how the media element handles cross-origin requests, thereby enabling the
   * configuration of the CORS requests for the element's fetched data.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin}
   */
  crossorigin: string | true | null;
  /**
   * The URL and optionally type of the current media resource/s to be considered for playback.
   *
   * @see {@link https://vidstack.io/docs/player/core-concepts/loading#loading-source}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject}
   */
  src: MediaSrc;
  /**
   * The current log level. Values in order of priority are: `silent`, `error`, `warn`, `info`,
   * and `debug`.
   */
  logLevel: LogLevel;
  /**
   * Indicates when the provider can begin loading media.
   *
   * - `eager`: media will be loaded immediately.
   * - `idle`: media will be loaded after the page has loaded and `requestIdleCallback` is fired.
   * - `visible`: media will delay loading until the provider has entered the viewport.
   * - `custom`: media will wait for the `startLoading()` method or `media-start-loading` event.
   *
   *  @see {@link https://vidstack.io/docs/player/core-concepts/loading#loading-strategies}
   */
  load: MediaLoadingStrategy;
  /**
   * The default amount of delay in milliseconds while media playback is progressing without user
   * activity to indicate an idle state and hide controls.
   */
  controlsDelay: number;
  /**
   * This method will indicate the orientation to lock the screen to when in fullscreen mode and
   * the Screen Orientation API is available.
   */
  fullscreenOrientation: ScreenOrientationLockType | undefined;
  /**
   * Whether native HLS support is preferred over using `hls.js`. We recommend setting this to
   * `false` to ensure a consistent and configurable experience across browsers. In addition, our
   * live stream support and DVR detection is much better with `hls.js` so choose accordingly.
   *
   * This should generally only be set to `true` if (1) you're working with HLS streams, and (2)
   * you want AirPlay to work via the native Safari controls (i.e., `controls` attribute is
   * present on the `<media-player>` element).
   */
  preferNativeHLS: boolean;
  /**
   * Whether keyboard support is disabled for the media player globally. This property won't disable
   * standard ARIA keyboard controls for individual components when focused.
   *
   * @defaultValue 'false'
   */
  keyDisabled: boolean;
  /**
   * The target on which to listen for keyboard events (e.g., `keydown`):
   *
   * - `document`: the player will listen for events on the entire document. In the case that
   * multiple players are on the page, only the most recently active player will receive input.
   * - `player`: the player will listen for events on the player itself or one of its children
   * were recently interacted with.
   *
   * @defaultValue `player`
   */
  keyTarget: MediaKeyTarget;
  /**
   * Extends global media player keyboard shortcuts. The shortcuts can be specified as a
   * space-separated list of combinations (e.g., `p Control+Space`), array, or callbacks. See the
   * provided doc link for more information.
   *
   * Do note, if `aria-keyshortcuts` is specified on a component then it will take precedence
   * over the respective value set here.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-keyshortcuts}
   * @example
   * ```ts
   * player.keyShortcuts = {
   *  // Space-separated list.
   *  togglePaused: 'k Space',
   *  toggleMuted: 'm',
   *  toggleFullscreen: 'f',
   *  togglePictureInPicture: 'i',
   *  toggleCaptions: 'c',
   *  // Array.
   *  seekBackward: ['j', 'J', 'ArrowLeft'],
   *  seekForward: ['l', 'L', 'ArrowRight'],
   *  volumeUp: 'ArrowUp',
   *  volumeDown: 'ArrowDown',
   *  speedUp: '>',
   *  slowDown: '<',
   *  // Callback.
   *  fooBar: {
   *    keys: ['k', 'Space'],
   *    callback(event) {}
   *   },
   * }
   * ```
   */
  keyShortcuts: MediaKeyShortcuts;
}
