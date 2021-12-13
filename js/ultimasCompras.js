function resgatarUltimosPedidos(){
    let request = new XMLHttpRequest();
    request.open("GET","http://localhost:8081/pedidos",false);
    let pedidosDto = [{
        nomeCliente:'',
        endereco:'',
        nomeDoProduto:'',
        quantidade:'',
        precoTotal:'',
        data:''
    }]
    request.send();
    pedidosDto=JSON.parse(request.responseText);
    pedidosDto.forEach(pedido => {
        criarPedido(pedido);
    })
}

function criarPedido(pedidoDto){
    var borda = document.createElement('div');
    borda.classList.add('borda');
    var lista = document.querySelector('#listaDePedidos');
    var li = document.createElement("li");
    li.textContent =" Nome do cliente: "+pedidoDto.nomeCliente+
                    ",  Endereco: "+pedidoDto.endereco+
                    ",  Nome do Produto: "+pedidoDto.nomeDoProduto+
                    ",  Quantidade: "+pedidoDto.quantidade+
                    ",  Preço Total: "+pedidoDto.precoTotal+
                    ",  Data De Emissão: "+pedidoDto.data;
    li.classList.add('produtos_texto');
    borda.appendChild(li);
    lista.appendChild(borda);
}