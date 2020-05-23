import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @ObjectIdColumn()
  _id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({
    unique: true,
  })
  isbn: string;

  @Column()
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
