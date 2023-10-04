/*
función generarTabla():

- Lea los valores de los <input> de 'table_x' y 'table_y'
- Cree una tabla de table_x filas y table_y columnas dentro del <div> 'tabla'
- Cada celda de la tabla tendrá un un id 'celda_x_y'
  donde x es el número de fila y y el número de columna.
El texto del <span> será 'x,y'.
*/

function generarTabla() {
    let x = document.getElementById('table_x').value;
    let y = document.getElementById('table_y').value;
    
    let newTable = document.createElement('table');

    for (let j=0; j<y; j++) {

        let newTr = document.createElement('tr');

        for(let i=0; i<x; i++) {

            let newTd = document.createElement('td');
            newTr.appendChild(newTd);
            
        }

        newTable.appendChild(newTr);

    }

    let divTabla = document.getElementById('tabla');
    divTabla.appendChild(newTable);

}