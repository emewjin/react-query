import { useInfiniteQuery } from 'react-query';
import { getCourses } from '../api';
import { Course } from '../components/Card';

export default function useCourses() {
  const { isLoading, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['mainGetCourses'],
      async ({ pageParam = 1 }) => {
        return await getCourses({ page: pageParam });
      },
      {
        useErrorBoundary: true,
        meta: {
          myMessage: '메인페이지',
        },
      },
    );

  const courses = data
    ? data.pages.reduce((acc: Course[], page) => {
        return [...acc, ...page.courses];
      }, [])
    : [];

  const currentPageNumber = data
    ? data.pages[data.pages.length - 1].pageNumber + 1
    : 1;

  return {
    isLoading,
    courses,
    currentPageNumber,
    fetchNextPage,
    isFetchingNextPage,
  };
}
