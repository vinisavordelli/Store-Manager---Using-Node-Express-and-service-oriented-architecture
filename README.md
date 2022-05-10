A ideia do projeto era desenvolver minha primeira API utilizando a arquitetura MSC (model-service-controller)!

A API construída é um sistema de gerenciamento de vendas em que é possível criar, visualizar, deletar e atualizar produtos e vendas.

Você deverá utilizar o banco MySQL para a gestão de dados. Além disso, a API deve ser RESTful.

A construção dessa API foi feita com base nas etapas abaixo:

## 1 - Devem existir endpoints para listar os produtos e as vendas

>💬 O setup inicial da sua aplicação **é determinante para que esse e os demais requisitos funcionem corretamente.**
>
> Portanto, antes de começar o requisito, garanta ter seguido as orientações do `README` nas seguintes seções:
>
>- `Todos os seus endpoints devem estar no padrão REST`;
>- `Cada camada da sua API deve estar em seu respectivo diretório`;
>- `Arquivo index.js`;
>- `Conexão com o Banco`.

### :information_source: Para **Produtos**

- O endpoint para listar produtos deve ser acessível através do caminho (`/products`) e (`/products/:id`);

- Através do caminho `/products`, todos os produtos devem ser retornados;

- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL deve ser retornado;

- o resultado deve ser **ordernado** de forma crescente pelo campo `id`;

<details close>
  <summary>O que será validado no endpoint para listar produtos</summary>
  <br>

  > :point_right: Para o endpoint `GET /products`, será validado que todos produtos estão sendo retornados.
  - sua API deve responder com status http `200` e o seguinte `body`:
  ```json
    [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ]
  ```

  > :point_right: Para o endpoint `GET /products/:id`, será validado que é possível listar um determinado produto.
  - sua API deve responder com status http `200` e o seguinte `body`:
    ```json
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      }
    ```

  > :point_right: Para o endpoint `GET /products/:id`, será validado que não é possível listar um produto que não existe.

  - sua API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>
<br>

### :information_source: Para **Vendas**

- O endpoint para listar vendas deve ser acessível através do caminho (`/sales`) e (`/sales/:id`);

- Através do caminho `/sales`, todas as vendas devem ser retornadas;

- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL deve ser retornada;

- o resultado deve ser **ordernado** de forma crescente pelo campo `saleId`, em caso de empate, **ordernar** também de forma crescente pelo campo `productId`;

