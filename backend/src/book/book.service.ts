import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly dbService: DbService) {}

  async list() {
    return await this.dbService.read();
  }
  async findById(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find((book) => book.id === id);
  }
  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    const foundBook = books.find((book) => book.name === createBookDto.name);
    if (foundBook) {
      throw new BadRequestException('Book already exists');
    }
    books.push({
      id: books.length + 1,
      ...createBookDto,
    });
    await this.dbService.write(books);
    return {
      code: 200,
      message: 'Created successfully',
    };
  }
  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((book) => book.id === updateBookDto.id);
    books[index] = {
      ...books[index],
      ...updateBookDto,
    };
    await this.dbService.write(books);
    return {
      code: 200,
      message: 'Updated successfully',
    };
  }
  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((book) => book.id === id);
    books.splice(index, 1);
    await this.dbService.write(books);
    return {
      code: 200,
      message: 'Deleted successfully',
    };
  }
}
