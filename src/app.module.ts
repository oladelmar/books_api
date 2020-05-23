import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { typeOrmConfig } from './config/dev.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthorsModule, BooksModule],
})
export class AppModule {}
