import Card, { Course } from './Card';
import { useQuery } from 'react-query';
import { getCourses } from '../api';

export default function Main() {
  const { isLoading, data } = useQuery(
    ['mainGetCourses'],
    async () => await getCourses({}),
    {
      retry: false,
      useErrorBoundary: true,
      meta: {
        myMessage: '메인페이지',
      },
    },
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="grid grid-cols-3 gap-3 gap-y-10 p-7">
      {data.map((course: Course) => (
        <Card key={course.id} course={course} />
      ))}
    </main>
  );
}
