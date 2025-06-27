import Split from 'react-split';
import styles from './CourseDetail.module.css';

import VideoPlayer from '../features/CoursePage/VideoPlayer.jsx';
import CourseTabs from '../features/CoursePage/CourseTabs.jsx';
import VideoOverview from '../features/CoursePage/VideoOverview.jsx';
import PlaylistSidebar from '../features/CoursePage/PlaylistSidebar.jsx';

const CourseDetail = () => {

  return (
    <div className={styles.container}> 
      <Split
        className={styles.verticalSplit}
        sizes={[70, 30]}
        minSize={300}
        gutterSize={6}
        direction="horizontal"
      >
        <div className={styles.mainContent}>
          <Split
            direction="vertical"
            sizes={[60, 40]}
            minSize={100}
            gutterSize={6}
            className={styles.horizontalSplit}
          >
            <div className={styles.videoSection}>
              <VideoPlayer />
            </div>
            <div className={styles.infoSection}>
              <CourseTabs />
              <VideoOverview />
            </div>
          </Split>
        </div>
    
        <aside className={styles.sidebar}>
          <PlaylistSidebar />
        </aside>
      </Split>
    </div>
  );
};

export default CourseDetail;
