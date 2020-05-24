import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { AuthorRepository } from './author.repository';
import { GetAuthorsFilterDto } from './dto/get-authors-filter.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './author.entity';
import { UpdateAuthorDto } from './dto/update-author.dto';

const mockAuthorRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createAuthor: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repository;

  const mockId = '5ec7c72bfe20f1427ca1e5b9';
  const mockAuthor: Author = {
    _id: '5ec7a3c05fa0364a28fa35a5',
    firstName: 'Ernest',
    lastName: 'Hemingway',
    birthday: new Date(1899, 7, 21).toISOString(),
    createdAt: new Date(2020, 5, 23).toISOString(),
    updatedAt: new Date(2020, 5, 23).toISOString(),
  };
  const mockCreateAuthor: CreateAuthorDto = {
    firstName: 'Ernest',
    lastName: 'Hemingway',
    birthday: new Date(1899, 7, 21).toISOString(),
  };
  const mockUpdateAuthor: UpdateAuthorDto = {
    firstName: 'Updated',
    lastName: 'Updated',
    birthday: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        { provide: AuthorRepository, useFactory: mockAuthorRepository },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repository = module.get<AuthorRepository>(AuthorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAuthors', () => {
    it('gets all authors', async () => {
      repository.find.mockResolvedValue('authors');

      expect(repository.find).not.toHaveBeenCalled();
      const query: GetAuthorsFilterDto = {
        firstName: '',
        lastName: 'Hemingway',
      };
      const result = await service.getAuthors(query);
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual('authors');
    });
  });

  describe('getAuthorById', () => {
    it('calls repository.findOne and gets author by id', async () => {
      repository.findOne.mockResolvedValue(mockAuthor);

      const result = await service.getAuthorById(mockId);

      expect(repository.findOne).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockAuthor);
    });

    it('throws error if author is not found', () => {
      repository.findOne.mockResolvedValue(null);

      expect(service.getAuthorById(mockId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createAuthor', () => {
    it('calls repository createAuthor and returns the result', async () => {
      repository.createAuthor.mockResolvedValue('newAuthor');

      expect(repository.createAuthor).not.toHaveBeenCalled();
      const result = await service.createAuthor(mockCreateAuthor);
      expect(repository.createAuthor).toHaveBeenCalled();
      expect(result).toEqual('newAuthor');
    });
  });

  describe('updateAuthor', () => {
    it('throws error if author is not found', async () => {
      service.getAuthorById = jest.fn().mockResolvedValue(null);
      expect(service.updateAuthor).rejects.toThrow(NotFoundException);
    });

    it('if author is found, calls repository.save', async () => {
      service.getAuthorById = jest
        .fn()
        .mockResolvedValue({ firstName: 'First', lastName: 'Last' });
      await service.updateAuthor(mockId, mockUpdateAuthor);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('deleteAuthor', () => {
    it('calls repository.delete with provided id', async () => {
      await service.deleteAuthor(mockId);
      expect(repository.delete).toHaveBeenCalledWith(mockId);
    });
  });
});
