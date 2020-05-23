import { Book } from './book.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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

    await this.save(book);
    return book;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<void> {
    const updatedAt = new Date().toISOString();
    const toBeUpdated = { ...updateBookDto, updatedAt };
    await this.update(id, toBeUpdated);
  }
}
