import { User } from './../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// To make that an actual repository that TypeORM can work with, we need to decorate it with
// @EntityRepository,  provide "Task" => @EntityRepository(Task) to tell TypeORM this is going to be a repository
// of Task
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(
    getTasksFilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = getTasksFilterDto;

    // Whenever we mentioned 'task' in query pipe, TypeORM knows i refer to the "task entity"
    const query = this.createQueryBuilder('task');

    // query.where('task.user.id = :id', { id: user.id });

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        // There's a bug here, fixed by adding "( & )"
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = query.getMany();

    return tasks;
  }

  async createATask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    let task = this.create({
      title: title,
      description: description,
      status: TasksStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  }
}
