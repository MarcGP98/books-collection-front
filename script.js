const API_URL = "http://localhost:3000";

const btnUsers = document.getElementById("btnUsers");
const btnBooks = document.getElementById("btnBooks");
const container = document.getElementById("container");

btnUsers.addEventListener("click", getUsers);
btnBooks.addEventListener("click", getBooks);

function showLoading() {
  container.innerHTML = "<p>Cargando...</p>";
}

function showError(message) {
  container.innerHTML = `<p style="color:red;">${message}</p>`;
}

async function getUsers() {
  showLoading();

  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Error obteniendo usuarios");

    const users = await res.json();
    renderUsers(users);
  } catch (error) {
    showError("No se pudieron cargar los usuarios");
  }
}

function renderUsers(users) {
  container.innerHTML = "";

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "card";

    const collectionList = user.coleccion
      .map((book) => `<div class="list-item">${book}</div>`)
      .join("");

    const wishlistList = user.wishlist
      .map((book) => `<div class="list-item">${book}</div>`)
      .join("");

    card.innerHTML = `
      <h2>${user.nombre} ${user.apellidos}</h2>
      <p>Email: ${user.correo}</p>

      <div class="list">
        <h3>Colección:</h3>
        ${collectionList}
      </div>

      <div class="list">
        <h3>Wishlist:</h3>
        ${wishlistList}
      </div>
    `;

    container.appendChild(card);
  });
}

async function getBooks() {
  showLoading();

  try {
    const res = await fetch(`${API_URL}/books`);
    if (!res.ok) throw new Error("Error obteniendo libros");

    const books = await res.json();
    renderBooks(books);
  } catch (error) {
    showError("No se pudieron cargar los libros");
  }
}

function renderBooks(books) {
  container.innerHTML = "";

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${book.titulo}</h2>
      <img src="${book.imagen}" alt="${book.titulo}" />
      <p>Autor: ${book.autor}</p>
      <p>Fecha de publicación: ${book.fechaPublicacion}</p>
    `;

    container.appendChild(card);
  });
}