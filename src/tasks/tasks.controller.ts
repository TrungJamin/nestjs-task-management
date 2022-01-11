import { GetUser } from './../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { User } from 'src/auth/user.entity';

// The controller job only job is to simply receive a request
// They'll agree to whatever is needed to achieve the goal and then return the response
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() getTasksFilterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(getTasksFilterDto, user);
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskByID(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteATask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteATask(id, user);
  }

  // @Delete('/:id')
  // deleteATask(@Param('id') id: string): void {
  //   return this.tasksService.deleteATask(id);
  // }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
