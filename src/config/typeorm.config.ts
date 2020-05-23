import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Author } from '../authors/author.entity';
import { Book } from '../books/book.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  synchronize: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [Author, Book],
};
