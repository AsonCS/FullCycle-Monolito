# Full Cycle - Monolito (Full Cycle 3.0 Course)

<div align="center">
    <img src="https://img.shields.io/badge/Typescript-404D59?style=for-the-badge&logo=typescript&logoColor=%2361DAFB" />
</div>

## Invoice module Challenge

- [Invoice](/src/modules/invoice/)
  - [Invoice Facade](/src/modules/invoice/facade/invoice.facade.interface.ts) - [Tests](/src/modules/invoice/facade/invoice.facade.spec.ts)
  - [Invoice FindUseCase](/src/modules/invoice/usecase/find-invoice/find-invoice.usecase.ts) - [Tests](/src/modules/invoice/usecase/find-invoice/find-invoice.usecase.spec.ts)
  - [Invoice FindAllUseCase](/src/modules/invoice/usecase/find-all-invoice/find-all-invoice.usecase.ts) - [Tests](/src/modules/invoice/usecase/find-all-invoice/find-all-invoice.usecase.spec.ts)
  - [Invoice GenerateInvoiceUseCase](/src/modules/invoice/usecase/generate-invoice/generate-invoice.usecase.ts) - [Tests](/src/modules/invoice/usecase/generate-invoice/generate-invoice.usecase.spec.ts)

## API Challenge

- [api](/src/api/) - [Tests](/src/api/routes/e2e.spec.ts)
  - [/checkout](/src/api/routes/checkout/checkout.route.ts) - [Tests](/src/api/routes/checkout/checkout.route.spec.ts)
  - [/clients](/src/api/routes/clients/clients.route.ts) - [Tests](/src/api/routes/clients/clients.route.spec.ts)
  - [/invoice](/src/api/routes/invoice/invoice.route.ts) - [Tests](/src/api/routes/invoice/invoice.route.spec.ts)
  - [/products](/src/api/routes/products/products.route.ts) - [Tests](/src/api/routes/products/products.route.spec.ts)

## API Endpoints

### /checkout

- [GET /checkout](/src/api/routes/checkout/checkout.http)
  - ```json
      [
        {
          "id": "70a6ae76-2dd6-4649-944d-01b990e6ce17",
          "client": {
            "id": "31121a80-0bff-449c-89fb-972fb23fdd4c",
            "name": "Lucian",
            "email": "lucian@xpto.com",
            "address": {
              "street": "Rua 123",
              "number": "99",
              "complement": "Casa Verde",
              "city": "Criciúma",
              "state": "SC",
              "zipCode": "88888-888"
            }
          },
          "products": [
            {
              "id": "7deb0a53-401e-4b4d-b775-1c1b536b12c6",
              "name": "Table",
              "description": "Table description",
              "salesPrice": 200
            },
            {
              "id": "a6b99b7c-3af0-424e-bd62-da13a7f7d2f4",
              "name": "Chair",
              "description": "Chair description",
              "salesPrice": 100
            }
          ],
          "status": "approved"
        },
        {
          "id": "34a0db9b-c538-4ec9-8ffb-c2491a78e246",
          "client": {
            "id": "31121a80-0bff-449c-89fb-972fb23fdd4c",
            "name": "Lucian",
            "email": "lucian@xpto.com",
            "address": {
              "street": "Rua 123",
              "number": "99",
              "complement": "Casa Verde",
              "city": "Criciúma",
              "state": "SC",
              "zipCode": "88888-888"
            }
          },
          "products": [
            {
              "id": "810b10c0-cacd-4c52-a996-0fa552465a40",
              "name": "Fork",
              "description": "Fork description",
              "salesPrice": 30
            }
          ],
          "status": "pending"
        }
      ]
    ```
- [POST /checkout](/src/api/routes/checkout/checkout.http)
  - ```json
      {
        "clientId": "31121a80-0bff-449c-89fb-972fb23fdd4c",
        "products": [
          {
            "productId": "a6b99b7c-3af0-424e-bd62-da13a7f7d2f4"
          },
          {
            "productId": "7deb0a53-401e-4b4d-b775-1c1b536b12c6"
          }
        ]
      }
    ```

### /client

- [GET /clients](/src/api/routes/clients/client.http)
  - ```json
      [
        {
          "id": "31121a80-0bff-449c-89fb-972fb23fdd4c",
          "name": "Lucian",
          "email": "lucian@xpto.com",
          "document": "1234-5678",
          "address": {
            "street": "Rua 123",
            "number": "99",
            "complement": "Casa Verde",
            "city": "Criciúma",
            "state": "SC",
            "zipCode": "88888-888"
          },
          "createdAt": "2025-06-21T18:31:19.971Z",
          "updatedAt": "2025-06-21T18:31:19.971Z"
        }
      ]
    ```
