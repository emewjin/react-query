import Card, { Course } from './Card';
import { useQuery } from 'react-query';
import { getCourses } from '../api';
import { useEffect } from 'react';

export default function Main() {
  const { isLoading, isError, data } = useQuery(
    ['mainGetCourses'],
    async () => await getCourses({}),
    {
      retry: false,
    },
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>error</div>;

  return (
    <main className="grid grid-cols-3 gap-3 gap-y-10 p-7">
      {data.map((course: Course) => (
        <Card key={course.id} course={course} />
      ))}
    </main>
  );
}
