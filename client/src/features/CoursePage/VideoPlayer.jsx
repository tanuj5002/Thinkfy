import ReactPlayer from 'react-player';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const VideoPlayer = ({ videoId, title, selectedLesson,playListId }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const queryClient = useQueryClient();

  const updateVideoMutation = useMutation({
    mutationFn: (id) =>
      axios.put(`http://localhost:3001/api/video/${id}`, {
        isCompeleted: true,
      }),
    onSuccess: () => {
      console.log('Video marked as completed');
      queryClient.invalidateQueries(['videoData', playListId]);
    },
    onError: (err) => {
      console.error('Error updating video completion:', err);
    },
  });

  const handleVideoEnd = () => {
    if (selectedLesson?._id) {
      updateVideoMutation.mutate(selectedLesson._id);
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <ReactPlayer
        src={videoUrl} 
        controls
        width="100%"
        height="400px"
        onEnded={handleVideoEnd}
      />
    </div>
  );
};

export default VideoPlayer;
