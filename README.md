# Native Ip - Customers

App React + Node + MySQL para visualização e edição de clientes.

## Inicialização

Para iniciar a aplicação, clone o repositório (ou opcionalmente baixe o .zip), acesse a pasta do projeto e inicialize as dependências a partir do docker-compose.yml.

```javascript
    git clone https://github.com/dmmarodin/native-ip-fullstack.git
    cd native-ip-fullstack
    docker compose up
```

Aguarde a finalização da inicialização dos containers, e então acesso `localhost:3000` para visualizar o frontend.

## Backend

O backend da aplicação foi criado em node + express, acessando o banco de dados MySQL através do Sequelize.
Quando a instância do backend é inicializada, ela aguarda a inicialização do container MySQL e então realiza as migrações, limpeza dos dados e seeding de dados no banco.

O backend é dividido em inicialização do App e servidor, rotas, controllers, services e models. Rotas e controllers trabalham juntos, operando como a representação descritiva e concreta dos endpoints da API.
A camada de services tem por responsabilidade operar as regras de negócio da aplicação, removendo a responsabilidade do controller de consultar diretamente os models. É nos services que as devidas validações de dados e as eventuais regras de negócio que o sistema pode possuir irão residir.

## API

O backend possui 4 endpoints de busca e atualização de dados, descritos a seguir.

### Get Customer By Id

Retorna os dados do cliente a partir de seu id.

* **URL**
    /customer/{id:integer}

* **Método**
    ``GET``

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
    /customer/cities/{city : string}

* **Método**
    ``GET``

* **Resposta**

    ```json
    [
        {
            "id": 1,
            "first_name": "Laura",
            "last_name": "Richards",
            "email": "lrichards0@reverbnation.com",
            "gender": "Female",
            "company": "Meezzy",
            "city": "Warner, NH",
            "title": "Biostatistician III",
            "updatedAt": null,
            "createdAt": null
        },
        {
            "id": 51,
            "first_name": "Judy",
            "last_name": "Hill",
            "email": "jhill1e@fema.gov",
            "gender": "Female",
            "company": "Thoughtbeat",
            "city": "Warner, NH",
            "title": "Professor",
            "updatedAt": null,
            "createdAt": null
        },
        ...
    ]
    ```

### Count customers by city

Retorna array de cidades com a quantidade de clientes atualmente cadastrados nelas.

* **URL**
    /customer/cities

* **Método**
    ``GET``

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
        ...
    ]
    ```

### Update customer data by id

Atualiza os dados do cliente a partir do id dele.

* **URL**
    /customer/{id : integer}

* **Método**
    ``PUT``

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
    {}
    ```
