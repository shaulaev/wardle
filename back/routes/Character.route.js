const Router = require("express").Router;
const { characterController } = require('../controllers/Character.controller')

const router = Router();

router.get("/", characterController.getAllCharacters);
router.get("/name/:name", characterController.getCharactersByMatchingName);
router.get("/classic-game", characterController.classicGameGuess);
// router.get("/:id", characterController.getCharacterById);
router.post("/", characterController.createCharacter);
router.delete("/:id", characterController.deleteCharacter);
router.patch('/:id', characterController.changeCharacter);
router.get("/reset-last-selected", characterController.resetAllLastSelected);
router.get("/random-character", characterController.getRandomCharacter);

module.exports = router;