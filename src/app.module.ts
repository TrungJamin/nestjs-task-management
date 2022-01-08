import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// A module is a schematic
@Module({
  imports: [
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'trungpro123',
      database: 'task-management',
      // In Nestjs, you're gonna define you entities, that is how they translate to database tables
      // and schemas with the help of TypeORM, then it's going to find those entity files and load them for you
      autoLoadEntities: true,
      // Synchronize: true, is going to always keep your database schema in sync.
      synchronize: true,
    }),
  ],
})
export class AppModule {}
