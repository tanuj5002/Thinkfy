import styles from './PlaylistSidebar.module.css';
import CircularProgress from './CircularProgress'; // <-- Import the progress component

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  if (hrs > 0) {
    return `${hrs}h ${remainingMins}m`;
  } else {
    return `${remainingMins}m`;
  }
};

const PlaylistSidebar = ({ lessons, selectedLesson, onSelectLesson }) => {
  const total = lessons.length;
  const completed = lessons.filter(lesson => lesson.isCompeleted).length;

  return (
    <div className={styles.sidebar}>
      <CircularProgress total={total} completed={completed} />

      <h4>Course Playlist</h4>
      <ul className={styles.list}>
        {lessons.map((lesson, index) => (
          <li
            key={index}
            className={`${styles.lessonItem} ${
              selectedLesson?.title === lesson.title ? styles.active : ''
            }`}
            onClick={() => onSelectLesson(lesson)}
          >
            <div>{lesson.title}</div>
            <span className={styles.duration}>
              {formatDuration(lesson.duration)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistSidebar;