<details close>
  <summary>O que será validado no endpoint para listar vendas</summary>
  <br>

  > :point_right: Para o endpoint `GET /sales`, será validado que todas vendas estão sendo retornados.
  - sua API deve responder com status http `200` e o seguinte `body`:
  ```json
    [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ]
  ```

  > :point_right: Para o endpoint `GET /sales/:id`, será validado que é possível listar uma determinada venda.
  - sua API deve responder com status http `200` e o seguinte `body`:
    ```json
      [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
    ```

  > :point_right: Para o endpoint `GET /sales/:id`, será validado que não é possível listar uma venda que não existe.
  - sua API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Sale not found" }
    ```
</details>

## 2 - Devem existir middlewares de validação para as rotas `/products` e `/sales`

### :information_source: Para **Produtos**

- O endpoint de produtos deve ser acessível através do caminho (`/products`);

- Lembre-se, o banco de dados não deve ser acessado nas validações iniciais do corpo da requisição;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :warning: Nenhum dos casos testados com informações inválidas ou com campos faltantes fará acesso ao banco de dados.

  > :point_right: Para o endpoint `POST /products`, o campo `name` deve ser uma _string_ com 5 ou mais caracteres e deve ser único.
  - Quando a requisição é feita sem o atributo `name` :
    ```json
      { "quantity": 100 }
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "message": "\"name\" is required" }
    ```
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      { "name": "pro", "quantity": 100 }
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "\"name\" length must be at least 5 characters long" }
    ```


  > :point_right: O campo`quantity` deve ser um número inteiro maior que 0.
  - Quando a requisição é feita sem o atributo `quantity` :
    ``` json
      { "name": "produto" }
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
    ``` json
      { "message": "\"quantity\" is required" }
    ```

  - Quando a requisição é feita com o `quantity`  menor ou igual a 0:
    ```json
      { "name": "produto", "quantity": 0 }
    ```
     ```json
      { "name": "produto", "quantity": -1 }
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
    { "message": "\"quantity\" must be greater than or equal to 1" }
    ```
</details>
<br>

### :information_source: Para **Vendas**

- O endpoint de produtos deve ser acessível através do caminho (`/sales`);

- Lembre-se, o banco de dados não deve ser acessado nas validações iniciais do corpo da requisição;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :warning: Nenhum dos casos testados com informações inválidas ou com campos faltantes fará acesso ao banco de dados.

  > :point_right: será validado que o campo `productId` está presente no body.
  - Quando a requisição é feita sem o atributo `productId` :
    ```json
      [{ "quantity": 2 }]
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "message": "\"productId\" is required" }
    ```

  > :point_right: será validado que o campo `quantity` está presente no body.
  - Quando a requisição é feita sem o atributo `quantity` :
    ```json
      [{ "productId": 1 }]
    ```
    - sua API deve responder com status http `400` e o seguinte `body`:
    ```json
      { "message": "\"quantity\" is required" }
    ```

  - Quando a requisição é feita com o `quantity`  menor ou igual a 0:
    ```json
      [{ "productId": 1, "quantity": 0 }]
    ```
     ```json
      [{ "productId": 1, "quantity": -1 }]
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
    { "message": "\"quantity\" must be greater than or equal to 1" }
    ```
</details>

## 3 - Deve existir um endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- Os produtos enviados devem ser salvos na tabela `products` do Banco de Dados;

- *Observe as regras de negócio e coloque na camada certa;*

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `POST /products`, o campo `name` deve ser uma _string_ com 5 ou mais caracteres e deve ser único.

  - Quando a requisição é feita com o atributo `name` igual um já cadastrado:
    ```json
      { "name": "produto", "quantity": 100 }
    ```
    - sua API deve responder com status http `409` e o seguinte `body`:
    ```json
      { "message": "Product already exists" }
    ```

  > :point_right: Para o endpoint `POST /products`, quando a requisição é feita corretamente, o produto deve ser cadastrado.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      { "name": "produto", "quantity": 10 }
    ```
    - sua API deve responder com status http `201` e o seguinte `body`:
    ```json
      { "id": 1, "name": "produto", "quantity": 10 }

</details>

## 4- Deve existir um endpoint para atualizar um produto

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- O corpo da requisição deve seguir a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL deve ser atualizado;

- *Observe as regras de negócio e coloque na camada certa;*

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `PUT /products/:id`, quando a requisição é feita corretamente, o produto deve ser alterado.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      { "name": "produto", "quantity": 15 }
    ```
    - sua API deve responder com status http `200` e o seguinte `body`:
    ```json
      { "id": 1, "name": "produto", "quantity": 15 }
    ```

  > :point_right: Para o endpoint `PUT /products/:id`, será validado que não é possível alterar um produto que não existe.
  - sua API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>

## 5 - Deve existir um endpoint para deletar um produto

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- Apenas o produto com o `id` presente na URL deve ser deletado;

- *Observe as regras de negócio e coloque na camada certa;*

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `DELETE /products/:id`, será validado que é possível deletar um produto com sucesso.
  - sua API deve responder com status http `204` e sem nenhuma resposta no `body`.

  > :point_right: Para o endpoint `DELETE /products/:id`, será validado que não é possível deletar um produto que não existe.
  - sua API deve responder com status http `404` e o seguinte `body`:
    ```json
      { "message": "Product not found" }
    ```
</details>

## 6 - Deve existir um endpoint para cadastrar vendas

