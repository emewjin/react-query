import { stringify } from 'query-string';

const HOST = 'http://localhost:3000';
const COURSES = HOST + '/api/courses';
const SEARCH = HOST + '/api/search/courses';

async function fetchModule(url: string, data?: any) {
  try {
    const response = await fetch(
      url,
      data
        ? {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        : {},
    );
    const { ok, ...rest } = await response.json();
    if (!ok) {
      throw new Error(rest.error.message);
    }
    return rest;
  } catch (error) {
    // 여기서 throw된 에러는 에러 바운더리 컴포넌트까지 전달
    console.log(error);
  }
}

export const getCourses = async ({
  page = 1,
  count = 20,
  lastContentId,
  search,
}: {
  page?: number;
  count?: number;
  lastContentId?: number;
  search?: string;
}) => {
  const queryString = stringify({
    page,
    count,
    lastContentId,
    search,
  });
  const {
    data: { courses, page: pageNumber },
  } = await fetchModule(`${COURSES}?${queryString}`);
  return { pageNumber, courses };
};

export const search = async (keyword: string, max = 10) => {
  const queryString = stringify({
    keyword,
    max,
  });
  const {
    data: { results },
  } = await fetchModule(`${SEARCH}?${queryString}`);
  return results;
};

export type TNewCourse = {
  title: string;
  price: number;
};

export const postCourse = async (newCourse: TNewCourse) => {
  const {
    data: { createdCourseId },
  } = await fetchModule(COURSES, newCourse);
  return createdCourseId;
};
