// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const mw = require("../../middleware/middleware");

const router = express.Router();

//Get all projects
router.get("/", (req, res, next) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      next(err);
    });
});

//Get a single project by ID
router.get("/:id", mw.checkProjectID, (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      next(err);
    });
});

//Post a new project
router.post("/", mw.checkProjectFormat, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      next(err);
    });
});

//Edit a existing project
router.put(
  "/:id",
  mw.checkProjectID,
  mw.checkProjectFormat,
  (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((err) => {
        next(err);
      });
  }
);

//Delete a project
router.delete("/:id", mw.checkProjectID, (req, res, next) => {
  Projects.remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      next(err);
    });
});

//Grab actions for a project
router.get("/:id/actions", mw.checkProjectID, (req, res, next) => {
  Projects.getProjectActions(req.body.project_id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => next(err));
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: `Server error!`,
    error: err.message,
  });
});

module.exports = router;
