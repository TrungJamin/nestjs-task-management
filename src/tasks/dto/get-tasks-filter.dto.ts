import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TasksStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  // "?": optional
  @IsOptional()
  // Now, if a value is provided, we do want to apply some rules.
  @IsEnum(TasksStatus)
  status?: TasksStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
