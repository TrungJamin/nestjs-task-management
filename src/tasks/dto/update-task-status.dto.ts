import { IsEnum } from 'class-validator';
import { TasksStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
