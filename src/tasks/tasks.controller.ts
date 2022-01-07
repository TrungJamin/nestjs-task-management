import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

// The controller job only job is to simply receive a request
// They'll agree to whatever is needed to achieve the goal and then return the response
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
  //   // if we have any filters defined, call taskService.getTaskWillFilters()
  //   // otherwise, just get all tasks
  //   if (Object.keys(getTasksFilterDto).length) {
  //     return this.tasksService.getTasksWithFilter(getTasksFilterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskByID(id);
  }

  // // when we use an id after ":", we will call NestJS like
  // // this is going to be a path parameter and then we'll be able to extract it in the
  // // parameters of the handler, pretty similarly to how we did it with the body.
  // @Get('/:id')
  // getTaskByID(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskByID(id);
  // }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }
  // @Delete('/:id')
  // deleteATask(@Param('id') id: string): void {
  //   return this.tasksService.deleteATask(id);
  // }
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
