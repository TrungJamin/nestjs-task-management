import { Task } from './../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // What eager means?
  // When you have a relation, one of the sides of that relation can be eager,
  // when eager is set true, in this case, "User" => that means whenever you retrieve the object
  // from database, whenever you fetch user, we also going to "fetch the tasks" with it.
  // We don't have to manually fetch the tasks in a separate database or a separate line of code or whatever
  // It's automatically going to fetch the tasks as well
  // => That's why it is eager.
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
