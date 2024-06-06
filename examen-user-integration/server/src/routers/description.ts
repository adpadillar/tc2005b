import express from "express";

import { Description } from "../description";

export const descriptionRouter = express.Router();

descriptionRouter.get("/:id", async (req, res) => {
  try {
    const description = await Description.get(parseInt(req.params.id));
    res.json(description.map((description) => description.data));
  } catch (error) {
    res.status(500).json({ error: "Error fetching description" });
  }
});

descriptionRouter.post("/:id", async (req, res) => {
  try {
    const description = await Description.new(parseInt(req.params.id), {
      description: req.body.description,
      prescription: req.body.prescription,
    });
    res.json(description.data);
  } catch (error) {
    res.status(500).json({ error: "Error creating description" });
  }
});
