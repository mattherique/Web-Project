import { jsonValidator } from "./structural";

export async function newRequest(config={}, content={}){

    const URL = "http://127.0.0.1:8000" ;

    try{

        /** Cria as Informações do Header */
        var headers = new Headers();

        /** Verifica se existe o Token caso setado para isso */
        // if(config.verifyToken){
        //     var userToken = window.localStorage.getItem(config.tokenName ? config.tokenName: "user_token");

        //     if(userToken){
        //         var payload = jwt_decode(userToken);

        //         if(config.tokenUserName){
        //             var payload = jwt_decode(userToken);
        //             content[config.tokenUserName] = payload.user;
        //         }
                
        //         headers.append("Authorization", "Bearer " + userToken);
        //     }
        // }

        /*Pega o token do Local Storage caso setado para isso*/
        // if(config.hasToken){
        //     var userToken = window.localStorage.getItem(config.tokenName ? config.tokenName: "user_token");

        //     if(!userToken){
        //         return {
        //             "success" : false,
        //             "message" : "Você precisa estar Logado para realizar essa ação"
        //         };
        //     }

        //     if(config.tokenUserName){
        //         var payload = jwt_decode(userToken);
        //         content[config.tokenUserName] = payload.user;
        //     }

        //     headers.append("Authorization", "Bearer " + userToken);
        // }
        
        var bodyInfo = null;
        var completeUrl = URL + config.url;

        if(config.method === 'POST' || config.method === "PUT"){
            if(!config.contentType){
                headers.append("Content-Type", "application/json");
                bodyInfo = JSON.stringify(content)
            }

            else{
                bodyInfo = new FormData();
                for (var c in content){
                    bodyInfo.append(c, content[c]);
                }
            }
        }

        else if (config.method === 'GET' || config.method === 'DELETE' ) {
            if(content){
                var concatChar = '?';
                Object.getOwnPropertyNames(content).forEach((value, index) => {
                    completeUrl += concatChar + value + '=' + content[value];
                    if(concatChar === '?'){
                        concatChar = '&';
                    }
                });
            }
        }

        var init = {
            method: config.method,
            headers: headers
        }

        if(bodyInfo){
            init.body = bodyInfo;
        }
        
        /* Recebe a resposta */
        var response = await fetch(completeUrl, init);
        
        let jsonText = await response.text();

        var objectResponse = jsonValidator(jsonText);

        /*JSON Parse exception + Validação reposta com sucesso*/
        if(!objectResponse){
            return {
                "success" : false,
                "message" : "Ocorreu algum Erro"
            };    
        }

        else if (objectResponse.status !== "Success"){
            return {
                "success" : false,
                "message" : objectResponse.message,
                "response": objectResponse
            };    
        }
        
        return {
            "success" : true,
            "response" : objectResponse
        };
    } catch(e){
        return {
            "success": false,
            "message": "Ocorreu algum erro!"
        }
    }
}