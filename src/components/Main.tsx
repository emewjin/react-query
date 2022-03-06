import Card, { Course } from './Card';
import useCourses from '../hooks/useCourses';

export default function Main() {
  const {
    isLoading,
    isFetchingNextPage,
    courses,
    currentPageNumber,
    fetchNextPage,
  } = useCourses();

  return (
    <>
      {(isLoading || isFetchingNextPage) && (
        <div className="fixed z-10 w-full h-screen flex justify-center items-center text-5xl">
          loading...
        </div>
      )}
      <main className="grid grid-cols-3 gap-3 gap-y-10 p-7">
        {courses.map((course: Course) => (
          <Card key={course.id} course={course} />
        ))}
        <button
          disabled={isFetchingNextPage}
          className="bg-amber-300"
          onClick={() => fetchNextPage({ pageParam: currentPageNumber })}>
          more
        </button>
      </main>
    </>
  );
}
