export function jsonValidator(jsonString){

    var jsonObject;
    
    try {
        jsonObject = JSON.parse(jsonString);
    } catch (e) {
        return false;
    }

    return jsonObject;
}

export async function CEPValidator(cep) {
    /* Faz o POST para login */
      var headers = new Headers();
  
      var myInit = {
          method: 'GET',
          headers: headers,
      }
  
      try{
          /* Recebe as respostas de maneira assíncrona */
          var response = await fetch("https://viacep.com.br/ws/" + cep + "/json/", myInit);
  
          let jsonText = await response.text();
  
          var objectResponse = jsonValidator(jsonText);
  
           /*JSON Parse exception + Validação reposta com sucesso*/
          if(!objectResponse || objectResponse.erro){
              return {
                  "success" : false,
                  "message" : "Erro ao Buscar o CEP"
              };    
          }
  
          return {
              "success" : true,
              "message" : "CEP Consultado com Sucesso",
              "info" : objectResponse
          }
  
      }catch(e){
          return {
              "success" : false,
              "message" : "Erro ao Buscar o CEP"
          }; 
      }
      
  }

  export function backToFrontDate(date, format=false, hour=false){

    if (date!=null){
        var dataSoNumeros = date.replaceAll("-", "");
        var dia = dataSoNumeros[6] + dataSoNumeros[7];
        var mes = dataSoNumeros[4] + dataSoNumeros[5];
        var ano = dataSoNumeros[0] + dataSoNumeros[1] + dataSoNumeros[2] + dataSoNumeros[3];
        var hora = hour ? ' ' + dataSoNumeros.slice(9, 17) : '';

        return format ? dia +"/"+ mes +"/"+ ano + hora: dia + mes + ano;
    } else {
        return ""
    }
}