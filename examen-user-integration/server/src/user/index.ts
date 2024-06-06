import { z } from "zod";
import db from "../db";

export const userRow = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  age: z.number().nullable(),
  bio: z.string().nullable(),
});

export class User {
  data: z.infer<typeof userRow>;

  constructor(data: z.infer<typeof userRow>) {
    this.data = data;
  }

  static async all() {
    try {
      console.log("User.all()");
      const query = "SELECT * FROM users ORDER BY id ASC";
      const { rows } = await db.query(query);

      const { success, data: rowsData } = userRow.array().safeParse(rows);

      if (!success) throw new Error(`Failed parsing user data`);

      return rowsData.map((row) => new User(row));
    } catch (error) {
      console.error("User.all() error", error);
      throw error;
    }
  }

  static async get(id: number) {
    const query = "SELECT * FROM users WHERE id = $1";

    const { rows } = await db.query(query, [id]);

    const { success, data: rowData } = userRow.safeParse(rows[0]);

    if (!success) throw new Error(`Failed parsing user data`);

    return new User(rowData);
  }

  static async new(data: {
    name: string;
    email: string;
    address: string;
    phone: string;
    age: number;
    bio: string;
  }) {
    const query =
      "INSERT INTO users (name, email, address, phone, age, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    console.log(data);
    const { rows } = await db.query(query, [
      data.name,
      data.email,
      data.address ?? null,
      data.phone ?? null,
      data.age ?? null,
      data.bio ?? null,
    ]);

    const { success, data: rowData } = userRow.safeParse(rows[0]);

    if (!success) throw new Error(`Failed parsing user data`);

    return new User(rowData);
  }
}
