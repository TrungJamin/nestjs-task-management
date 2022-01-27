import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

// A module is a schematic
@Module({
  imports: [
    // We need the ConfigModule to finish its initialization and be available before we're able to use Dependency Injection
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // => This means it depends on the ConfigModule, so NestJs will wait for the ConfigModule to finish
      // its initialization because we've defined it here as a dependency.
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          // secure connection
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),

    /*  TypeOrmModule.forRoot({
      type: 'postgres',
     
      // In Nestjs, you're gonna define you entities, that is how they translate to database tables
      // and schemas with the help of TypeORM, then it's going to find those entity files and load them for you
      autoLoadEntities: true,
      // Synchronize: true, is going to always keep your database schema in sync.
      synchronize: true,
    }), */
  ],
})
export class AppModule {}
