import { Author } from 'src/authors/author.entity';
import { Book } from 'src/books/book.entity';

export const config = () => ({
  database: {
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [Author, Book],
  },
});
