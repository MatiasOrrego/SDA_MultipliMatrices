from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/multiply', methods=['POST'])
def multiply_matrices():
    data = request.get_json()
    matrix1 = data.get('matrix1')
    matrix2 = data.get('matrix2')

    if not matrix1 or not matrix2:
        return jsonify({'error': 'Matrices no proporcionadas'}), 400

    rows1, cols1 = len(matrix1), len(matrix1[0])
    rows2, cols2 = len(matrix2), len(matrix2[0])

    if cols1 != rows2:
        return jsonify({'error': 'El número de columnas de la primera matriz debe coincidir con el número de filas de la segunda matriz.'}), 400

    # Inicializar la matriz resultante
    result = [[0 for _ in range(cols2)] for _ in range(rows1)]

    # Multiplicación de matrices
    for i in range(rows1):
        for j in range(cols2):
            for k in range(cols1):
                result[i][j] += matrix1[i][k] * matrix2[k][j]

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)