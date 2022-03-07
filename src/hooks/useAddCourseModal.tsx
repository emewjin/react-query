import { useMutation } from 'react-query';
import { postCourse, TNewCourse } from '../api';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import Form from '../validator/Form';

export default function useAddCourseModal(handleSubmitProp: () => void) {
  const { mutate, isLoading } = useMutation(
    (newCourse: TNewCourse) => {
      return postCourse(newCourse);
    },
    {
      onSuccess: () => handleSubmitProp(),
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: classValidatorResolver(Form),
  });

  // @ts-ignore
  const onSubmit = (data) => {
    mutate({ title: data.title, price: data.price });
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    isLoading,
  };
}
