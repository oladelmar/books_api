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
import { AuthorRepository } from '../authors/author.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    @InjectRepository(AuthorRepository)
    private bookRepository: BookRepository,
    private authorRepository: AuthorRepository,
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
    const author = await this.authorRepository.findOne(createBookDto.author);
    if (!author) {
      throw new NotFoundException(
        `Author with id "${createBookDto.author}" not found`,
      );
    }
    return this.bookRepository.createBook(createBookDto);
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    if (!updateBookDto || !Object.entries(updateBookDto).length) {
      throw new BadRequestException('No data provided for update');
    }
    if (updateBookDto.author) {
      const author = await this.authorRepository.findOne(updateBookDto.author);
      if (!author) {
        throw new NotFoundException(
          `Author with id "${updateBookDto.author}" not found`,
        );
      }
    }
    const book = await this.getBookById(id);
    const updatedBook = { ...book, ...updateBookDto };
    return await this.bookRepository.updateBook(updatedBook);
  }

  async deleteBook(id: string): Promise<Book> {
    const book = await this.getBookById(id);
    return await this.bookRepository.remove(book);
  }
}
