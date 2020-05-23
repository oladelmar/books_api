import { IsOptional, IsAlpha } from 'class-validator';

export class GetAuthorsFilterDto {
  @IsOptional()
  @IsAlpha()
  firstName: string;

  @IsOptional()
  @IsAlpha()
  lastName: string;
}
