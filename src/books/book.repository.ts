import { Book } from './book.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, isbn, publishedAt } = createBookDto;

    const book = this.create({
      title,
      author,
      isbn,
      publishedAt,
    });

    try {
      await this.save(book);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('ISBN already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return book;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<void> {
    const updatedAt = new Date().toISOString();
    const toBeUpdated = { ...updateBookDto, updatedAt };
    try {
      await this.update(id, toBeUpdated);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('ISBN already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
