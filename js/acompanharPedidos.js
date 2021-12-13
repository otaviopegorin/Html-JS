function buscarValorMaximo(){
    let request = new XMLHttpRequest();
    request.open("GET","http://localhost:8081/acompanharUltimasEntregas/totalPaginas",false);
    request.send();
    var pagina = document.querySelector('#Pagina');
    var numero = request.responseText;
    pagina.setAttribute('max',numero);
}

function trazerEntregas(event){
    event.preventDefault();
    var numero = document.querySelector('#Pagina').value;
    let request = new XMLHttpRequest();
    request.open("GET","http://localhost:8081/acompanharUltimasEntregas/"+(numero-1),false);
    request.send();
    let entregas = [{
        status:'',
        data:'',
        nomeProduto:'',
        enderecoDestinatario:'',
        enderecoRemetente:'',
        codigoDeRastreamento:''
    }]
    var stringEntregas = request.responseText;
    entregas = JSON.parse(stringEntregas);
    entregas.forEach(p => criarEntrega(p));
}
function criarEntrega(entrega){
    var borda = document.createElement('div');
    borda.classList.add('borda');
    var lista = document.querySelector('#listaDePedidos');
    var li = document.createElement("li");
    li.textContent =" Status: "+entrega.status.replace(/_/g," ")+
                    ",  Data: "+entrega.data+
                    ",  Nome do Produto: "+entrega.nomeProduto+
                    ",  Endereco Destinatario: "+entrega.enderecoDestinatario+
                    ",  Endereço do remetente: "+entrega.enderecoRemetente+
                    ",  Codigo De Rastreamento: "+entrega.codigoDeRastreamento;
    li.classList.add('produtos_texto');
    borda.appendChild(li);
    lista.appendChild(borda);
}

function limpar(){
    var lista = document.querySelector('#listaDePedidos');
    lista.innerHTML ="";
}