import { User } from './../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TasksStatus } from './task-status.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TasksStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  // "toPlainOnly: true" means whenever we print that object into plaintext, I want to "exclude" that user property
  // whenever you send a response in JSON.
  @Exclude({ toPlainOnly: true })
  user: User;
}
