import { useParams } from 'react-router-dom';

export function CourseDetail() {
  const { courseId } = useParams();

  return <div>{courseId} detail</div>;
}
