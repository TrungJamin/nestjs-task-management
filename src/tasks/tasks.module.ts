import { AuthModule } from './../auth/auth.module';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
  // Because the controller is defined in this module and then the service
  // is defined as a provider in this module which allows the service to "be injected"
})
export class TasksModule {}
