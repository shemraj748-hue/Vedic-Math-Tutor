export default function VideoCard({ video }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={video.snippet.thumbnails.medium.url}
        alt=""
        className="rounded"
      />
      <h3 className="mt-2 font-semibold">
        {video.snippet.title}
      </h3>
      <a
        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
        target="_blank"
        className="text-blue-600 mt-2 inline-block"
      >
        Watch Video
      </a>
    </div>
  );
}
