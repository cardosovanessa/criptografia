// Pega o select com name="criptografia"
var criptografiaSelect = document.querySelector('select[name="criptografia"]');
// Fica ouvindo/monitorando a acao de change (usuario seleciona outra opcao na lista) do input criptografia
criptografiaSelect.addEventListener('change', function (evento) {
  // Pega o elemento com o atributo name="incremento"
  var incrementoContainer = document.getElementById('incrementoContainer')

  if (evento.target.value == 'cifra') {
    // Se o usuario selecionou cifra de cesar, muda o CSS do input de incremento pra ele aparecer na tela
    incrementoContainer.style = 'display: block';
  } else {
    // Se o usuario selecionou qualquer coisa que nao seja cifra de cesar, esconde o input de incremento da tela
    incrementoContainer.style = 'display: none';
  }
});

// Pega todos os input com name="acao"
var acaoRadios = document.querySelectorAll('input[name="acao"]');
// Faz um loop em cada um dos inputs que ele achou pra adicionar o eventListener neles
acaoRadios.forEach(radio => {
  radio.addEventListener('change', function (evento) {
    var buttonSubmit = document.querySelector('button[type="submit"]');

    if (evento.target.value == 'codificar') {
      buttonSubmit.innerHTML = 'Codificar Mensagem';
    } else {
      buttonSubmit.innerHTML = 'Decodificar Mensagem'
    }
  });
});

// Pega o formulario que tem o atributo name="formCriptografia"
var formulario = document.forms.formCriptografia;
// Fica ouvindo/monitorando a acao de submit do formulario
// pode ser um ENTER no input ou click no botao de submit (<button type="submit"> ou apenas <button> sem type)
formulario.addEventListener('submit', function (evento) {
  // Por padrao o formulario atualiza a pagina e envia os valores do formulario na URL
  // aqui a gente previne (prevent) esse comportamento padrao (default) -> preventDefault()
  // entao ele nao vai atualizar a pagina e nem enviar os dados na URL e a gente pode fazer o que quiser com os dados
  evento.preventDefault();

  // Aqui a gente acessa os valores dos inputs e/ou selects atraves do atributo NAME deles
  // no caso esse mensagem aqui de baixo é o <input NAME="mensagem" />, o incremento o INCREMENTO e assim por diante
  var mensagem = formulario.mensagem.value;
  var criptografia = formulario.criptografia.value;
  var incremento = formulario.incremento.value;
  var acao = formulario.acao.value;

  var resultado = '';

  if (criptografia == 'base64') {
    resultado = base64(acao, mensagem);
  } else {
    resultado = cesar(acao, mensagem, incremento);
  }

  var resultadoContainer = document.getElementById('resultado');
  resultadoContainer.innerHTML = `
    <h1>Resultado:</h1>
    ${resultado}
  `;

  formulario.reset();
});

function base64(acao, mensagem) {
  if (acao == 'codificar') {
    return btoa(mensagem);
  } else {
    return atob(mensagem);
  }
}

function cesar(acao, mensagem, incremento) {
  incremento = Number(incremento);

  var resultado = '';

  for (var i = 0; i < mensagem.length; i++) {
    var letra = mensagem[i];
    var code = letra.charCodeAt();

    if (acao == 'codificar') {
      code += incremento;
    } else {
      code -= incremento;
    }

    resultado += String.fromCharCode(code);
  }

  return resultado;
}