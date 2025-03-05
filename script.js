function fazerRequisicao() {

    const url = "http://localhost:8080/restaurantes";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("resposta").textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById("resposta").textContent = 'Erro: ' + error.message;
        });
}
