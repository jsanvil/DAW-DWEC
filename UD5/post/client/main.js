const form = document.getElementById("create-user");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };

  createUser(userData);
});

function createUser(userData) {
  fetch("http://localhost:3000/users", {
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
    });
}

getUsers();

// obtiene y presenta la lista de usuarios
function getUsers() {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("users").innerHTML = "<h2>Users</h2>";
      data.reverse().forEach((user) => {
        document.getElementById("users").innerHTML += `
        <div id="user-${user.id}" class="user">
        <span>id: ${user.id}</span> -
        <span class="user-name">name: ${user.name}</span> -
        <span class="user-email">email: ${user.email}</span>
      </div>
      <hr>
        `;
      });
    });
}