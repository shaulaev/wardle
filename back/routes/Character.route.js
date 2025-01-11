const Router = require("express").Router;
const { characterController } = require('../controllers/Character.controller')

const router = Router();

router.get("/", characterController.getAllCharacters);
router.post("/", characterController.createCharacter);
router.delete("/:id", characterController.deleteCharacter);
router.patch('/:id', characterController.changeCharacter)

module.exports = router;