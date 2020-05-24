import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IdParamDto } from '../dto/id-param.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(
    @Query(ValidationPipe) filterDto: GetBooksFilterDto,
  ): Promise<Book[]> {
    return this.booksService.getBooks(filterDto);
  }

  @Get('/:id')
  getBookById(@Param(ValidationPipe) idParamDto: IdParamDto): Promise<Book> {
    return this.booksService.getBookById(idParamDto.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Patch('/:id')
  updateBook(
    @Param(ValidationPipe) idParamDto: IdParamDto,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(idParamDto.id, updateBookDto);
  }

  @Delete('/:id')
  deleteBook(@Param(ValidationPipe) idParamDto: IdParamDto): Promise<Book> {
    return this.booksService.deleteBook(idParamDto.id);
  }
}
