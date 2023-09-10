package links

import (
	"log"

	database "github.com/danieljmehler/hackernews/internal/pkg/db/mysql"
	"github.com/danieljmehler/hackernews/internal/users"
)

// #1 - definition of struct that represent a link.
type Link struct {
	ID      string
	Title   string
	Address string
	User    *users.User
}

// #2 - function that insert a Link object into database and returns it’s ID.
func (link Link) Save() int64 {
	/**
	 * #3 - our sql query to insert link into Links table.
	 * You see we used prepare here before db.Exec.
	 * The prepared statements helps you with security and also performance improvement in some cases.
	 * You can read more about it [here](https://www.postgresql.org/docs/9.3/sql-prepare.html).
	 */
	stmt, err := database.Db.Prepare("INSERT INTO Links(Title,Address,UserID) VALUES(?,?,?)")
	if err != nil {
		log.Fatal(err)
	}

	// #4 - execution of our sql statement.
	res, err := stmt.Exec(link.Title, link.Address, link.User.ID)
	if err != nil {
		log.Fatal(err)
	}

	// #5 - retrieving Id of inserted Link.
	id, err := res.LastInsertId()
	if err != nil {
		log.Fatal("Error:", err.Error())
	}
	log.Print("Row inserted!")
	return id
}

func GetAll() []Link {
	stmt, err := database.Db.Prepare("select L.id, L.title, L.address, L.UserID, U.Username from Links L inner join Users U on L.UserID = U.ID")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	rows, err := stmt.Query()
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var links []Link
	var username string
	var id string
	for rows.Next() {
		var link Link
		err := rows.Scan(&link.ID, &link.Title, &link.Address, &id, &username)
		if err != nil {
			log.Fatal(err)
		}
		link.User = &users.User{
			ID:       id,
			Username: username,
		}
		links = append(links, link)
	}
	if err = rows.Err(); err != nil {
		log.Fatal(err)
	}
	return links
}
