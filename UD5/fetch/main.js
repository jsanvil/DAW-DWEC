const SERVER = "https://sonplaceholder.typicode.com";

const form = document.getElementById("form-user-posts");
const errorMessage = document.getElementById("error-message");
const userPosts = document.getElementById("user-posts");
const postTbody = document.querySelector("tbody");

hideError();
userPosts.style.display = "none";

form.addEventListener("submit", (event) => {
  // evitamos que se envíe el formulario y se recargue la página
  event.preventDefault();

  // ocultamos el mensaje de error y la tabla de posts
  userPosts.style.display = "none";
  hideError();

  // obtenemos el id del usuario
  let inputIdUser = event.target["user-id"];
  let idUser = inputIdUser.value;

  // comprobamos que el id sea un número
  if (isNaN(idUser) || idUser.trim() == "") {
    showError("Debes introducir un número");
  } else {
    // creamos la petición GET para obtener los posts del usuario
    fetch(SERVER + "/posts?userId=" + idUser)
      // convertimos la respuesta de texto a objeto
      // en este caso, la respuesta es un array de posts
      .then((response) => {
        if (!response.ok) {
          // lanzamos un error que interceptará el .catch()
          throw `Error ${response.status} de la BBDD: ${response.statusText}`
        } 
        return response.json()  // devolvermos la promesa que hará el JSON.parse          
      })
      // en posts tenemos un array con los posts del usuario
      .then((posts) => {
        // mostramos los posts en la tabla
        postTbody.innerHTML = "";

        // si no hay posts, mostramos un mensaje de error
        if (posts.length == 0) {
          showError("No hay posts para este usuario");
        }
        else {
          // mostramos los posts en la tabla
          posts.forEach((post) => {
            const newPost = document.createElement("tr");
            newPost.innerHTML = `
                  <td>${post.userId}</td>
                  <td>${post.id}</td>
                  <td>${post.title}</td>
                  <td>${post.body}</td>`;
            postTbody.appendChild(newPost);
          });

          // mostramos el número de posts
          document.getElementById("num-posts").textContent = posts.length;

          // por último, mostramos el resultado
          userPosts.style.display = "block";
        }
      })
      .catch((error) => showError(error));
  }

  // devolvemos el foco al input y seleccionamos su contenido
  inputIdUser.focus();
  inputIdUser.select();
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
  errorMessage.style.display = "inline-block";
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}