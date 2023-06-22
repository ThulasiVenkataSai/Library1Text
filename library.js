let inputEl = document.getElementById("searchInput");
let itemEl = document.getElementById("resultitems");
let loadingEl = document.getElementById("spinner");
let outputEl = document.getElementById("outputtext");

function displayResults(search) {
    loadingEl.classList.add("d-none");
    let {
        imageLink,
        author
    } = search;
    console.log(imageLink);
    console.log(author);
    let liEl = document.createElement("li");
    liEl.classList.add("items", "col-12", "col-md-6", "text-center");
    let imgEl = document.createElement("img");
    imgEl.src = imageLink;
    imgEl.classList.add("imgstyling", "w-50");
    let authorEl = document.createElement("p");
    authorEl.textContent = author;
    authorEl.classList.add("authorname");
    console.log(liEl);
    liEl.appendChild(imgEl);
    liEl.appendChild(authorEl);
    itemEl.appendChild(liEl);

}

function displayitems(search_results) {
    for (let search of search_results) {
        displayResults(search);
    }
}

function fetchitems() {

    let input = inputEl.value;
    let url = "https://apis.ccbp.in/book-store?title=" + input;
    let options = {
        method: "GET",
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            let {
                search_results
            } = jsonData;
            if (search_results.length === 0) {
                outputEl.textContent = "No results found"
            } else {
                outputEl.textContent = "Popular Books";
                displayitems(search_results);
            }
        });
}

function searchitems(event) {
    loadingEl.classList.add("d-none");
    if (event.key === "Enter") {
        loadingEl.classList.remove("d-none");
        fetchitems();
    }
}
inputEl.addEventListener("keydown", searchitems);
let books = [];

function addBook(book) {
    let table = document.getElementById("bookTable");
    table.append(`
    <tr id="${book.id}">
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.genre}</td>
    <td>${book.year}</td>
    <td>${book.quantity}</td>
    <td><button class="btn btn-sm btn-warning editBtn" data-id="${book.id}"> Edit </button></td>
    <td><button class="btn btn-sm btn-danger deleteBtn" data-id="${book.id}"> Delete </button></td>
    `);
}

function clearForm() {
    $("#bookTitle").val("");
    $("#author").val("");
    $("#genre").val("");
    $("#year").val("");
    $("#quantity").val("");

}

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

$(document).on("click", "#clearBtn", function() {
    clearForm();
});

$("#bookForm").submit(function(e) {
    e.preventDefault();

    let book = {
        id: generateId(),
        title: $("#bookTitle").val(),
        author: $("#author").val(),
        genre: $("#genre").val(),
        year: $("#year").val(),
        quantity: $("#quantity").val(),
    };

    books.push(book);
    addBook(book);

    clearForm();
});

$("#editForm").submit(function(e) {
    e.preventDefault();

    let bookId = $("#editBookId").val();
    let bookIndex = books.findIndex((book) => book.id === bookId);
    let book = books[bookIndex];

    book.title = $("#editBookTitle").val();
    book.author = $("#editAuthor").val();
    book.genre = $("#editGenre").val();
    book.year = $("#editYear").val();
    book.quantity = $("#editQuantity").val();
    let row = $(`#${book.id}`);
    row.find("td:eq(0)").text(book.title);
    row.find("td:eq(1)").text(book.author);
    row.find("td:eq(2)").text(book.genre);
    row.find("td:eq(3)").text(book.year);
    row.find("td:eq(4)").text(book.quantity);
});

let row = $(`#${book.id}`);
row.find("td:eq(0)").text(book.title);
row.find("td:eq(1)").text(book.author);
row.find("td:eq(2)").text(book.genre);
row.find("td:eq(3)").text(book.year);
row.find("td:eq(4)").text(book.quantity);

$(document).on("click", ".editBtn", function() {

    let bookId = $(this).data("id");

    let bookIndex = books.findIndex((book) => book.id === bookId);
    let book = books[bookIndex];

    $("#editbookTitle").val(book.title);
    $("#editauthor").val(book.author);
    $("#edityear").val(book.year);
    $("#editquantity").val(book.quantity);
    $("#editBookId").val(book.id);

    $("#editModal").modal("show");
});