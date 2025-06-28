import { useState, useEffect } from 'react';
import styles from './CourseDetail.module.css';
import VideoPlayer from '../features/CoursePage/VideoPlayer.jsx';
import CourseTabs from '../features/CoursePage/CourseTabs.jsx';
import VideoOverview from '../features/CoursePage/VideoOverview.jsx';
import PlaylistSidebar from '../features/CoursePage/PlaylistSidebar.jsx';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import Quiz from '../features/CoursePage/Quiz.jsx';

const getPlayListData = async (playListId) => {
  const url = `http://localhost:3001/api/course/${playListId}`;
  try {
    const res = await axios.get(url);
    if (!res.data) throw new Error("No course exists");
    return res.data;
  } catch (err) {
    toast.error("No such course exists");
    throw err;
  }
};

const getVideoInfo = async (playListId) => {
  const url = `http://localhost:3001/api/video/course/${playListId}`;
  try {
    const res = await axios.get(url);
    if (!res) throw new Error("Video or playlist does not exist");
    return res.data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const CourseDetail = () => {
  const { playListId } = useParams();

  const { data: playListData, isLoading: isPlaylistLoading } = useQuery({
    queryKey: ['playlist', playListId],
    queryFn: () => getPlayListData(playListId),
    enabled: !!playListId,
  });

  const {
    data: videoData = [],
    isLoading: isVideoLoading,
  } = useQuery({
    queryKey: ['videoData', playListId],
    queryFn: () => getVideoInfo(playListId),
    enabled: !!playListId && !!playListData?.videos,
  });

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // <-- NEW STATE

  useEffect(() => {
    if (videoData.length > 0) {
      setSelectedLesson(videoData[0]);
    }
  }, [videoData]);
 console.log(selectedLesson)
  return (
    <div>
      <div className={styles.courseTitleWrapper}>
        <div className={styles.redStick}></div>
        <h1 className={styles.courseTitle}>{playListData?.title || "Loading..."}</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.videoSection}>
            <VideoPlayer
              videoId={selectedLesson?.videoId}
              title={selectedLesson?.title}
              playListId={playListId}
              selectedLesson={selectedLesson}
            />
          </div>

          <div className={styles.sidebarMobile}>
            <PlaylistSidebar
              lessons={videoData}
              selectedLesson={selectedLesson}
              onSelectLesson={setSelectedLesson}
            />
          </div>

          <div className={styles.infoSection}>
            <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "overview" && <VideoOverview video={selectedLesson} />}
            {activeTab === "quiz" && <Quiz selectedLesson={selectedLesson}/>}
          </div>
        </div>

        <aside className={styles.sidebarDesktop}>
          <PlaylistSidebar
            lessons={videoData}
            selectedLesson={selectedLesson}
            onSelectLesson={setSelectedLesson}
          />
        </aside>
      </div>
    </div>
  );
};

export default CourseDetail;
