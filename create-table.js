import { sql } from "./database.js";

// sql`DROP TABLE IF EXISTS videos;`.then(() => console.log("Tabela apagada"));

sql`CREATE TABLE videos (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  duration INTEGER
);`.then(() => {
  console.log("Tabela videos criada");
});
