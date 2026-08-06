export const buildPodcastShareUrl = (
  trackId: string,
  audioUrl: string,
) => {
  const params = new URLSearchParams({
    trackId,
    audioUrl,
  });

  return `https://uhsocial.in/api/share/podcast?${params.toString()}`;
};