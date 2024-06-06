const { Router } = require("express");
const {
  createDescription,
  getAllDescriptions,
  getDescriptionById,
} = require("../model/descriptions");

const { failed, unwrap } = require("../utils");

const descriptionsRouter = Router();

descriptionsRouter.get("/", async (req, res) => {
  const descriptions = await unwrap(getAllDescriptions);

  if (failed(descriptions)) {
    return res.status(500).json({ error: descriptions.message });
  }

  res.json(descriptions);
});

descriptionsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const description = await unwrap(getDescriptionById, id);

  if (failed(description)) {
    return res.status(404).json({ error: "Description not found" });
  }

  res.json(description);
});

descriptionsRouter.post("/", async (req, res) => {
  const { description } = req.body;
  const newDescription = await unwrap(createDescription, { description });

  if (failed(newDescription)) {
    return res.status(400).json({ error: newDescription.message });
  }

  res.json(newDescription);
});

module.exports = descriptionsRouter;