- O endpoint deve ser acessível através do caminho (`/sales`);

- As vendas enviadas devem ser salvas na tabela `sales` e `sales_products` do Banco de dados;

- Deve ser possível cadastrar a venda de vários produtos através da uma mesma requisição;

- *Observe as regras de negócio e coloque na camada certa;*

>💬 Em caso de dúvidas, lembre-se de consultar a seção `Dicas importantes`, neste README

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `POST /sales`, quando a requisição é feita corretamente, o produto deve ser cadastrado.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    ```
    - sua API deve responder com status http `201` e o seguinte `body`:
    ```json
      {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      }
    ```

  > :point_right: Para o endpoint `POST /sales`, quando a requisição é feita corretamente, a venda deve ser cadastrada.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    ```
    - sua API deve responder com status http `201` e o seguinte `body`:
    ```json
      {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 2
          },
          {
            "productId": 2,
            "quantity": 5
          }
        ]
      }
    ```
</details>

## 7 - Deve existir um endpoint para atualizar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- `quantity` deve ser um número inteiro maior que 0;

- Apenas a venda com o `id` presente na URL deve ser atualizada;

- *Observe as regras de negócio e coloque na camada certa;*

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `PUT /sales/:id`, quando a requisição é feita corretamente, a venda deve ser alterada.
  - Quando a requisição é feita e contém o seguinte `body`:
    ```json
      [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
    ```
    - sua API deve responder com status http `200` e o seguinte `body`:
    ```json
      {
        "saleId": 1,
        "itemUpdated": [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
      }
    ```
</details>

# Requisitos Bônus

## 8 - Deve existir um endpoint para deletar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- Apenas a venda com o `id` presente na URL deve ser deletado;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `DELETE /sales/:id`, será validado que é possível deletar uma venda com sucesso.
  - sua API deve responder com status http `204` e sem nenhuma resposta no `body`.

  > :point_right: Para o endpoint `DELETE /sales/:id`, será validado que não é possível deletar uma venda que não existe.
  - sua API deve responder com status http `404` e o seguinte `body`:
  ```json
    { "message": "Sale not found" }
  ```

</details>

## 9 - Deve existir um endpoint para atualizar a quantidade de produtos

- Ao realizar uma venda, atualizá-la ou deletá-la, você deve também atualizar a quantidade do produto em questão presente na tabela responsável pelos produtos;

  - **Exemplo 1**: suponha que haja um produto chamado *Bola de Futebol* e a sua propriedade `quantity` tenha o valor *10*. Caso seja feita uma venda com *8* unidades desse produto, a quantidade do produto deve ser atualizada para *2* , pois 10 - 8 = 2;
  - **Exemplo 2**: Suponha que esta venda tenha sido deletada, logo estas *8* unidades devem voltar ao `quantity` e seu valor voltará a *10*, pois 2 + 8 = 10;

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Será validado que ao **fazer uma determinada venda**, a quantidade do produto deverá ser atualizada **também** na tabela responsável pelos produtos.

  > :point_right: Será validado que ao **deletar uma determinada venda**, a quantidade do produto deverá ser atualizada **também** na tabela responsável pelos produtos;.

</details>

## 10 - Deve existir uma validação sobre a quantidade de produtos

- Um produto nunca deve ter a quantidade em estoque menor que 0;

- Quando uma venda for realizada, garanta que a quantidade sendo vendida está disponível no estoque

<details close>
  <summary>O que será validado</summary>
  <br>

  > :point_right: Para o endpoint `POST /sales`, será validado que a quantidade de produtos em estoque nunca seja menor que 0 (zero).
  - Quando a requisição é feita com uma quantidade superior a quantidade em estoque:
    ```json
      [
        {
          "productId": 1,
          "quantity": 100
        }
      ]
    ```
    - sua API deve responder com status http `422` e o seguinte `body`:
    ```json
      { "message": "Such amount is not permitted to sell" }
    ```

</details>
