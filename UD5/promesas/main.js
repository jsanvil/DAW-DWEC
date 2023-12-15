// fetch("https://raw.githubusercontent.com/yesinteractive/dadjokes/mater/controllers/jokes.txt")
//   .then(response => response.text())
//   .then(data => {
//     console.log(data)
//     console.log("1. Código asíncrono");
//   })
//   .catch(error => console.error(error))

// console.log("2. Código síncrono")

// function getNumber () {
//   return new Promise((resolve, reject) => {
//     const number = 1 + Math.random() * 10;

//     if (number < 5) {
//       reject({
//         error: true,
//         message: "Suspenso",
//       });
//     }

//     resolve({
//       error: false,
//       value: Math.floor(number),
//     });
//   });
// };

// getNumber()
//   .then((result) => console.log(`Aprobado: ${result.value}`))
//   .catch((error) => console.error(error.message))
//   .finally(() => console.info('Terminado'));

// console.log('Cálculo de calificaciones')

// // Ejemplo sencillo donde se va llenando un array con números aleatorios
// // se aparece un 6 se rechaza la promesa
// const doTask = (iterations) => {
//   return new Promise((resolve, reject) => {
//     const numbers = [];

//     for (let i = 0; i < iterations; i++) {
//       const number = 1 + Math.floor(Math.random() * 6);
//       numbers.push(number);
//       if (number === 6) {
//         reject({
//           error: true,
//           message: "Se ha sacado un 6"
//         });
//       }
//     }

//     resolve({
//       error: false,
//       value: numbers
//     });
//   });  // new Promise
// }; // doTask

// doTask(10)
//   .then(result => console.log("Tiradas correctas: ", result.value))
//   .catch(err => console.error("Ha ocurrido algo: ", err.message));

// const doTask = async (iterations) => {
//   const numbers = [];

//   for (let i = 0; i < iterations; i++) {
//     const number = 1 + Math.floor(Math.random() * 6);
//     numbers.push(number);
//     if (number === 6) {
//       return {
//         error: true,
//         message: "Se ha sacado un 6"
//       };
//     }
//   }

//   return {
//     error: false,
//     value: numbers
//   };
// }

// async function consume() {
//   const result = await doTask(10);
//   if (result.error) {
//       console.log("Error: ", result.message);
//   } else {
//       console.log("Los números son: ", result.value);
//   }
// }

// consume()

const loadingMsg = document.getElementById("catLoading");
const errorMsg = document.getElementById("catError");
loadingMsg.style.display = "block";
errorMsg.style.display = "none";

fetch("https://cataas.com/cat")
  .then((response) => response.blob())
  .then((blob) => {
    const imageUrl = URL.createObjectURL(blob);
    const imageElement = document.getElementById("catImg");
    imageElement.src = imageUrl;
    imageElement.style.display = "block";
  })
  .catch((e) => {
    errorMsg.style.display = "block";
    console.log(e);
  })
  .finally(() => {
    loadingMsg.style.display = "none";
  });
