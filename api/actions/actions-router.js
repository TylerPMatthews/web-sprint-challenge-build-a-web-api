// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const mw = require("../../middleware/middleware");

const router = express.Router();

//Get all actions
router.get("/", (req, res, next) => {
  Actions.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

//Get a single action by ID
router.get("/:id", mw.checkID, (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

//Post a new action
router.post("/", mw.checkFormat, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

//Edit a action
router.put("/:id", mw.checkID, mw.checkFormatTest, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

//Delete a action
router.delete("/:id", mw.checkID, (req, res, next) => {
  Actions.remove(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: `Server error!`,
    error: err.message,
  });
});

module.exports = router;
