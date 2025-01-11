const Character = require('../schemas/Character.model')
const mongoose = require("mongoose");

module.exports.characterController = {
  getAllCharacters: async (req, res) => {
    try {
      const allCharacters = await Character.find({});

      return res.status(200).json(allCharacters);
    } catch (error) {
      return res.json({
        status: 400,
        message: "Не удалось найти персонажа",
        error,
      });
    }
  },

  createCharacter: async (req, res) => {
    try {
      await Character.create(req.body);

      return res.json({ status: 200, message: "Персонаж успешно создан" });
    } catch (error) {
      return res.json({
        status: 400,
        message: "Не удалось создать персонажа",
        error,
      });
    }
  },

  deleteCharacter: async (req, res) => {
    try {
      const character = await Character.findByIdAndDelete(req.params.id);

      if (!character) {
        return res
          .status(404)
          .json({ status: 404, message: "Персонаж не найден" });
      }

      return res
        .status(200)
        .json({ status: 200, message: "Персонаж успешно удален" });
    } catch (error) {
      console.error("Ошибка удаления персонажа:", error); // Лог ошибки
      return res
        .status(500)
        .json({ status: 500, message: "Не удалось удалить персонажа", error });
    }
  },

  changeCharacter: async (req, res) => {
    try {
      const character = await Character.findByIdAndUpdate(req.params.id, req.body);

      if (!character) {
        return res
          .status(404)
          .json({ status: 404, message: "Персонаж не найден" });
      }

      return res
        .status(200)
        .json({ status: 200, message: "Персонаж успешно изменен" });
    } catch (error) {
      console.error("Ошибка изменения персонажа:", error); // Лог ошибки
      return res
        .status(500)
        .json({ status: 500, message: "Не удалось изменить персонажа", error });
    }
  },
};