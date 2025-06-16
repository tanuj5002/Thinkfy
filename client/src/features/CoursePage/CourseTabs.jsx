import styles from './CourseTabs.module.css';

const CourseTabs = () => {
  return (
    <div className={styles.tabs}>
      <button className={styles.active}>Overview</button>
      <button>Quiz</button>
      <button>Resources</button>
    </div>
  );
};

export default CourseTabs;
