# Projeto Bnex

Este projeto é CRUD utilizando Django + react e postgres.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração do Ambiente

### 1. Clone o Repositório

Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/yurih1/bnex.git
cd bnex
```

### 2. Configure o Arquivo .env

Crie um arquivo chamado .env na raiz do projeto para definir variáveis de ambiente necessárias para o Django e react (ATENÇÃO! EXISTE 2 ARQUIVOS .ENV). Aqui estão as instruções para Windows e Linux:

No Linux
#### 1. Crie um arquivo chamado .env nos mesmos path's do .env.example:

```bash
cp env.example .env
```
Edite o arquivo .env conforme necessario:

django(backend):

```bash
SECRET_KEY=your-secret-key
DATABASE_NAME=bnex
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_HOST=db
DATABASE_PORT=5432
DJANGO_SUPERUSER_USERNAME=yuri
DJANGO_SUPERUSER_EMAIL=yuri@email.com
DJANGO_SUPERUSER_PASSWORD=root
```
React (frontend):

```bash
REACT_APP_API_URL=http://localhost:8000
```
### 3. Rode o projeto

```bash
docker-compose up --build
```

### 4. Métodos e Endpoints

| Método | Endpoint               | Descrição                         |
|--------|--------------------    |-----------------------------------|
| GET    | `/api-token-auth/`     | Retorna o token do usuario        |
| GET    | `/api/produtos/`       | Lista os produtos                 |
| POST   | `/api/produtos/`       | Envia um produto                  |
| GET    | `/api/produtos/{id}/`  | Retorna os detalhes de um produto |
| PUT    | `/api/produtos/{id}/`  | Atualiza um produto existente     |
| DELETE | `/api/tasks/{id}/`     | Exclui um produto                 |


### 5. Curl das requisições e respostas

#### /api-token-auth/

```bash
curl --location 'localhost:8000/api-token-auth/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=user' \
--data-urlencode 'password=password'
```
### Resposta do /api-token-auth/

```bash
{
    "token": "SEU TOKEN"
}
```
#### /api/produtos/

```bash
curl --location 'localhost:8000/api/produtos/' \
--header 'Authorization: Token <SEU TOKEN>' \
--header 'Content-Type: application/json' \
--data '{
    "nome":"produto",
    "descricao":"descricao do nosso amigo",
    "preco":"299.90"
}'
```

### Resposta do POST /api/produtos/

```bash
{
    "id": "8aae5ea9-84fe-43f1-9ff6-1800a63f1390",
    "nome": "produto",
    "descricao": "descricao do nosso amigo",
    "preco": "299.90"
}
```
*OBS. Não é a forma ideal de documentar uma API e acima só deixei como exemplo mesmo. Acontece que ocorreu alguns erros com o drf-yasg e por questões de tempo não consegui resolve-los ainda. Com isso o projeto esta sem a adição do swagger*

### 6. Melhorias
- [ ] Correção do problemas com a env no build
- [ ] Adicionar um Swagger para documentar a API da maneira certa

**Fico a disposição para melhores informações**