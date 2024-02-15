import { randomUUID } from "node:crypto";
import postgres from "postgres";
import "dotenv/config";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

export const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export class DatabasePostgres {
  async list(search) {
    let videos;

    if (search) {
      videos = await sql`Select * from videos WHERE title ilike ${
        "%" + search + "%"
      }`;
    } else {
      videos = await sql`Select * from videos`;
    }

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();

    const { title, description, duration } = video;

    await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`DELETE FROM videos WHERE id = ${id}`;
  }
}