- [GET /clients/:id](/src/api/routes/clients/client.http)
  - ```json
      {
        "id": "31121a80-0bff-449c-89fb-972fb23fdd4c",
        "name": "Lucian",
        "email": "lucian@xpto.com",
        "document": "1234-5678",
        "address": {
          "street": "Rua 123",
          "number": "99",
          "complement": "Casa Verde",
          "city": "Criciúma",
          "state": "SC",
          "zipCode": "88888-888"
        },
        "createdAt": "2025-06-21T18:31:19.971Z",
        "updatedAt": "2025-06-21T18:31:19.971Z"
      }
    ```
- [POST /clients](/src/api/routes/clients/client.http)
  - ```json
      {
        "name": "Lucian",
        "email": "lucian@xpto.com",
        "document": "1234-5678",
        "address": {
            "street": "Rua 123",
            "number": "99",
            "complement": "Casa Verde",
            "city": "Criciúma",
            "state": "SC",
            "zipCode": "88888-888"
        }
      }
    ```

### /invoice

- [GET /invoice](/src/api/routes/invoice/invoice.http)
  - ```json
      [
        {
          "id": "2c8bf9a8-8fb5-4e0d-809f-558f31ae3b25",
          "name": "Lucian",
          "document": "1234-5678",
          "address": {
            "street": "Rua 123",
            "number": "99",
            "complement": "Casa Verde",
            "city": "Criciúma",
            "state": "SC",
            "zipCode": "88888-888"
          },
          "items": [
            {
              "id": "7deb0a53-401e-4b4d-b775-1c1b536b12c6",
              "name": "Table",
              "price": 200
            },
            {
              "id": "a6b99b7c-3af0-424e-bd62-da13a7f7d2f4",
              "name": "Chair",
              "price": 100
            }
          ],
          "total": 300,
          "createdAt": "2025-06-21T18:36:04.985Z"
        }
      ]
    ```
- [GET /invoice/:id](/src/api/routes/invoice/invoice.http)
  - ```json
      {
        "id": "2c8bf9a8-8fb5-4e0d-809f-558f31ae3b25",
        "name": "Lucian",
        "document": "1234-5678",
        "address": {
          "street": "Rua 123",
          "number": "99",
          "complement": "Casa Verde",
          "city": "Criciúma",
          "state": "SC",
          "zipCode": "88888-888"
        },
        "items": [
          {
            "id": "7deb0a53-401e-4b4d-b775-1c1b536b12c6",
            "name": "Table",
            "price": 200
          },
          {
            "id": "a6b99b7c-3af0-424e-bd62-da13a7f7d2f4",
            "name": "Chair",
            "price": 100
          }
        ],
        "total": 300,
        "createdAt": "2025-06-21T18:36:04.985Z"
      }
    ```
- [POST /invoice](/src/api/routes/invoice/invoice.http)
  - ```json
      {
        "name": "Invoice name",
        "document": "Invoice document",
        "street": "Address street",
        "number": "Address street number",
        "complement": "Address complement",
        "city": "Address city",
        "state": "Address state",
        "zipCode": "Address zip code",
        "items": [
            {
                "id": "Item 1",
                "name": "Item name",
                "price": 100
            },
            {
                "id": "Item 2",
                "name": "Item name 2",
                "price": 200
            }
        ]
      }
    ```

### /products

- [GET /products](/src/api/routes/products/products.http)
  - ```json
      [
        {
          "id": "a6b99b7c-3af0-424e-bd62-da13a7f7d2f4",
          "name": "Chair",
          "description": "Chair description",
          "purchasePrice": 100,
          "stock": 10
        },
        {
          "id": "7deb0a53-401e-4b4d-b775-1c1b536b12c6",
          "name": "Table",
          "description": "Table description",
          "purchasePrice": 200,
          "stock": 20
        },
        {
          "id": "810b10c0-cacd-4c52-a996-0fa552465a40",
          "name": "Fork",
          "description": "Fork description",
          "purchasePrice": 30,
          "stock": 3
        }
      ]
    ```
- [POST /products](/src/api/routes/products/products.http)
  - ```json
      {
        "name": "Fork",
        "description": "Fork description",
        "purchasePrice": 30,
        "salesPrice": 30,
        "stock": 3
      }
    ```
