import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './author.entity';
import { GetAuthorsFilterDto } from './dto/get-authors-filter.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { IdParamDto } from '../dto/id-param.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAuthors(
    @Query(ValidationPipe) getAuthorsFilterDto: GetAuthorsFilterDto,
  ): Promise<Author[]> {
    return this.authorsService.getAuthors(getAuthorsFilterDto);
  }

  @Get('/:id')
  getAuthorById(
    @Param(ValidationPipe) idParamDto: IdParamDto,
  ): Promise<Author> {
    return this.authorsService.getAuthorById(idParamDto.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Patch('/:id')
  updateAuthor(
    @Param(ValidationPipe) idParamDto: IdParamDto,
    @Body(ValidationPipe) updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.updateAuthor(idParamDto.id, updateAuthorDto);
  }

  @Delete('/:id')
  deleteAuthor(@Param(ValidationPipe) idParamDto: IdParamDto): Promise<void> {
    return this.authorsService.deleteAuthor(idParamDto.id);
  }
}
