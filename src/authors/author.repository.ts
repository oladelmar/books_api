import { Repository, EntityRepository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { firstName, lastName, birthday } = createAuthorDto;
    const author = this.create({
      firstName,
      lastName,
      birthday,
    });

    await this.save(author);
    return author;
  }

  async updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto) {
    const updatedAt = new Date().toISOString();
    const toBeUpdated = { ...updateAuthorDto, updatedAt };
    await this.update(id, toBeUpdated);
  }
}
