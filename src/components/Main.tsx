import Card, { Course } from './Card';
import { useQuery } from 'react-query';
import { getCourses } from '../api';
import { useEffect } from 'react';

export default function Main() {
  const { isLoading, error, data } = useQuery(
    'mainGetCourses',
    async () => await getCourses({}),
  );

  useEffect(() => console.log(data), [data]);
  useEffect(() => console.log(error), [error]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="grid grid-cols-3 gap-3 gap-y-10 p-7">
      {data.map((course: Course) => (
        <Card key={course.id} course={course} />
      ))}
    </main>
  );
}
