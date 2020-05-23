import { IsAlpha, IsDateString } from 'class-validator';

export class CreateAuthorDto {
  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;

  @IsDateString()
  birthday: Date;
}
