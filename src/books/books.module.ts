import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { AuthorRepository } from 'src/authors/author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository, AuthorRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
