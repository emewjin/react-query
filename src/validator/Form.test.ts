import Form from './Form';
import { validate } from 'class-validator';

describe('Form', () => {
  it('강의 제목을 입력하지 않으면 에러메세지를 반환한다', async () => {
    const form = new Form('', 234);
    const [error] = await validate(form);
    expect(error.constraints?.isNotEmpty).toBe('강의 제목을 입력해주세요');
  });

  it('강의 가격에 음수를 입력하면 에러메세지를 반환한다', async () => {
    const form = new Form('강의 제목', -234);
    const [error] = await validate(form);
    expect(error.constraints?.min).toBe('강의 가격은 음수일 수 없습니다');
  });

  it('강의 가격에 0 이상의 양수를 입력하면 통과시킨다', async () => {
    const form = new Form('강의제목', 0);
    const res = await validate(form);
    expect(res.length).toBe(0);
  });
});
