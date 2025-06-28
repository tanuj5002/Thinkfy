import styles from './VideoOverview.module.css';

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;

  if (hrs > 0) return `${hrs}h ${remMins}m`;
  return `${remMins}m`;
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });
};

const VideoOverview = ({ video }) => {
  if (!video) return null;

  return (
    <div className={styles.container}>
      <h3>Video Overview</h3>
      <p>{video.description}</p>

      <h4>Video Info:</h4>
      <ul>
        <li><strong>Title:</strong> {video.title}</li>
        <li><strong>Duration:</strong> {formatDuration(video.duration)}</li>
        <li><strong>Uploaded:</strong> {formatDate(video.createdAt)}</li>

      </ul>
    </div>
  );
};

export default VideoOverview;
