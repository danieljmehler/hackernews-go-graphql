# hackernews-go-graphql

([ref](https://www.howtographql.com/graphql-go/1-getting-started/))

## Starting a MySQL database in WSL2

```shell
sudo service docker start
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=dbpass -e MYSQL_DATABASE=hackernews -d mysql:latest
mysql -u root -p
CREATE DATABASE hackernews;
```

## Running the server

```shell
go run server.go
```

GraphiQL will become available at `http://localhost:8080`.

## Running migrations

```shell
migrate -database mysql://root:dbpass@/hackernews -path internal/pkg/db/migrations/mysql up
```

> __NOTE:__ Should not need to run migrations manually, since it's included in `server.go`.

## Create User

```graphql
mutation {
  createUser(input: {username: "user", password: "123"})
}
```

Returns JWT token.

## Login User

```
mutation {
  login(input:{username:"user", password:"123"})
}
```

## Create Link

```
mutation {
  createLink(input: { title: "real link!", address: "www.graphql.org" }) {
    user {
      name
    }
    title
    address
    id
  }
}
```

Creating links requires the `Authorization` header, with the JWT token as the value.

## Query Links

```graphql
query {
  links {
    title
    address
    id
  }
}
```
