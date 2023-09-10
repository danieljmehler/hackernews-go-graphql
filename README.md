# hackernews-go-graphql
https://www.howtographql.com/graphql-go/1-getting-started/

## Starting a MySQL database in WSL2

```shell
sudo service docker start
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=dbpass -e MYSQL_DATABASE=hackernews -d mysql:latest
```

## Running migrations

```shell
migrate -database mysql://root:dbpass@/hackernews -path internal/pkg/db/migrations/mysql up
```

## Simple query using GraphiQL

```graphql
query {
	links{
    title
    address,
    user{
      name
    }
  }
}
```

## Simple mutation using GraphiQL

```graphql
mutation {
  createLink(input: {title: "new link", address:"http://address.org"}){
    title,
    user{
      name
    }
    address
  }
}
```