import { IsAlpha, IsDateString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @IsAlpha()
  firstName: string;

  @IsOptional()
  @IsAlpha()
  lastName: string;

  @IsOptional()
  @IsDateString()
  birthday: string;
}
