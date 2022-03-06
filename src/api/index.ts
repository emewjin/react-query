import { stringify } from 'query-string';

const HOST = 'http://localhost:3000/api';
const GET_COURSES = HOST + '/courses';

async function fetchModule(url: string) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error('에러발생');
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
    data: { courses },
  } = await fetchModule(`${GET_COURSES}?${queryString}`);
  return courses;
};

export default {};
