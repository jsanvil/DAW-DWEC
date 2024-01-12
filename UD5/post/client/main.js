const SERVER = 'http://localhost:3000/';
const USERS_PATH = 'users/';

const USERS_ROUTE = SERVER + USERS_PATH;

const USERS_SEARCH_NAME_LIKE = 'name_like';

const createForm = document.getElementById("create-user");
const searchForm = document.getElementById("search-user");
const deleteForm = document.getElementById("delete-user");

const loader = document.querySelector('.loader');

function toggleLoader(show) {
  loader.style.display = show ? 'inline-block' : 'none';
}

toggleLoader(false)

createForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };

  createUser(userData);
});

// ================= SEARCH =================

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchParam = document.getElementById("search-name").value;
  
  toggleLoader(true)
  fetch(`${USERS_ROUTE}?name_like=${searchParam}`)
    .then((response) => {
      if (!response.ok) {
        throw "Error al buscar " + searchParam;
        return;
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("users").innerHTML = "<h2>Users</h2>";
      data.reverse().forEach((user) => {
        document.getElementById("users").innerHTML += `
            <div id="user-${user.id}" class="user">http://localhost:3000/
            <span>id: ${user.id}</span> -
            <span class="user-name">name: ${user.name}</span> -
            <span class="user-email">email: ${user.email}</span>
          </div>
          <hr>
            `;
      });
    })
    .finally(() => toggleLoader(false));
});

// ================= DELETE =================

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const deleteID = document.getElementById("delete-id").value;

  toggleLoader(true)
  fetch(`${USERS_ROUTE}${deleteID}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw "Error al borar el usuario con ID: " + deleteID;
      }
      return response.json();
    })
    .then((data) => {
      render(data);
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => toggleLoader(false));
});

// ================= CREATE =================

function createUser(userData) {
  toggleLoader(true)
  fetch(`${USERS_ROUTE}`, {
    // Tipo de petición
    method: "POST",
    // Convertir el objeto a una cadena de texto JSON para enviarlo en el cuerpo de la petición
    body: JSON.stringify(userData),
    // En Content-type indicamos el formato en el que se envía la información
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      getUsers();
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => toggleLoader(false));
}

getUsers();

// ================= GET USERS =================

function getUsers() {
  toggleLoader(true)
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      render(data);
    })
    .finally(() => toggleLoader(false));
}

function render(userList) {
  document.getElementById("users").innerHTML = "<h2>Users</h2>";
  userList.reverse().forEach((user) => {
    document.getElementById("users").innerHTML += `
        <div id="user-${user.id}" class="user">
        <span>id: ${user.id}</span> -
        <span class="user-name">name: ${user.name}</span> -
        <span class="user-email">email: ${user.email}</span>
      </div>
      <hr>
    `;
  });
}
