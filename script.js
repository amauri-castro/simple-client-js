function fazerRequisicao() {

    const url = "http://localhost:8080/formas-pagamento";

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

function preencherTabela(dados) {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    dados.slice(0, 10).forEach(item => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${item.id}</td>
            <td>${item.descricao}</td>
        `;

        tabela.appendChild(linha);
    })
}
