import React from 'react';
import styles from './CourseTabs.module.css';

const CourseTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
        onClick={() => setActiveTab('overview')}
      >
        Overview
      </button>
      <button
        className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}
        onClick={() => setActiveTab('quiz')}
      >
        Quiz
      </button>
    </div>
  );
};

export default CourseTabs;
