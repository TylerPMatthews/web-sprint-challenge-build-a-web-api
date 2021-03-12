const Actions = require("../api/actions/actions-model");
const Projects = require("../api/projects/projects-model");
const checkID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (!action) {
      res.status(404).json({ message: `No action with id ${id} found` });
    } else {
      req.action = action;
      next();
    }
  } catch (e) {
    next(e);
  }
};

const checkFormat = (req, res, next) => {
  if (!req.body.description || !req.body.notes || !req.body.project_id) {
    res.status(400).json({
      message: "A action requires a project_id, description and notes",
    });
  } else {
    next();
  }
};

const checkFormatTest = (req, res, next) => {
  if (!req.body.description || !req.body.notes) {
    res.status(400).json({
      message: "A action requires a description and notes",
    });
  } else {
    next();
  }
};

const checkProjectID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Projects.get(id);
    if (!action) {
      res.status(404).json({ message: `No Project with id ${id} found` });
    } else {
      req.action = action;
      next();
    }
  } catch (e) {
    next(e);
  }
};

const checkProjectFormat = (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Name and Description required" });
  } else {
    next();
  }
};

module.exports = {
  checkID,
  checkFormat,
  checkProjectID,
  checkProjectFormat,
  checkFormatTest,
};
