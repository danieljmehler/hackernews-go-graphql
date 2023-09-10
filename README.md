# hackernews-go-graphql
https://www.howtographql.com/graphql-go/1-getting-started/

## Starting a MySQL database in WSL2

```shell
sudo service docker start
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=dbpass -e MYSQL_DATABASE=hackernews -d mysql:latest
mysql -u root -p
CREATE DATABASE hackernews;
```

## Running migrations

```shell
migrate -database mysql://root:dbpass@/hackernews -path internal/pkg/db/migrations/mysql up
```

> __NOTE:__ Should not need to run migrations manually, since it's included in `server.go`.

## Simple query using GraphiQL

```graphql
query {
  links {
    title
    address
    id
  }
}
```

## Simple mutation using GraphiQL

```graphql
mutation create{
  createLink(input: {title: "something", address: "somewhere"}){
    title,
    address,
    id,
  }
}
```