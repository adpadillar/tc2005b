import express from "express";

import { Feedback } from "../feedback";

export const feedbackRouter = express.Router();

feedbackRouter.get("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.get(parseInt(req.params.id));
    res.json(feedback.map((feedback) => feedback.data));
  } catch (error) {
    res.status(500).json({ error: "Error fetching feedback" });
  }
});

feedbackRouter.post("/", async (req, res) => {
  try {
    const feedback = await Feedback.new(req.body.user_id, {
      feedback: req.body.feedback,
    });
    res.json(feedback.data);
  } catch (error) {
    res.status(500).json({ error: "Error creating feedback" });
  }
});
