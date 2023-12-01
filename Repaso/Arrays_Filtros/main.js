const btn_sort_name_asc = document.getElementById('sort_name_asc')
const btn_sort_name_des = document.getElementById('sort_name_des')

btn_sort_name_asc.addEventListener('click', sortByNameAsc)
btn_sort_name_des.addEventListener('click', sortByNameDes)

function sortByNameAsc() {
  comida.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre)
  })

  printAllItems(comida)
}

function sortByNameDes() {
  comida.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre)
  })
  printAllItems(comida.reverse())
}

const comida = [
  {
    id: 1,
    categoria: "fruta",
    nombre: "manzana",
    precio: 4.8,
    emoji: "🍎",
  },
  {
    id: 2,
    categoria: "verdura",
    nombre: "berenjena",
    precio: 2.4,
    emoji: "🍆",
  },
  {
    id: 3,
    categoria: "fruta",
    nombre: "kiwi",
    precio: 7.3,
    emoji: "🥝",
  },
  {
    id: 4,
    categoria: "verdura",
    nombre: "pepino",
    precio: 1.3,
    emoji: "🥒",
  },
  {
    id: 5,
    categoria: "pescado",
    nombre: "lubina",
    precio: 23.43,
    emoji: "🐟",
  },
  {
    id: 6,
    categoria: "pescado",
    nombre: "pulpo",
    precio: 67.89,
    emoji: "🐙",
  },
  {
    id: 7,
    categoria: "carne",
    nombre: "ternera gallega",
    precio: 9.9,
    emoji: "🐄",
  },
];

let getString = (item) => {
  return `id: ${item.id}
    categoría: ${item.categoria}
    nombre:    ${item.nombre}
    precio:    ${item.precio} €/kg
    emoji:     ${item.emoji}`;
};

let printAllItems = (array) => {
  array.forEach((item) => {
    document.body.innerHTML += getString(item) + "<br>";
  });
};

let filterCategory = (array, categoria) => {
  return comida.filter((item) => {
    return item.categoria === categoria;
  });
};

//printAllItems(comida);

let sortByPrice = (array) => {
  return array.sort((i1, i2) => i1.precio - i2.precio);
};

//printAllItems(filterCategory(comida, "verdura"))

//printAllItems(sortByPrice(comida));



// let getCategories = (array) => {
//   let categorias = array.map((item) => item.categoria);
//   return Array.from(new Set(categorias));
// };

// console.log(getCategories(comida));

// let printByCategory = (array) => {
//   getCategories(comida).forEach((categoria) => {
//     document.body.innerHTML += "<p>" + categoria + "</p>";
//     printAllItems(filterCategory(comida, categoria));
//   });
// };

// printByCategory(comida);
