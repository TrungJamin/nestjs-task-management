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
import { Logger } from '@nestjs/common';

// The controller job only job is to simply receive a request
// They'll agree to whatever is needed to achieve the goal and then return the response
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // We pass a "context" TaskController, this means whenever we log anything with this logger
  // this is going to be presented as the context, so that's going to make it very easy for us to understand
  // where our logs are coming from
  private logger = new Logger('TaskController');

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() getTasksFilterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${
        user.username
      }" is retrieving all tasks!, Filter: ${JSON.stringify(
        getTasksFilterDto,
      )}"`,
    );
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
    this.logger.verbose(
      `User "${user.username}" is creating a task!, Data: ${JSON.stringify(
        createTaskDto,
      )}"`,
    );
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
