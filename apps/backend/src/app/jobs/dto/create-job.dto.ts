import {IsBoolean, IsInt, IsNotEmpty,IsString} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  remote: boolean;

  @IsInt()
  workYears: number;

  @IsInt()
  budgetMin: number;

  @IsInt()
  budgetMax: number;
}
