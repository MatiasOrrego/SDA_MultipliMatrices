// Variables globales para almacenar las matrices
let matriz1 = null;
let matriz2 = null;

function generarMatrices() {
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

    if (columnas1 !== filas2) {
        alert("El número de columnas de la primera matriz debe coincidir con el número de filas de la segunda matriz.");
        return;
    }

    // Generar matrices aleatorias con TensorFlow
    for (let i = 1; i <= 2; i++) {
        let filas = i === 1 ? filas1 : filas2;
        let columnas = i === 1 ? columnas1 : columnas2;

        let matrizDiv = document.createElement("div");
        matrizDiv.className = "matriz";
        matrizDiv.style.display = "grid";
        matrizDiv.style.gridTemplateColumns = `repeat(${columnas}, auto)`;

        let matriz = tf.randomUniform([filas, columnas], 0, 10, 'int32');
        if (i === 1) {
            matriz1 = matriz; // Guardar la primera matriz
        } else {
            matriz2 = matriz; // Guardar la segunda matriz
        }

        matriz.array().then(data => {
            for (let f = 0; f < filas; f++) {
                for (let c = 0; c < columnas; c++) {
                    let input = document.createElement('input');
                    input.type = 'number';
                    input.className = `matriz${i}`;
                    input.value = data[f][c];
                    input.disabled = true; // Deshabilitar los inputs para que no se puedan editar
                    matrizDiv.appendChild(input);
                }
            }
        });

        matricesDiv.appendChild(matrizDiv);
    }
}

function multiplicarMatrices() {
    if (!matriz1 || !matriz2) {
        alert("Primero debe generar las matrices.");
        return;
    }

    // Multiplicar matrices usando TensorFlow
    const resultado = tf.matMul(matriz1, matriz2);

    // Mostrar el resultado
    resultado.array().then(data => {
        mostrarResultado(data);
    });

    // Liberar memoria de los tensores
    matriz1.dispose();
    matriz2.dispose();
    resultado.dispose();

    // Reiniciar las matrices globales
    matriz1 = null;
    matriz2 = null;
}

function mostrarResultado(resultado) {
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.display = "grid";
    resultadoDiv.style.gridTemplateColumns = `repeat(${resultado[0].length}, auto)`;

    for (let i = 0; i < resultado.length; i++) {
        for (let j = 0; j < resultado[i].length; j++) {
            let cell = document.createElement('div');
            cell.textContent = resultado[i][j].toFixed(2); // Mostrar con 2 decimales
            cell.style.border = "1px solid #000";
            cell.style.padding = "10px";
            cell.style.textAlign = "center";
            resultadoDiv.appendChild(cell);
        }
    }
}