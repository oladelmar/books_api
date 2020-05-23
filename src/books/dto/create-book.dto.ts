import { IsNotEmpty, IsMongoId, IsISBN, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsMongoId()
  author: string;

  @IsISBN()
  isbn: string;

  @IsDateString()
  publishedAt: Date;
}
