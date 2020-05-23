import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookRepository } from './book.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
    return await this.bookRepository.find(filterDto);
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id "${id}" not found`);
    }
    return book;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.createBook(createBookDto);
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<void> {
    if (!Object.entries(updateBookDto).length) {
      throw new BadRequestException('No data provided for update');
    }
    await this.getBookById(id);
    await this.bookRepository.updateBook(id, updateBookDto);
  }

  async deleteBook(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
