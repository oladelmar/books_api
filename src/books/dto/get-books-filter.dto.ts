import { IsOptional, IsMongoId, IsISBN } from 'class-validator';

export class GetBooksFilterDto {
  @IsOptional()
  @IsMongoId()
  author: string;

  @IsOptional()
  title: string;

  @IsOptional()
  @IsISBN()
  isbn: string;
}
