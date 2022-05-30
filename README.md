Projeto Comida de Buteco - Backend

Antes de rodar o npm install é preciso
1. Criar um arquivo .env na raiz do projeto
2. Definir as seguintes variaveis
    ACCESS_TOKEN_SECRET=
    REFRESH_TOKEN_SECRET=
    PORT=3500
para criar os valores das variaveis ACCESS_TOKEN_SECRET e REFRESH_TOKEN_SECRET basta rodar o comando node na linha de comando
e depois require ('crypto').randomBytes(64).toString('hex'). Rode o comando para cada uma das variaveis.
O valor deve ser copiado sem as aspas simples.
