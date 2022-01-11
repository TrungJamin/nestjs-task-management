import { TaskRepository } from './task.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
// We will use our task service to contain the business logic related to our tasks, things like
// creation, deletion, updating, ...
// any other component in our application that is concerned about tasks
// For ex: the tasks controller is going to be able to "inject" and communicate
// with the task service.

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(getTasksFilterDto, user);
  }
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createATask(createTaskDto, user);
  }

  async getTaskByID(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Not found the task with ID ${id}`);
    }
    return found;
  }

  async deleteATask(id: string, user: User): Promise<void> {
    /*Delete does not check that the entity exists in the database beforehand*/

    const result = await this.taskRepository.delete({ id, user });
    // console.log(result); // DeleteResult { raw: [], affected: 1 }

    if (result.affected === 0) {
      throw new NotFoundException(`Not found the task with ID ${id}`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TasksStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskByID(id, user);

    task.status = status;
    this.taskRepository.save(task);

    return task;
  }
}
