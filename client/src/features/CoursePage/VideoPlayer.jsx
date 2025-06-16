import styles from './VideoPlayer.module.css';

const VideoPlayer = () => {
  return (
    <div className={styles.player}>
      <img src="/thumbnail.jpg" alt="Video thumbnail" className={styles.thumbnail} />
      <div className={styles.title}>State Management with useState</div>
    </div>
  );
};

export default VideoPlayer;
