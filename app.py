from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)  # Habilitar CORS para todas las rutas

# Ruta para servir el archivo HTML principal
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Ruta para manejar la multiplicación de matrices
@app.route('/multiplicar', methods=['POST'])
def multiply_matrices():
    data = request.get_json()
    matriz1 = data.get('matriz1')
    matriz2 = data.get('matriz2')

    # Validar que las matrices hayan sido proporcionadas
    if not matriz1 or not matriz2:
        return jsonify({'error': 'Matrices no proporcionadas'}), 400

    # Dimensiones de las matrices
    filas1, columnas1 = len(matriz1), len(matriz1[0])
    filas2, columnas2 = len(matriz2), len(matriz2[0])

    # Validar que las dimensiones sean compatibles para la multiplicación
    if columnas1 != filas2:
        return jsonify({'error': 'El número de columnas de la primera matriz debe coincidir con el número de filas de la segunda matriz.'}), 400

    # Inicializar la matriz resultante
    resultado = [[0 for _ in range(columnas2)] for _ in range(filas1)]

    # Multiplicación de matrices
    for i in range(filas1):
        for j in range(columnas2):
            for k in range(columnas1):
                resultado[i][j] += matriz1[i][k] * matriz2[k][j]

    # Devolver el resultado como JSON
    return jsonify({'result': resultado})

# Iniciar el servidor
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)