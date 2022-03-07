import useAddCourseModal from '../hooks/useAddCourseModal';

export default function AddCourseModal({
  showModal = false,
  closeModal,
  handleSubmit: handleSubmitProp,
}: {
  showModal: boolean;
  closeModal: () => void;
  handleSubmit: () => void;
}) {
  const { onSubmit, register, handleSubmit, errors, isLoading } =
    useAddCourseModal(handleSubmitProp);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        showModal
          ? 'fixed left-1/3 top-3.5 flex flex-col w-100 h-250 bg-amber-100 p-6'
          : 'hidden'
      }`}>
      <h3 className="text-2xl font-bold text-center mb-3">강의 등록</h3>
      <button type="button" className="ml-auto mb-3" onClick={closeModal}>
        닫기
      </button>
      <label className="mb-2">
        강의 제목
        <input
          className="ml-2"
          placeholder="강의 제목"
          type="text"
          {...register('title', { required: true })}
        />
      </label>
      {errors.title && <span>{errors.title.message}</span>}
      <label>
        강의 가격
        <input
          className="ml-2"
          placeholder="강의 가격"
          type="text"
          {...register('price', { required: true })}
        />
      </label>
      {errors.price && <span>{errors.price.message}</span>}
      <button
        disabled={isLoading || Object.keys(errors).length !== 0}
        className="bg-amber-400 text-white p-2 rounded mt-3 disabled:bg-black"
        type="submit">
        {isLoading ? '제출중...' : '제출'}
      </button>
    </form>
  );
}
