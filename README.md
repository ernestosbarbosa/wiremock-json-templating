# Wiremock :: JSON Templating

Documentação de como utilizar e customizar o wiremock utilizando apenas JSON e JS.

## Pré-Requisito

* Ter o `java 8` configurado na máquina
	* Rode o comando `javac -version` para garantir.
* Ter o `nodejs` (v6+) configurado na máquina
	* Rode o comando `node -v` para garantir

## Preparando o ambiente

Para configurar para uma primeira utilização, execute o comando `sh utils/prepare_env.sh`.

## Subindo o servidor local

Execute o comando `sh start.sh`

Agora o servidor estará escutando em `http://localhost:8080`

### Subindo manualmente

* Execute o comando `java -jar wiremock-standalone-2.14.0.jar --port XXXX` onde `XXXX` é a porta desejada.
* Caso queira ver mais comandos, veja [AQUI](http://wiremock.org/docs/running-standalone/)
* Agora a api estará rodando em `http://localhost:XXXX`.

## Criação de Cenários

Os arquivos de templates devem ficar dentro da pasta `generator/templates`.

### Cenários de Erro

Caso queira simular cenários de erro, mude o status code da resposta e o corpo para:

```json
{
	"response": {
		"status": 500, //status de erro desejado
		"jsonBody": {
			"error": "sua mensagem de erro",
			"details": {}
		}
	}
}
```

## Utilizando o Wiremock como proxy

* Com a opção `--proxy-all` é possível definir o endereço que o wiremock deve encaminhar as chamadas que não tem response definido em seus arquivos.

## Gravando requests e responses

* Com a opção `--record-mappings` é possível gravar as requisições que passam pelo Wiremock quando este tiver a opção `--proxy-all` habilitada.


## Usando variaveis de entrada para o response

É possível criar respostas dinâmicas, utilizando a extensão `wiremock-body-transformer`. Para executar o wiremock com a extensão deve ser executado o comando `java -cp "wiremock-standalone-2.14.0.jar;wiremock-body-transformer-1.1.6.jar" com.github.tomakehurst.wiremock.standalone.WireMockServerRunner --extensions com.opentable.extension.BodyTransformer`, podendo também parametrizar `--port` `--proxy-all` e `record-mappings`.

Abaixo um exemplo que utiliza a extensão:

```json
{
	"request": {
		"method": "POST",
		"urlPathPattern": "/auth/login",
		"bodyPatterns" : [
			{ "matchesJsonPath" : "$.login" },
			{ "matchesJsonPath" : "$.pass" }
		]
	},
	"response": {
		"status": 200,
		"jsonBody": {
            "resposta": "Olá ${login}!",
        },
		"transformers": ["body-transformer"]
	}
}

```

Com a extensão também é possível definir valores aleatórios em campos de resposta, utilizando um `RandomInteger`, conforme abaixo:

```json
{
	"request": {
		"method": "POST",
		"urlPath": "/transform",
	},
	"response": {
		"status": 200,
		"body": "{\"randomInteger\": \"$(!RandomInteger)\"}",
		"headers": {
			"Content-Type": "application/json"
		},
		"transformers": ["body-transformer"]
	}
}

```

O retorno neste caso será, por exemplo: `{"randomInteger": 56542}`.
