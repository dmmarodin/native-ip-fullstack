# Native Ip - Customers

App React + Node + MySQL para visualização e edição de clientes.

## Inicialização

Para iniciar a aplicação, clone o repositório (ou opcionalmente baixe o .zip), acesse a pasta do projeto e inicialize as dependências a partir do docker-compose.yml.

```bash
    git clone https://github.com/dmmarodin/native-ip-fullstack.git
    cd native-ip-fullstack
    docker compose up
```

Aguarde a finalização da inicialização dos containers, e então acesso `localhost:3000` para visualizar o frontend.

## Docker

O projeto foi dividido em 3 containers e por isso conta com um `docker-compose.yml`, que tem por finalidade facilitar a inicialização do ambiente de desenvolvimento. Para produção, é recomendado realizar as 3 builds através do `docker build`.

* **Frontend**: o frontend na build de produção da imagem é preparado em node e então em seu próximo estágio é servido estaticamento por nginx.

* **Backend**: é servido por node, e quando rodado através do docker-compose, acompanha o script de migração e seeding do banco de dados. Na build de produção é servido por node-slim, para redução do tamanho da imagem.

* **MySQL**: é a imagem base do MySQL para docker.

## Backend

O backend da aplicação foi criado em node + express, acessando o banco de dados MySQL através do Sequelize.
Quando a instância de desenvolvimento do backend é inicializada, o script `entrypoint.sh`  aguarda a inicialização do container MySQL e então realiza as migrações, limpeza dos dados e seeding de dados no banco.

Ele é dividido em inicialização do App e servidor, rotas, controllers, services e models. Rotas e controllers operam como a representação descritiva e concreta dos endpoints da API. Fica delegado aos controllers abstrair os erros e exceptions das regras de negócio para uma versão amigável à API pública.

A camada de services tem por responsabilidade operar as regras de negócio da aplicação, removendo a responsabilidade do controller de consultar diretamente os models. É nos services que as devidas validações de dados e as eventuais regras de negócio que o sistema pode possuir irão residir. Facilita a realização de teste unitários em relação a testar diretamente os controllers, pois não é necessário lidar com os objetos do request e response.

## Testes

O backend possui testes unitários e de integração. Para rodar os testes em desenvolvimento, inicialize os containers e então execute `npm test` no container do backend:

```bash
docker compose up
docker compose exec backend npm test
```

Os testes de integração fazem uso da biblioteca `supertest` para simular requisições para o app *express*. Tem por finalidade testar os retornos publicamente acessíveis da API. Eles estão disponíveis no diretório de testes.

Os testes unitários operam na camada de serviço, validando as regras de negócio. São encontrados junto ao diretório de services. Sua cobertura não é ideal, pois estão acoplados e dependentes do banco de dados, e especialmente do processo de seeding.

## API

O backend possui 4 endpoints de busca e atualização de dados, descritos a seguir.

### Get Customer By Id

Retorna os dados do cliente a partir de seu id.

* **URL**
    /customer/{id : integer}

* **Método**
    ``GET``

* **Código**
  * **200**: Sucesso
  * **404**: Cliente não encontrado
  * **400**: Id inválido

* **Resposta**

    ```json
    {
        "id": 1,
        "first_name": "Laura",
        "last_name": "Richards",
        "email": "lrichards0@reverbnation.com",
        "gender": "Female",
        "company": "Meezzy",
        "city": "Warner, NH",
        "title": "Biostatistician III",
    }
    ```

### Get customers by city

Retorna array de clientes de acordo com a cidade escolhida

* **URL**
    /customer/city/{city : string}

* **Método**
    ``GET``

* **Códigos**
  * **200**: Sucesso
  * **404**: Cidade não encontrada

* **Resposta**

    ```json
    [
        {
            "id": 1,
            "first_name": "Laura",
            "last_name": "Richards",
            "email": "lrichards0@reverbnation.com",
            "company": "Meezzy",
        },
        {
            "id": 51,
            "first_name": "Judy",
            "last_name": "Hill",
            "email": "jhill1e@fema.gov",
            "company": "Thoughtbeat",
        },
        [...]
    ]
    ```

### Count customers by city

Retorna array de cidades com a quantidade de clientes atualmente cadastrados nelas.

* **URL**
    /customer/cities

* **Método**
    ``GET``

* **Códigos**
  * **200**: Sucesso
  * **404**: Nenhuma cidade encontrada

* **Resposta**

    ```json
    [
        {
            "city": "Warner, NH",
            "customers_total": 20
        },
        {
            "city": "East Natchitoches, PA",
            "customers_total": 20
        },
        [...]
    ]
    ```

### Update customer data by id

Atualiza os dados do cliente a partir do id dele.

* **URL**
    /customer/{id : integer}

* **Método**
    ``PUT``

* **Código**
  * **200**: Sucesso
  * **400**: Dado inválido ou omitido
  * **404**: Cliene não encontrado

* **Body Data**

    ```json
    {
        "first_name": "Laura",
        "last_name": "Richards",
        "email": "lrichards0@reverbnation.com",
        "gender": "Female",
        "company": "Meezzy",
        "city": "Warner, NH",
        "title": "Biostatistician III",
        "updatedAt": null,
        "createdAt": null
    }
    ```

* **Resposta**

    ```json
    { "message": "cliente atualizado com sucesso." }
    ```
