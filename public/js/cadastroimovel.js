const form = document.getElementById('cadastrar-imovel');

form.addEventListener('submit', async (event) => {
    event.preventDefault();//Parar e reiniciar um saco;

    const endereco = document.getElementById('endereco').value;
    const cep = document.getElementById('cep').value;
    const complemento = 'casa';
    const num_residencia = document.getElementById('numero').value;
    const nome_proprietario = document.getElementById('proprietario').value;
    let telefone = document.getElementById('contatoImovel').value;

    console.log(telefone);

    try {

        const resposta = await fetch('/imovel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cep, endereco, complemento, num_residencia, nome_proprietario, telefone })
        })
        if(resposta.ok){
            alert("cadastro sucedido");
            form.reset();
        }else{
            alert("Erro ao cadastrar");
        }
    } catch (erro) {
        console.error("erro ao cadastrar imovel arquivo 'cadatroimovel.js': " + erro);
    }
});