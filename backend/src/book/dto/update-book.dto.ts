import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty({ message: 'ID cannot be empty' })
  id: number;
  @IsNotEmpty({ message: 'Book name cannot be empty' })
  name: string;
  @IsNotEmpty({ message: 'Author cannot be empty' })
  author: string;
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;
  @IsNotEmpty({ message: 'Cover cannot be empty' })
  cover: string;
}
