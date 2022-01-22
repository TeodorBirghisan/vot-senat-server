import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class MeetingDTO {
  readonly title: string;
  @Type(() => Date)
  @IsDate()
  readonly startDate: Date;
  description: string;
}
