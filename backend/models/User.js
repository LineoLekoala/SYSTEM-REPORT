import db from "../config/db.js";

const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
)
`;

db.query(createUserTable, (err) => {
  if (err) console.log("Error creating users table:", err);
});

export default db;
