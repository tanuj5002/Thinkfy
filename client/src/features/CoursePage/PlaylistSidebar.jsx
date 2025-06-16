import styles from './PlaylistSidebar.module.css';

const lessons = [
  { title: 'Introduction to React & Setup', duration: '12:30' },
  { title: 'Understanding JSX and Components', duration: '18:15' },
  { title: 'State Management with useState', duration: '25:00', active: true },
  { title: 'Lifecycle with useEffect Hook', duration: '20:45' },
  { title: 'Handling Events in React', duration: '15:20' },
  { title: 'Conditional Rendering & Lists', duration: '17:55' },
  { title: 'Forms and Controlled Components', duration: '22:10' },
  { title: 'Context API for Global State', duration: '28:00' },
];

const PlaylistSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h4>Course Playlist</h4>
      <ul className={styles.list}>
        {lessons.map((lesson, i) => (
          <li key={i} className={lesson.active ? styles.active : ''}>
            <span>{lesson.title}</span>
            <span className={styles.duration}>{lesson.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistSidebar;
