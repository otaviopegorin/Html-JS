var produto;
function buscarPorNome(event){
  event.preventDefault();
  var nome = document.querySelector('#nomeProduto').value;
  let request = new XMLHttpRequest();
  request.open("GET","http://localhost:8081/catalogo/nome/"+nome,false);
  request.send();
  produto={nome:"",
    categoria:"",
    valor:"",
    quantidade:"",
    urlImagem:""};
  
  var stringProdutos = request.responseText;
  if(stringProdutos == ''){
    alert('Produto não encontrado');
    return;
  }
  var nome = produto.nome;
  produto = JSON.parse(stringProdutos);
  console.log(produto);
  criarItem(event,produto);
}

function pegarProduto(){
  return produto;
}

function comprar(){
  const obj = criarObjetoPedido(produto);
  console.log(obj);
    fetch("http://localhost:8081/comprar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
}

function criarItem(event,produto){
  var lista = document.querySelector('#produtos');
  var form = document.createElement('form');
  form.setAttribute('id','formularioCompra')
  var li = criarLi(produto);
  var img = criarImagem(produto);
  li.appendChild(img);
  li.classList.add('produtos_texto');
  li.setAttribute('id',produto.nome);
  lista.appendChild(li);
  lista.appendChild(form);
  criarForm(event,produto);
}

function limpar(){
  var lista = document.querySelector('#produtos');
  lista.innerHTML ="";
}

function criarInputQtd(){
  const produto = pegarProduto();
  const input = document.createElement('input');
  input.setAttribute('max',produto.quantidade);
  input.setAttribute('min',1);
  input.setAttribute('style','width:160px');
  input.setAttribute('type','number');
  input.setAttribute('id','quantidade');
  return input;
}

function criarInputNome(){
  const input = document.createElement('input');
  input.setAttribute('type','text');
  input.setAttribute('id','nomeCliente');
  return input;
}

function criarInputEndereco(){
  const input = document.createElement('input');
  input.setAttribute('placeholder','Endereço: Rua - Cidade - Estado');
  input.setAttribute('style','width:250px');
  input.setAttribute('type','text');
  input.setAttribute('id','endereco');
  return input;
}

function criarBotao(){
  const botao = document.createElement('button');
  botao.setAttribute('type','submit');
  botao.onclick = comprar;
  botao.textContent="Comprar";
  return botao;
}
function criarBotaoReset(){
  const botao = document.createElement('button');
  botao.setAttribute('type','reset');
  botao.textContent="Limpar";
  return botao;
}



function criarLi(produto){
  const li = document.createElement("li");
  li.textContent =" Nome: "+produto.nome+
                  ", Categoria: "+produto.categoria+
                  ", Valor: "+produto.valor+
                  ", Quantidade: "+produto.quantidade;
  return li;
}

function criarImagem(produto){
  const img = document.createElement("img");
  img.setAttribute("src",produto.urlImagem);
  img.classList.add('produtos_imagem');
  return img;
}
function criarLabel(conteudo){
  const label = document.createElement('label');
  label.textContent = conteudo;
  return label;
}

function criarForm(produto){
  const form = document.querySelector('#formularioCompra');
  const nome = criarInputNome();
  const endereco = criarInputEndereco();
  const qtd = criarInputQtd(produto);
  const botao = criarBotao();
  const botaoReset = criarBotaoReset();
  form.appendChild(criarLabel('Digite o nome do cliente'));
  form.appendChild(nome);
  form.appendChild(criarLabel('Digite o endereço'));
  form.appendChild(endereco);
  form.appendChild(criarLabel('Digite a quantidade'));
  form.appendChild(qtd);
  form.appendChild(botaoReset);
  form.appendChild(botao);
}


function criarObjetoPedido(){
  produto = pegarProduto();
  const Cliente = document.querySelector('#nomeCliente').value;
  const qtde = document.querySelector('#quantidade').value;
  const enderecoCliente = document.querySelector('#endereco').value;
  const nomeDoProduto = produto.nome;
  const Total = produto.valor*qtde;

  const pedidoDto = {
    nomeCliente:Cliente,
    endereco:enderecoCliente,
    nomeProduto:nomeDoProduto,
    quantidade:qtde,
    precoTotal:Total
  }
  return pedidoDto;
}
