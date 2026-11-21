/**
 * Opens a <video> in the device's native fullscreen player.
 * Native fullscreen always has a system close control (and the back gesture on Android),
 * so it never traps the user the way a custom modal can on mobile.
 */
export function openVideoFullscreen(video: HTMLVideoElement | null): void {
  if (!video) return;
  const v = video as HTMLVideoElement & {
    webkitEnterFullscreen?: () => void;
    webkitRequestFullscreen?: () => Promise<void> | void;
  };
  video.play().catch(() => {});
  try {
    if (typeof v.requestFullscreen === 'function') {
      v.requestFullscreen().catch(() => v.webkitEnterFullscreen?.());
    } else if (typeof v.webkitRequestFullscreen === 'function') {
      v.webkitRequestFullscreen();
    } else if (typeof v.webkitEnterFullscreen === 'function') {
      // iOS Safari (iPhone) only supports fullscreen on the video element itself.
      v.webkitEnterFullscreen();
    }
  } catch {
    // ignore: fullscreen not allowed
  }
}
