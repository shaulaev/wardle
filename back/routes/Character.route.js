const Router = require("express").Router;
const { characterController } = require('../controllers/Character.controller')

const router = Router();

router.get("/", characterController.getAllCharacters);
router.get("/:id", characterController.getCharacterById);
router.get("/name/:name", characterController.getCharactersByMatchingName);
router.get("/random", characterController.getRandomCharacter);
router.get("/reset-last-selected", characterController.resetAllLastSelected);
router.post("/", characterController.createCharacter);
router.delete("/:id", characterController.deleteCharacter);
router.patch('/:id', characterController.changeCharacter);

module.exports = router;