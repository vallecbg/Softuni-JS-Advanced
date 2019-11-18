import {
    get,
    post,
    put,
    del
} from "./requester.js";

const html = {
    'getAllBooks': () => document.getElementById("all-books"),

    'getBookTitle': () => document.getElementById("title"),
    'getBookAuthor': () => document.getElementById("author"),
    'getBookIsbn': () => document.getElementById("isbn"),

    'getEditTitle': () => document.getElementById("edit-title"),
    'getEditAuthor': () => document.getElementById("edit-author"),
    'getEditIsbn': () => document.getElementById("edit-isbn"),
    'getEditId': () => document.getElementById("edit-id"),
}

const actions = {
    'load-books': async function () {
        try {
            const books = await get("appdata", "books");
            const booksContainer = html.getAllBooks();
            const fragment = document.createDocumentFragment();

            books.forEach(b => {
                const tr = document.createElement("tr");
                const titleTd = document.createElement("td");
                const authorTd = document.createElement("td");
                const isbnTd = document.createElement("td");
                const actionsTd = document.createElement("td");

                const editBtn = document.createElement("button");
                const deleteBtn = document.createElement("button");

                titleTd.textContent = b.title;
                authorTd.textContent = b.author;
                isbnTd.textContent = b.isbn;

                editBtn.textContent = "Edit";
                editBtn.id = b._id;
                editBtn.addEventListener("click", this["edit-book-get"]);

                deleteBtn.textContent = "Delete";
                deleteBtn.id = b._id;
                deleteBtn.addEventListener("click", this["delete-book"]);

                actionsTd.appendChild(editBtn);
                actionsTd.appendChild(deleteBtn);

                tr.append(titleTd, authorTd, isbnTd, actionsTd);

                fragment.appendChild(tr);
            })

            booksContainer.innerHTML = "";
            booksContainer.appendChild(fragment);

        } catch (err) {
            alert(err);
        }
    },
    'create-book': async function () {
        const title = html.getBookTitle();
        const author = html.getBookAuthor();
        const isbn = html.getBookIsbn();

        if (title !== null && author !== null && isbn !== null) {
            const data = {
                title: title.value,
                author: author.value,
                isbn: isbn.value
            };

            try {
                await post("appdata", "books", data);

                title.value = "";
                author.value = "";
                isbn.value = "";

                this["load-books"]();
            } catch (err) {
                alert(err);
            }
        }
    },
    'delete-book': async function () {
        if(confirm("Are you sure you want to delete this book?") === true){
            const id = this.id;

            try{
                const entitiesDeleted = await del("appdata", `books/${id}`);

                actions["load-books"]();
            } catch (err){
                alert(err);
            }
        }
    },
    'edit-book-get': async function () {
        const id = this.id;

        try {
            const singleBook = await get("appdata", `books/${id}`);

            const $id = html.getEditId();
            const title = html.getEditTitle();
            const author = html.getEditAuthor();
            const isbn = html.getEditIsbn();

            $id.value = singleBook._id;
            title.value = singleBook.title;
            author.value = singleBook.author;
            isbn.value = singleBook.isbn;

        } catch (err) {
            alert(err);
        }
    },
    'edit-book-post': async function () {
        const $id = html.getEditId();
        const title = html.getEditTitle();
        const author = html.getEditAuthor();
        const isbn = html.getEditIsbn();
        if (title !== null && author !== null && isbn !== null) {
            const data = {
                title: title.value,
                author: author.value,
                isbn: isbn.value
            };

            try{
                const modifiedBook = await put("appdata", `books/${id.value}`, data);

                $id.value = "";
                title.value = "";
                author.value = "";
                isbn.value = "";

                actions["load-books"]();
            } catch(err){
                alert(err);
            }
        }
    },
}

function handleEvent(e) {
    if (typeof actions[e.target.id] === "function") {
        e.preventDefault();

        actions[e.target.id]();
    }
}

(function attachEvents() {
    document.addEventListener("click", handleEvent);
}())