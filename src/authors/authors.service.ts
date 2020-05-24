import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorRepository } from './author.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { GetAuthorsFilterDto } from './dto/get-authors-filter.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  async getAuthors(
    getAuthorsFilterDto: GetAuthorsFilterDto,
  ): Promise<Author[]> {
    return await this.authorRepository.find(getAuthorsFilterDto);
  }

  async getAuthorById(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new NotFoundException(`Author with the id "${id}" not found`);
    }

    return author;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorRepository.createAuthor(createAuthorDto);
  }

  async updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    if (!updateAuthorDto || !Object.entries(updateAuthorDto).length) {
      throw new BadRequestException('No data provided for update');
    }
    const author = await this.getAuthorById(id);
    const updatedAuthor = { ...author, ...updateAuthorDto };
    return await this.authorRepository.save(updatedAuthor);
  }

  async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
