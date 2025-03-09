import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Book name cannot be empty' })
  name: string;
  @IsNotEmpty({ message: 'Author cannot be empty' })
  author: string;
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;
  @IsNotEmpty({ message: 'Cover cannot be empty' })
  cover: string;
}
