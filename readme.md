Utilizar nodeJs
Express
JWTToken


✅ Instalar Node.js (vem com o npm)

    Baixe em: https://nodejs.org (versão LTS)

    Instale normalmente.

    Teste no terminal:
node -v
npm -v

✅ Instalar dependências

npm install express jsonwebtoken

TOKENS: 
PEGAR TOKEN DO GERENTE = LOGIN GERENTE - TEMPO DE 1H DE VALIDADE
PEGAR TOKEN DO COLABORADOR = LOGIN COLABORADOR


 POST CRIAR GERENTE
![alt text](image-1.png)

 POST LOGIN DO GERENTE
![alt text](image.png)

PEGAR TODOS OS GERENTES - PRECISA DO TOKEN DE ALGUM GERENTE
![alt text](image-7.png)

REGISTRAR GERENTE: 
![alt text](image-8.png)

REGISTRAR COLABORADOR - PRECISA DO ID DO GERENTE
![alt text](image-2.png)

LOGIN COLABORADOR:
![alt text](image-3.png)

LOGIN PERFIL DO COLABORADOR - PRECISA DO TOKEN DO COLABORADOR
![alt text](image-6.png)

PEGAR TODOS OS COLABORADORES - PRECISA DO TOKEN DO GERENTE
![alt text](image-9.png)

REGISTRAR ROTAS
![alt text](image-4.png)

PEGAR TODAS AS ROTAS - PRECISA DE TOKEN DO GERENTE
![alt text](image-5.png)