document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/modelo-black-scholes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('myChart').getContext('2d');

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.resultado.T,
                datasets: [{
                    label: 'Ventas',
                    data: data.resultado.ventas,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                }, {
                    label: 'Compras',
                    data: data.resultado.compras,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
