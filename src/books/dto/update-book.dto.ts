import {
  IsNotEmpty,
  IsMongoId,
  IsISBN,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsMongoId()
  author: string;

  @IsOptional()
  @IsISBN()
  isbn: string;

  @IsOptional()
  @IsDateString()
  publishedAt: Date;
}
