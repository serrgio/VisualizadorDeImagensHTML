//Selecionar imagem local
function buscarImagemLocal() { 
  var imgFile = document.getElementById("imagemLocal");  
  if(verificarTipoDeImagemValido(imgFile)){   
    if (imgFile.files && imgFile.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
          var dataUri = event.target.result,
          img = document.createElement("img");
          img.src = dataUri;
          areaExibicao.document.getElementById("Imagem").src = dataUri;
      };
       reader.onerror = function(event) {
           console.error("Não foi possível ler seu arquivo! Code " + event.target.error.code);
       };
       reader.readAsDataURL(imgFile.files[0]);
    }
  } else {
    alert("Extenção de arquivo inválida. Favor selecionar arquivos com a extenção JPG ou PNG.");
  }
}

//Selecionar imagem remota
function buscarImagemRemota(){
  var urlImagem = document.getElementById("urlDaImagem");
  areaExibicao.document.getElementById("Imagem").src = urlImagem.value;
}

//Verificar se a extensão do arquivo é válida.
//Somente arquivos com a extenção JPG e PNG são aceitos.

function verificarTipoDeImagemValido(arquivo){
  var local = arquivo.value;
  var indice = local.lastIndexOf('.');
  var extensaoArquivo = local.substring(indice+1, local.length).toLowerCase();
  if (extensaoArquivo.localeCompare("jpg") === 0 || extensaoArquivo.localeCompare("png") === 0){
    return true;
  } else {
    return false;
  }
}

//Fuções de Zoom
//Zoom +
function zoomIn(){
  var imagem = areaExibicao.document.getElementById("Imagem");
  imagem.width = (imagem.width * 1.1);
}

//Zoom -
function zoomOut(){
  var imagem = areaExibicao.document.getElementById("Imagem");
  imagem.width = (imagem.width / 1.1);
}

// Funções para mover a imagem no iframe
window.onload = addListeners;
function addListeners(){
    document.getElementById('Imagem').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
}

function mouseUp()
{
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e){
  window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
  var div = document.getElementById('Imagem');
  div.style.position = 'absolute';
  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
}