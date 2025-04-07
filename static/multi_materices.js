function generarMatrices() {
    console.log("Generando matrices...");
    let filas1 = parseInt(document.getElementById("filas1").value);
    let columnas1 = parseInt(document.getElementById("columnas1").value);
    let filas2 = parseInt(document.getElementById("filas2").value);
    let columnas2 = parseInt(document.getElementById("columnas2").value);
    let matricesDiv = document.getElementById("matrices");
    matricesDiv.innerHTML = '';

    if (filas1 <= 0 || columnas1 <= 0 || filas2 <= 0 || columnas2 <= 0) {
        alert("Ingrese valores válidos para filas y columnas");
        return;
    }

    if (columnas1 != filas2) {
        alert("El número de columnas de la primera matriz debe coincidir con el número de filas de la segunda matriz para realizar la multiplicación.");
        return;
    }


    // Generar la primera matriz
    let matriz1Div = document.createElement("div");
    matriz1Div.className = "matriz";
    matriz1Div.style.display = "grid";
    matriz1Div.style.gridTemplateColumns = `repeat(${columnas1}, auto)`;

    for (let f = 0; f < filas1; f++) {
        for (let c = 0; c < columnas1; c++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.className = `matriz1`;
            matriz1Div.appendChild(input);
        }
    }
    matricesDiv.appendChild(matriz1Div);

    // Generar la segunda matriz
    let matriz2Div = document.createElement("div");
    matriz2Div.className = "matriz";
    matriz2Div.style.display = "grid";
    matriz2Div.style.gridTemplateColumns = `repeat(${columnas2}, auto)`;

    for (let f = 0; f < filas2; f++) {
        for (let c = 0; c < columnas2; c++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.className = `matriz2`;
            matriz2Div.appendChild(input);
        }
    }
    matricesDiv.appendChild(matriz2Div);
}

function multiplicarMatrices() {
    let filas1 = document.getElementById("filas1").value;
    let columnas1 = document.getElementById("columnas1").value;
    let filas2 = document.getElementById("filas2").value;
    let columnas2 = document.getElementById("columnas2").value;

    filas1 = parseInt(filas1);
    columnas1 = parseInt(columnas1);
    filas2 = parseInt(filas2);
    columnas2 = parseInt(columnas2);

    let matriz1 = [];
    let matriz2 = [];

    // Obtener valores de la primera matriz
    let inputsMatriz1 = document.querySelectorAll('.matriz1');
    for (let i = 0; i < filas1; i++) {
        let fila = [];
        for (let j = 0; j < columnas1; j++) {
            let value = parseFloat(inputsMatriz1[i * columnas1 + j].value);
            if (isNaN(value)) {
                alert("Ingrese solo valores numéricos en la primera matriz.");
                return;
            }
            fila.push(value);
        }
        matriz1.push(fila);
    }

    // Obtener valores de la segunda matriz
    let inputsMatriz2 = document.querySelectorAll('.matriz2');
    for (let i = 0; i < filas2; i++) {
        let fila = [];
        for (let j = 0; j < columnas2; j++) {
            let value = parseFloat(inputsMatriz2[i * columnas2 + j].value);
            if (isNaN(value)) {
                alert("Ingrese solo valores numéricos en la segunda matriz.");
                return;
            }
            fila.push(value);
        }
        matriz2.push(fila);
    }

    //Enviar las matrices al servidor para multiplicar
    fetch('http://localhost:5000/multiplicar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            mostrarResultado(data.result);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
// Mostrar el resultado de la multiplicación de matrices
function mostrarResultado(resultado) {

    // Mostrar el resultado
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.display = "grid";
    resultadoDiv.style.gridTemplateColumns = `repeat(${resultado[0].length}, auto)`;

    for (let i = 0; i < resultado.length; i++) {
        for (let j = 0; j < resultado[i].length; j++) {
            let cell = document.createElement('div');
            cell.textContent = resultado[i][j];
            cell.style.border = "1px solid #000";
            cell.style.padding = "10px";
            cell.style.textAlign = "center";
            resultadoDiv.appendChild(cell);
        }
    }
}


    // Inicializar la matriz resultante
    let resultado = [];
    for (let i = 0; i < filas1; i++) {
        resultado.push([]);
        for (let j = 0; j < columnas2; j++) {
            resultado[i][j] = 0;
        }
    }

    // Multiplicación de matrices
    for (let i = 0; i < filas1; i++) {
        for (let j = 0; j < columnas2; j++) {
            for (let k = 0; k < columnas1; k++) {
                resultado[i][j] += matriz1[i][k] * matriz2[k][j];
            }
        }
    }

    // Mostrar el resultado
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.display = "grid";
    resultadoDiv.style.gridTemplateColumns = `repeat(${columnas2}, auto)`;

    for (let i = 0; i < resultado.length; i++) {
        for (let j = 0; j < resultado[i].length; j++) {
            let cell = document.createElement('div');
            cell.textContent = resultado[i][j];
            cell.style.border = "1px solid #000";
            cell.style.padding = "10px";
            cell.style.textAlign = "center";
            resultadoDiv.appendChild(cell);
        }
    }
