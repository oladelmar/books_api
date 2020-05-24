# Books Sample API

## Description

A sample Node/NestJS/MongoDB REST API for books

## Getting Started

Create a .env file in the root directory and your Mongo URL (and optionally port) there

```bash
DATABASE_URL=your_mongo_url_here
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

# API Endpoints

## Get Authors [GET /authors]

- Request: Get all authors

* Response: 200

  - Body

    []

## Get Author By Id [GET /authors/:id]

- Request: Get author by id

- Parameters

  - id: MongoDB id - Unique identifier of the author

* Response: 200

  - Body

        {
          "_id": "",
          "firstName": "",
          "lastName": "",
          "birthday": "",
          "createdAt": "",
          "updatedAt": ""
        }

## Create Author [POST /authors]

- Request: Create new author

  Content-type: application/json

  - Body

        {
          "firstName": "",
          "lastName": "",
          "birthday": ""
        }

- Response: 201

  - Body

        {
          "firstName": "",
          "lastName": "",
          "birthday": "",
          "createdAt": "",
          "updatedAt": "",
          "_id": ""
        }

## Update Author [PATCH /authors/:id]

- Request: Update existing author

  - Parameters

    - id: MongoDB id - Unique identifier of the author

  Content-type: application/json

  - Body

        {
          "firstName": "",
          "lastName": "",
          "birthday": ""
        }

- Response: 200

- Body

        {
          "_id": "",
          "firstName": "",
          "lastName": "",
          "birthday": "",
          "createdAt": "",
          "updatedAt": ""
        }

## Delete Author [DELETE /authors/:id]

- Request: Delete existing author

  - Parameters

    - id: MongoDB id - Unique identifier of the author

* Response: 200

## Get All Books [GET /books]

- Request: Get all books

* Response: 200

  - Body

    []

## Get Books By Author (and/or ISBN and/or title) [GET /books?author=mongodb_id&isbn=book_isbn&title=book_title]

- Request: Get all books for a particular author

- Query:
  - mongodb_id: MongoDB id of the author
  - book_isbn: ISBN to look for
  - book_title: Complete book title to look for

* Response: 200

  - Body

    []

## Get Book By Id [GET /books/:id]

- Request: Get book by id

- Parameters

  - id: MongoDB id - Unique identifier of the book

* Response: 200

  - Body

        {
          "_id": "",
          "title": "",
          "author": "",
          "isbn": "",
          "publishedAt": "",
          "createdAt": "",
          "updatedAt": ""
        }

## Create Book [POST /books]

- Request: Create new book

  Content-type: application/json

  - Body

        {
          "title": "",
          "author": "",
          "isbn": "",
          "publishedAt": ""
        }

- Response: 201

  - Body

        {
          "title": "",
          "author": "",
          "isbn": "",
          "publishedAt": "",
          "createdAt": "",
          "updatedAt": "",
          "_id": ""
        }

## Update Book [PATCH /books/:id]

- Request: Update existing book

  - Parameters

    - id: MongoDB id - Unique identifier of the book

  Content-type: application/json

  - Body

        {
          "title": "",
          "author": "",
          "isbn": "",
          "publishedAt": ""
        }

- Response: 200

  - Body

        {
          "_id": "",
          "title": "",
          "author": "",
          "isbn": "",
          "publishedAt": "",
          "createdAt": "",
          "updatedAt": ""
        }

## Delete Book [DELETE /books/:id]

- Request: Delete existing book

  - Parameters

    - id: MongoDB id - Unique identifier of the book

- Response: 200
