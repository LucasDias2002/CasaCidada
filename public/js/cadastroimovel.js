const imovelform = document.getElementById('imovelform');

imovelform.addEventListener('submit', async (event) => {
    event.preventDefault();//Parar e reiniciar um saco;

    const endereco = document.getElementById('imovelendereco').value;
    const cep = document.getElementById('imovelcep').value;
    const complemento = 'casa';
    const num_residencia = document.getElementById('imovelnumero').value;
    const nome_proprietario = document.getElementById('imovelproprietario').value;
    const telefone = document.getElementById('imovelcontato').value;
    const descricao = document.getElementById('imoveldescricao').value;
    const status = document.getElementById('status').value;

    //console.log(telefone, num_residencia);

    try {

        const resposta = await fetch('/imovel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cep, endereco, complemento, num_residencia, nome_proprietario, telefone, descricao, status })
        })
        if(resposta.ok){
            alert("cadastro sucedido");
            imovelform.reset();
        }else{
            alert("Erro ao cadastrar");
        }
    } catch (erro) {
        console.error("erro ao cadastrar imovel arquivo 'cadatroimovel.js': " + erro);
    }
});


//Puxar imoveis para tabela
const exibirImoveis = document.getElementById('btn-atualizar-imovel').addEventListener('click', async ()=>{
    try {

        const resposta = await fetch('/imovel', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(resposta.ok){
            const imoveis = await resposta.json();
            const tabela = document.getElementById('tabela-imoveis');
            tabela.innerHTML='';
            console.log(imoveis.STATUS);
            imoveis.forEach(imovel =>{
                const linha = document.createElement('tr');

                linha.innerHTML=`<td>${imovel.ID}</td>
                                <td>${imovel.CEP}</td>
                                <td>${imovel.NUM_RESIDENCIA}</td>
                                <td>${imovel.ENDERECO}</td>
                                <td>${imovel.NOME_PROPRIETARIO}</td>
                                <td>${imovel.TELEFONE}</td>
                                <td>${imovel.DESCRICAO} muito vom</td>
                                <td>${imovel.STATUS}</td>
                                <td>
                                    <button href="#" class="btn btn-success">Editar</button>
                                </td>`;
                tabela.appendChild(linha);
            });

        }else{
            alert("Erro buscar imovel");
        }
    } catch (erro) {
        console.error("erro ao Buscar imoveis 'cadatroimovel.js': " + erro.message);
    }
});