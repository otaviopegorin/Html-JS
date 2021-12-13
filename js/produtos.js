function buscarValorMaximo(){
    let request = new XMLHttpRequest();
    request.open("GET","http://localhost:8081/catalogo/totalDePaginas",false);
    request.send();
    var pagina = document.querySelector('#Pagina');
    var numero = request.responseText;
    pagina.setAttribute('max',numero);
}



function trazerProdutos(event){
    event.preventDefault();
    var numero = document.querySelector('#Pagina').value;
    let request = new XMLHttpRequest();
    request.open("GET","http://localhost:8081/catalogo/"+(numero-1),false);
    request.send();
    var produtos = [{nome:"",
                    categoria:"",
                    valor:"",
                    quantidade:"",
                    urlImagem:""}];
    var StringProdutos = request.responseText;
    produtos = JSON.parse(StringProdutos);
    produtos.forEach(p => criarProduto(p));
}

function criarProduto(produto){
    var lista = document.querySelector('#listaDeProdutos');
    var li = document.createElement("li");
    li.textContent =" Nome: "+produto.nome+
                    ", Categoria: "+produto.categoria+
                    ", Valor: "+produto.valor+
                    ", Quantidade: "+produto.quantidade;
    var img = document.createElement("img");
    img.setAttribute("src",produto.urlImagem);
    img.classList.add('produtos_imagem');
    li.appendChild(img);
    li.classList.add('produtos_texto');
    li.setAttribute('id',produto.nome);
    lista.appendChild(li);
}

function limpar(){
    var lista = document.querySelector('#listaDeProdutos');
    lista.innerHTML ="";
}


