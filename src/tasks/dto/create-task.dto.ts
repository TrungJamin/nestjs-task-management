import { IsNotEmpty } from 'class-validator';
// Understand the problem, why should we use DTO

// Notice how many times we refer to the properties of a task within our code.
// Both in the controller and the service, just in order to retrieve the title and description
// So software changes all the time.
// Imagine a situation where we need to make changes to the shape of data.
// - Maybe at some point we need to change the types of those parameters.
// - Maybe as requirements change, we need to add additional information to tasks.
// To apply such change, we will have to change the implementation in multiple places.
// This adds complexity to our application and makes it more difficult to scale it.
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
