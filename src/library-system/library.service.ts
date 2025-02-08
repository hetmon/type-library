import { Request } from "express";


type CustomResponse = { message: string, httpStatus: number };
type SuccessResponse = { message: string, httpStatus: number, object: any };
type UnionResponse = CustomResponse | SuccessResponse;
type PartialBook = Partial<Book>;
type NumberOrString = number | string;
type IdOmitBook = Omit<Book, "id">;

type Book = {
    id: number;
    title: string;
    author: string;
    year: number;
};

const books: Book[] = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951 },
    { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
    { id: 7, title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
    { id: 8, title: "Brave New World", author: "Aldous Huxley", year: 1932 },
    { id: 9, title: "Fahrenheit 451", author: "Ray Bradbury", year: 1953 },
    { id: 10, title: "Moby-Dick", author: "Herman Melville", year: 1851 }
];

export function addNewBook(req: Request): UnionResponse {
    const bodyValidation = validateRequestBody(req);
    if (bodyValidation !== null) return bodyValidation;

    const inputValidation = validateBookInput(req.body.title, req.body.author, req.body.year);
    if (inputValidation !== null) return inputValidation;

    const book = buildBook(req.body.title, req.body.author, req.body.year);
    books.push(book);

    return { message: "Book added successfully", httpStatus: 201, object: book };
}


export function updateBook(req: Request): UnionResponse {
    const bodyValidation = validateRequestBody(req);
    if (bodyValidation !== null) return bodyValidation;

    const validateBody = validateBodyData(req.body);
    if (validateBody !== null) return validateBody;

    const bookId = parseInt(req.params.id);
    const book = getBookFromArray(bookId);
    if (book === undefined) return { message: `Book not found with given id: ${bookId}`, httpStatus: 404 };

    Object.assign(book, req.body);
    return { message: "Book updated successfully", httpStatus: 200, object: book };
}

function getBookFromArray(param: NumberOrString): Book | undefined {
    return typeof param === "number" ? books.find((book) => book.id === param)
        : books.find((book) => book.title === param);
}

function validateBodyData(body: PartialBook): CustomResponse | null {
    const allowedKeys = ["title", "author", "year"];
    const bodyKeys = Object.keys(body);

    if (bodyKeys.length > allowedKeys.length) {
        return { message: `There is more data than allowed. Allowed keys: title,author,year`, httpStatus: 400 };
    }

    const invalidKeys = bodyKeys.filter(key => !allowedKeys.includes(key));

    if (invalidKeys.length > 0) {
        return {
            message: `Invalid fields in request: ${invalidKeys.join(", ")}`,
            httpStatus: 400
        };
    }
    return null;
}

function validateRequestBody(req: Request): CustomResponse | null {
    if (!req.body || Object.keys(req.body).length === 0) {
        return { message: "Request body is missing", httpStatus: 400 };
    }
    return null;
}



function validateBookInput(title: string, author: string, year: number): CustomResponse | null {
    if (!title || !author || year === undefined || year === null) {
        return { message: "Missing input data for book. You need to give title, author, year", httpStatus: 400 };
    }
    return null;
}

function buildBook(title: string, author: string, year: number): Book {
    const idOmitBook: IdOmitBook = { title, author, year };
    const book: Book = {
        id: bookIdIncrementer(),
        ...idOmitBook
    }
    return book;
}

function bookIdIncrementer(): number {
    if (books.length === 0) return 1;
    return (books.length - 1) + 1;
}