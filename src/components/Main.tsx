import Card, { Course } from './Card';
import useCourses from '../hooks/useCourses';
import AddCourseModal from './AddCourseModal';
import { useState } from 'react';

export default function Main() {
  const { refetch, courses, isFetching, fetchNextPage, currentPageNumber } =
    useCourses();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    refetch();
    closeModal();
  };

  return (
    <>
      {isFetching && (
        <div className="fixed z-10 w-full h-screen flex justify-center items-center text-5xl">
          loading...
        </div>
      )}
      <AddCourseModal
        showModal={showModal}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
      <button onClick={openModal}>강의등록</button>
      <main className="grid grid-cols-3 gap-3 gap-y-10 p-7">
        {courses.map((course: Course) => (
          <Card key={course.id} course={course} />
        ))}
        <button
          disabled={isFetching}
          className="bg-amber-300"
          onClick={() => fetchNextPage({ pageParam: currentPageNumber })}>
          more
        </button>
      </main>
    </>
  );
}
