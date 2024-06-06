import { z } from "zod";
import db from "../db";
import { userRow } from "../user";

export const feedbackRow = z.object({
  id: z.number(),
  feedback: z.string(),
  user_id: z.number(),
});

export class Feedback {
  data: z.infer<typeof feedbackRow>;

  constructor(data: z.infer<typeof feedbackRow>) {
    this.data = data;
  }

  static async get(id: number) {
    const query =
      "SELECT U.*,  D.* FROM users U JOIN feedback D ON U.id = d.user_id WHERE U.id = $1;";
    const { rows } = await db.query(query, [id]);
    const { success, data: rowData } = feedbackRow
      .merge(userRow)
      .array()
      .safeParse(rows);

    if (!success) throw new Error("Failed parsing feedback row data");

    return rowData.map((row) => new Feedback(row));
  }

  static async new(userId: number, data: { feedback: string }) {
    try {
      const query =
        "INSERT INTO feedback (feedback, user_id) VALUES ($1, $2) RETURNING *";

      const { rows } = await db.query(query, [data.feedback, userId]);
      const { success, data: rowData } = feedbackRow.safeParse(rows[0]);

      if (!success) throw new Error("Failed parsing feedback row data");

      return new Feedback(rowData);
    } catch (error) {
      console.error(error);
      throw new Error("Error creating feedback");
    }
  }
}
