import db from "../db";

import { z } from "zod";
import { userRow } from "../user";

export const descriptionRow = z.object({
  id: z.number(),
  description: z.string(),
  prescription: z.string(),
  userd_id: z.number(),
});

export class Description {
  data: z.infer<typeof descriptionRow>;

  constructor(data: z.infer<typeof descriptionRow>) {
    this.data = data;
  }

  static async get(id: number) {
    const query =
      "SELECT U.*, D.* FROM users U JOIN description D ON U.id = D.userd_id WHERE U.id = $1;";

    const { rows } = await db.query(query, [id]);

    const { success, data: rowData } = descriptionRow
      .merge(userRow)
      .array()
      .safeParse(rows);

    if (!success) throw new Error("Failed parsing description row data");

    return rowData.map((data) => new Description(data));
  }

  static async new(
    userId: number,
    data: { description: string; prescription: string }
  ) {
    console.log("Description.new()");
    const query =
      "INSERT INTO description (description, prescription, userd_id) VALUES ($1, $2, $3) RETURNING *";

    const { rows } = await db.query(query, [
      data.description,
      data.prescription,
      userId,
    ]);

    const { success, data: rowData } = descriptionRow.safeParse(rows[0]);

    if (!success) throw new Error("Failed parsing description row data");

    return new Description(rowData);
  }
}
