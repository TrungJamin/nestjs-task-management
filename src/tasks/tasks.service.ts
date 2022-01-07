import { TaskRepository } from './task.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
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

  // // Creat a Tasks array
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(getTasksFilterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = getTasksFilterDto;
  //   let tasks = this.getAllTasks();
  //   // If status is defined
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status == status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TasksStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  async getTaskByID(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Not found the task with ID ${id}`);
    }
    return found;
  }

  // getTaskByID(id: string): Task {
  //   const found = this.tasks.find((task) => task.id == id);
  //   if (!found) {
  //     throw new NotFoundException(`Not found the task with ID ${id}`);
  //   }
  //   return found;
  // }
  // /*  deleteATask(id: string): Task {
  //   let removeIndex = -1;
  //   let removedTask;
  //   this.tasks.find((task, index) => {
  //     if (id == task.id) {
  //       removeIndex = index;
  //       removedTask = task;
  //       return true;
  //     }
  //   });
  //   this.tasks.splice(removeIndex, 1);
  //   return removedTask;
  // } */
  // deleteATask(id: string): void {
  //   const found = this.getTaskByID(id);
  //   this.tasks = this.tasks.filter((task) => task.id != found.id);
  // }
  // updateTaskStatus(id: string, status: TasksStatus): Task {
  //   // Relative to "address" of an object
  //   const task = this.getTaskByID(id);
  //   task.status = status;
  //   return task;
  // }
}
