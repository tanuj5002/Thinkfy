import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getQuiz = async (videoId) => {
  const url = 'http://localhost:3001/api/quiz';

  try {
    const res = await axios.post(url, {
      videoId,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

const Quiz = ({ selectedLesson }) => {
  const videoId = selectedLesson?.videoId;

  const { data: quizData, isLoading, isError } = useQuery({
    queryKey: ["quiz", videoId],
    queryFn: () => getQuiz(videoId),
    enabled: !!videoId,
  });

  if (isLoading) return <div>Loading quiz...</div>;
  if (isError) return <div>Error loading quiz.</div>;

  return (
    <div>
      <h2>This is the first quiz</h2>
      {quizData?.questions?.length > 0 ? (
        <ul>
          {quizData.questions.map((q, index) => (
            <li key={index}>
              <strong>{q.question}</strong>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quiz available for this video.</p>
      )}
    </div>
  );
};

export default Quiz;
