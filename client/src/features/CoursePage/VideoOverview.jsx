import styles from './VideoOverview.module.css';

const VideoOverview = () => {
  return (
    <div className={styles.container}>
      <h3>Video Overview</h3>
      <p>
        This video introduces the fundamentals of React state management using the useState hook...
      </p>

      <h4>Key Highlights:</h4>
      <ul>
        <li>Understanding the purpose of useState</li>
        <li>Syntax for declaring state variables</li>
        <li>Best practices for updating state immutably</li>
        <li>Examples of managing different data types</li>
      </ul>
    </div>
  );
};

export default VideoOverview;
