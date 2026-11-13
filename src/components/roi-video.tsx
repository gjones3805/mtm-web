// ROI video shown on the homepage between the hero and About MTM, embedded from YouTube.
const ROI_VIDEO_EMBED_URL = "https://www.youtube-nocookie.com/embed/jIE0QtqnWkU?rel=0";

export default function RoiVideo() {
  return (
    <div className="max-w-4xl overflow-hidden rounded-xl border border-line bg-surface">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="block aspect-video h-auto w-full border-0 bg-black"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={ROI_VIDEO_EMBED_URL}
        title="mediocre to masterful ROI video"
      />
    </div>
  );
}
