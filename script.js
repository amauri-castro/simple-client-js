const url = "http://localhost:8080/formas-pagamento";

function fazerRequisicao() {

    fetch(url, {headers: { "Content-Type": "application/json"}})
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            preencherTabela(data);
        })
        .catch(error => {
            const elementoErro = document.getElementById("erro");
            elementoErro.textContent = 'Erro: ' + error.message;
            elementoErro.style.display = "inline-block"
        });
}

function salvarDados() {
    let inputDescricao = document.getElementById("campoDescricao");

    const formaPagamento = JSON.stringify({
        "descricao": inputDescricao.value
    })
    console.log(inputDescricao)

    fetch(url, {
        headers: { "Content-Type": "application/json"},
        method: 'post',
        body: formaPagamento,
    }).then(() => {
        fazerRequisicao()
        inputDescricao.value = '';
    } )
    .catch(error => {
        const elementoErro = document.getElementById("erro");
        elementoErro.textContent = 'Erro: ' + error.message;
        elementoErro.style.display = "inline-block"
    });
}

function excluir(idItem) {
    console.log(idItem)
    fetch(url + `/${idItem}`, {
        method: "DELETE"
    }).then(() => {
        fazerRequisicao();
    }).catch(error => {
        const elementoErro = document.getElementById("erro");
        elementoErro.textContent = 'Erro: ' + error.message;
        elementoErro.style.display = "inline-block"
    });
}

function preencherTabela(dados) {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    dados.slice(0, 10).forEach(item => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${item.id}</td>
            <td>${item.descricao}</td>
            <td><button onclick="excluir(${item.id})">Delete</button></td>
        `;

        tabela.appendChild(linha);
    })
}
