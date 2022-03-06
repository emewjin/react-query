import { Link } from 'react-router-dom';

export interface Course {
  id: number;
  coverImageUrl: string;
  instructorName: string;
  price: number;
  title: string;
}

export default function Card({ course }: { course: Course }) {
  const { id, coverImageUrl, instructorName, price, title } = course;

  return (
    <Link to={`courses/${id}`}>
      <article className="flex flex-col">
        <figure>
          <img
            className="object-cover h-48 w-96"
            src={coverImageUrl}
            alt={`${title}커버 이미지`}
          />
        </figure>
        <div className="flex flex-col h-full justify-between">
          <h2 className="my-3">{title}</h2>
          <div className="flex">
            <span>{instructorName}</span>
            <div className="bg-black w-px h-auto mx-1" />
            <span>{price}원</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
