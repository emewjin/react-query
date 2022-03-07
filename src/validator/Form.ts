import 'reflect-metadata';
import { IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export default class Form {
  @IsNotEmpty({ message: '강의 제목을 입력해주세요' })
  title: string;

  @Min(0, { message: '강의 가격은 음수일 수 없습니다' })
  @IsNotEmpty({ message: '강의 가격을 입력해주세요' })
  @Type(() => Number)
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}
