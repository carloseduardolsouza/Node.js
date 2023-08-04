const express = require("express")

const allControls = require("./controllers/allcontrols")

const router = express.Router()

router.get("/", allControls.getAll)
router.post("/", allControls.addRopas)
router.put("/:id", allControls.upRoupas)
router.delete("/:id", allControls.deleteRoupa)

module.exports = router