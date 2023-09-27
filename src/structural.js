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