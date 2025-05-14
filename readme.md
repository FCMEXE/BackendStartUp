Utilizar nodeJs
Express
JWTToken





Como fazer as requisições:

Criar uma rota (POST):

URL: http://localhost:3000/api/rotas/rotas
Método: POST
Headers: Inclua o Authorization: Bearer SEU_TOKEN_DE_GERENTE
Body (raw - JSON): O JSON que você forneceu como exemplo.
Listar rotas de um colaborador (GET):


GERENTE
{
    nome:
    telefone:
    senha:
}

COLABORADOR {
    nome
    senha
    id do gerente
}
ROTA
{
    "nome": "Rota da Manhã",
    "pontos": [
        {"latitude": -23.5505, "longitude": -46.6333, "descricao": "Ponto A"},
        {"latitude": -23.5600, "longitude": -46.6400, "descricao": "Ponto B"}
    ],
    "colaboradorId": "68227b99901783ae289b3f38"
}


