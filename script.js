function fazerRequisicao() {

    $.ajax({
        url: "http://localhost:8080/restaurantes",
        type: "get",

        success: function(response) {
            $("#resposta").text(response);
        }
    });
}