var criptografiaSelect = document.querySelector('select[name="criptografia"]');

criptografiaSelect.addEventListener('change', function (evento) {

  var incrementoContainer = document.getElementById('incrementoContainer')

  if (evento.target.value == 'cifra') {

    incrementoContainer.style = 'display: block';
  } else {

    incrementoContainer.style = 'display: none';
  }
});

var acaoRadios = document.querySelectorAll('input[name="acao"]');

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

var formulario = document.forms.formCriptografia;

formulario.addEventListener('submit', function (evento) {

  evento.preventDefault();

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