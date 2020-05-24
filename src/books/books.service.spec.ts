import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BookRepository } from './book.repository';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorRepository } from '../authors/author.repository';

const mockBookRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createBook: jest.fn(),
  updateBook: jest.fn(),
  delete: jest.fn(),
});

const mockAuthRepository = () => ({
  findOne: jest.fn(),
});

describe('BooksService', () => {
  let service: BooksService;
  let repository;
  let authorRepository;

  const mockId = '5ec7c72bfe20f1427ca1e5b9';
  const mockBook: Book = {
    _id: '5ec7a3e95fa0364a28fa35a7',
    title: 'Test',
    author: '5ec7a3c05fa0364a28fa35a5',
    isbn: '978-1-56619-909-4',
    publishedAt: new Date(1995, 11, 17).toISOString(),
    createdAt: new Date(2020, 5, 23).toISOString(),
    updatedAt: new Date(2020, 5, 23).toISOString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BookRepository, useFactory: mockBookRepository },
        { provide: AuthorRepository, useFactory: mockAuthRepository },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repository = module.get<BookRepository>(BookRepository);
    authorRepository = module.get<AuthorRepository>(AuthorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBooks', () => {
    it('gets all books', async () => {
      repository.find.mockResolvedValue('books');

      expect(repository.find).not.toHaveBeenCalled();
      const query: GetBooksFilterDto = {
        author: '5ec7c72bfe20f1427ca1e5b9',
        title: '',
        isbn: '',
      };
      const result = await service.getBooks(query);
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual('books');
    });
  });

  describe('getBookById', () => {
    it('calls repository.findOne and gets book by id', async () => {
      repository.findOne.mockResolvedValue(mockBook);

      const result = await service.getBookById(mockId);

      expect(repository.findOne).toHaveBeenCalledWith(mockId);
      expect(result).toEqual(mockBook);
    });

    it('throws error if book is not found', () => {
      repository.findOne.mockResolvedValue(null);

      expect(service.getBookById(mockId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createBook', () => {
    const mockCreateBook: CreateBookDto = {
      title: 'Test',
      author: '5ec7a3c05fa0364a28fa35a5',
      isbn: '978-1-56619-909-4',
      publishedAt: new Date(1995, 11, 17).toISOString(),
    };

    it('throws not found exception if author not found', async () => {
      authorRepository.findOne.mockResolvedValue(null);

      expect(repository.createBook).not.toHaveBeenCalled();
      expect(service.createBook).rejects.toThrow(NotFoundException);
    });

    it('calls repository createBook and returns the result if author found', async () => {
      authorRepository.findOne.mockResolvedValue('author');
      repository.createBook.mockResolvedValue('newBook');

      expect(repository.createBook).not.toHaveBeenCalled();
      const result = await service.createBook(mockCreateBook);
      expect(repository.createBook).toHaveBeenCalled();
      expect(result).toEqual('newBook');
    });
  });

  describe('updateBook', () => {
    const updateBookDto: UpdateBookDto = {
      title: 'Updated',
      author: '',
      isbn: '',
      publishedAt: '',
    };

    it('throws not found exception if author not found', async () => {
      authorRepository.findOne.mockResolvedValue(null);

      expect(repository.updateBook).not.toHaveBeenCalled();
      expect(service.updateBook).rejects.toThrow(NotFoundException);
    });

    it('throws not found exception if book is not found', async () => {
      authorRepository.findOne.mockResolvedValue('author');
      service.getBookById = jest.fn().mockResolvedValue(null);

      expect(service.updateBook).rejects.toThrow(NotFoundException);
    });

    it('calls repository.updateBook with provided id and data', async () => {
      authorRepository.findOne.mockResolvedValue('author');
      service.getBookById = jest.fn();
      await service.updateBook(mockId, updateBookDto);
      expect(repository.updateBook).toHaveBeenCalledWith(mockId, updateBookDto);
    });
  });

  describe('deleteBook', () => {
    it('calls repository.delete with provided id', async () => {
      await service.deleteBook(mockId);
      expect(repository.delete).toHaveBeenCalledWith(mockId);
    });
  });
});
