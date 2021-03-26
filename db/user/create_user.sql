INSERT INTO helo_users (username, hash, profile_pic) 
VALUES ($1, $2, $`https://robohash.org/${username}.png`)
RETURNING *;