
# 📌 Sistema de Gerenciamento com Node.js, Express e JWT

Este projeto utiliza **Node.js**, **Express** e **JWT** para autenticação e controle de acesso de **Gerentes** e **Colaboradores**.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [jsonwebtoken (JWT)](https://www.npmjs.com/package/jsonwebtoken)

---

## ✅ Pré-requisitos

### 1. Instalar o Node.js (já vem com o npm)

- Baixe a versão LTS: [https://nodejs.org](https://nodejs.org)
- Após a instalação, verifique no terminal:

```bash
node -v
npm -v

✅ Instalar dependências

npm install express jsonwebtoken

🔐 Sobre os Tokens

    Token do Gerente → Gerado ao fazer login como gerente (válido por 1h).

    Token do Colaborador → Gerado ao fazer login como colaborador.

🧪 Endpoints com Exemplos

✅ Criar Gerente (POST)
![alt text](image-1.png)

✅ Login do Gerente (POST)
![alt text](image.png)

✅ Listar Todos os Gerentes (GET)

🔒 Requer token de gerente
![alt text](image-7.png)

✅ Registrar Novo Gerente
![alt text](image-8.png)

✅ Registrar Novo Colaborador (POST)

🔒 Requer ID de um gerente
![alt text](image-2.png)

✅ Login do Colaborador (POST)
![alt text](image-3.png)

✅ Perfil do Colaborador (GET)

🔒 Requer token do colaborador
![alt text](image-6.png)

✅ Listar Todos os Colaboradores (GET)

🔒 Requer token do gerente
![alt text](image-9.png)

✅ Registrar Rotas (POST)

🔒 Requer token do gerente
![alt text](image-4.png)

✅ Listar Todas as Rotas (GET)

🔒 Requer token do gerente
![alt text](image-5.png)