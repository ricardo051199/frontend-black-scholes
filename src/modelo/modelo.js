let grafico;
let datos;

document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('formulario');

    calculatorForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const tipo_opcion = document.getElementById('opciones').value;
        const S0 = parseFloat(document.getElementById('precio-inicial').value);
        const K = parseFloat(document.getElementById('precio-ejercicio').value);
        const r = parseFloat(document.getElementById('tasa-interes').value);
        const sigma = parseFloat(document.getElementById('volatilidad-activo').value);
        const T = parseFloat(document.getElementById('tiempo').value);

        black_scholes(tipo_opcion, S0, K, r, sigma, T);
    });
});

function black_scholes(tipo_opcion, S0, K, r, sigma, T) {
    fetch('http://localhost:5000/modelo-black-scholes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tipo_opcion, S0, K, r, sigma, T }),
        mode: 'cors',
        credentials: 'same-origin',
    })
    .then(response => response.json())
    .then(data => {
        datos = data.resultado;
        if (tipo_opcion === 'ambas') {
            dibujarGraficoAmbas();
        } else {
            dibujarGrafico(0);
        }
    })
    .catch(error => console.error('Error al conectar con el backend:', error));
}


function dibujarGrafico(indice) {
    if (grafico) {
        grafico.destroy();
    }

    var ctx = document.getElementById('grafico').getContext('2d');
    grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datos.x,
            datasets: [{
                label: `Tiempo ${indice + 1}`,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: datos.historial[indice],
            }]
        },
        options: {}
    });
}

function actualizarGrafico() {
    const numeroGrafica = parseInt(document.getElementById('numeroGrafica').value);
    if (!isNaN(numeroGrafica) && numeroGrafica >= 0 && numeroGrafica < datos.historial.length) {
        dibujarGrafico(numeroGrafica);
    } else {
        console.error('Número de gráfica no válido');
    }
}

function dibujarGraficoAmbas() {
    if (grafico) {
        grafico.destroy();
    }

    var ctx = document.getElementById('grafico').getContext('2d');
    grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datos.x,
            datasets: [
                {
                    label: `Compra`,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: datos['historial-compra'][0],
                },
                {
                    label: `Venta`,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    data: datos['historial-venta'][0],
                }
            ]
        },
        options: {}
    });
}