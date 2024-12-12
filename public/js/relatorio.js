let myChart = null;
document.getElementById("btn-relatorios").addEventListener("click", async () => {
    let gastos;
    let doacoes;
    
    try {
        const response = await fetch("/gasto/relatorio", {
            method: "GET"
        });
        if (response.ok) {
            gastos = await response.json();
        } else {
            alert('Erro ao buscar gastos dos últimos 2 anos. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro na requisição de gastos:', erro);
    }
    
    try {
        const response = await fetch("/recebimento/relatorio", {
            method: "GET"
        });
        if (response.ok) {
            doacoes = await response.json();
        } else {
            alert('Erro ao buscar doações dos últimos 2 anos. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro na requisição de doações:', erro);
    }

    if (gastos && doacoes) {
        // Antes de criar o gráfico, destruir o gráfico existente, se houver
        if (myChart) {
            myChart.destroy();
        }

        // Criar o gráfico com os dados novos
        criarGrafico(gastos, doacoes);
    }
});
document.getElementById("nav-btn-relatorios").addEventListener("click", async () => {
    let gastos;
    let doacoes;
    
    try {
        const response = await fetch("/gasto/relatorio", {
            method: "GET"
        });
        if (response.ok) {
            gastos = await response.json();
        } else {
            alert('Erro ao buscar gastos dos últimos 2 anos. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro na requisição de gastos:', erro);
    }
    
    try {
        const response = await fetch("/recebimento/relatorio", {
            method: "GET"
        });
        if (response.ok) {
            doacoes = await response.json();
        } else {
            alert('Erro ao buscar doações dos últimos 2 anos. Tente novamente.');
        }
    } catch (erro) {
        console.error('Erro na requisição de doações:', erro);
    }

    if (gastos && doacoes) {
        // Antes de criar o gráfico, destruir o gráfico existente, se houver
        if (myChart) {
            myChart.destroy();
        }

        // Criar o gráfico com os dados novos
        criarGrafico(gastos, doacoes);
    }
});

function criarGrafico(gastosData, doacoesData) {
    const meses = [];
    const gastosValues = [];
    const doacoesValues = [];

    const dados = {};

    gastosData.forEach(item => {
        if (!dados[item.mes]) {
            dados[item.mes] = { gastos: 0, doacoes: 0 }; 
        }
        dados[item.mes].gastos = item.total_gastos;
    });

    doacoesData.forEach(item => {
        if (!dados[item.mes]) {
            dados[item.mes] = { gastos: 0, doacoes: 0 };
        }
        dados[item.mes].doacoes = item.total_recebimentos;
    });

    const mesesOrdenados = Object.keys(dados).sort();  

    mesesOrdenados.forEach(mes => {
        meses.push(mes);
        gastosValues.push(dados[mes].gastos); 
        doacoesValues.push(dados[mes].doacoes);
    });

    const ctx = document.getElementById('myBarChart').getContext('2d');

    const config = {
        type: 'bar',
        data: {
            labels: meses, 
            datasets: [
                {
                    label: 'Gastos',
                    data: gastosValues, 
                    backgroundColor: 'rgba(255, 99, 132, 0.5)', 
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    barThickness: 30,  
                    categoryPercentage: 0.4, 
                    labelAlign: 'start'
                },
                {
                    label: 'Doações',
                    data: doacoesValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)', 
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barThickness: 30, 
                    categoryPercentage: 0.4,
                    labelAlign: 'start'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    
                    barPercentage: 0.5,
                },
                y: {
                    beginAtZero: true 
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
            }
        }
    };

    myChart = new Chart(ctx, config);
}
