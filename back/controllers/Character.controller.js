const Character = require("../schemas/Character.model");
const mongoose = require("mongoose");
const compareFields = require("../classicGame/index");

module.exports.characterController = {
  getAllCharacters: async (req, res) => {
    try {
      const allCharacters = await Character.find(req.query);

      return res.status(200).json(allCharacters);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Не удалось найти персонажа",
        error,
      });
    }
  },

  getCharactersByMatchingName: async (req, res) => {
    try {
      const findedCharacters = await Character.find({
        name: { $regex: req.params.name, $options: "i" },
      });

      return res.status(200).json(findedCharacters);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Не удалось найти персонажа",
        error,
      });
    }
  },

  getCharacterById: async (req, res) => {
    try {
      const findedCharacter = await Character.findById(req.params.id);

      return res.status(200).json(findedCharacter);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Не удалось найти персонажа",
        error,
      });
    }
  },

  createCharacter: async (req, res) => {
    try {
      const data = req.body;

      // Проверяем, массив это или одиночный объект
      if (Array.isArray(data)) {
        // Если массив, используем insertMany
        await Character.insertMany(data);
      } else {
        // Если объект, создаём одного персонажа
        await Character.create(data);
      }

      return res.status(200).json({
        status: 200,
        message: "Персонаж(и) успешно создан(ы)",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Не удалось создать персонажа(ей)",
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
      const character = await Character.findByIdAndUpdate(
        req.params.id,
        req.body
      );

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

  resetAllLastSelected: async (req, res) => {
    try {
      // Обновляем поле lastSelected у всех персонажей
      const result = await Character.updateMany(
        {},
        { $set: { lastSelected: null } }
      );
      res.json({
        message: "Field updated for all characters",
        modifiedCount: result.modifiedCount, // Количество обновленных документов
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getRandomCharacter: async (req, res) => {
    try {
      // Получаем текущую дату и дату неделю назад
      const now = new Date();
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Считаем количество персонажей, которые не были выбраны за последнюю неделю
      const count = await Character.countDocuments({
        $or: [
          { lastSelected: { $lt: oneWeekAgo } }, // Выбираем тех, кто был выбран более недели назад
          { lastSelected: null }, // Или никогда не был выбран
        ],
      });

      if (count === 0) {
        return res.status(404).json({ message: "No available characters" });
      }

      // Выбираем случайный индекс
      const randomIndex = Math.floor(Math.random() * count);

      // Находим случайного персонажа, исключая тех, кто был выбран за последнюю неделю
      const randomCharacter = await Character.findOne({
        $or: [{ lastSelected: { $lt: oneWeekAgo } }, { lastSelected: null }],
      }).skip(randomIndex);

      if (randomCharacter) {
        // Обновляем дату последнего выбора персонажа
        randomCharacter.lastSelected = now;
        randomCharacter.selected = true;
        await randomCharacter.save();

        res.json(randomCharacter);
      } else {
        res.status(404).json({ message: "No characters found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  classicGameGuess: async (req, res) => {
    const guessingName = req.body.name;

    if(!guessingName) return res
      .status(304).json('Нужно ввести имя')

    function AnswerFormer(obj) {
      compareFields.forEach((item) => {
        this[item] = obj[item];
      });

      return this;
    }

    function compareCharacters(firstChar, secondChar) {
      const result = {};

      compareFields.forEach((field) => {
        if (Array.isArray(firstChar[field])) {
          result[field] = firstChar[field].map((item, index) => {
            return item === secondChar[field][index];
          });
        } else {
          result[field] = firstChar[field] === secondChar[field];
        }
      });

      return result;
    }

    const characterByName = await Character.findOne({ name: guessingName });
    const correctCharacter = await Character.findOne({ selected: true });

    if (!characterByName) return res.status(304).json("Персонаж с таким именем не найден");
    if (!correctCharacter)
      return res.status(304).json("Персонаж для игры пока не выбран");


    if (characterByName.name === correctCharacter.name) {
      return res
        .status(200)
        .json(
          new AnswerFormer(compareCharacters(characterByName, correctCharacter))
        );
    } else {
      return res
        .status(200)
        .json(new AnswerFormer(compareCharacters(characterByName, correctCharacter)))
    }

    /*
      Поля для сравнения

      name,
      gender, 
      status,
      race,
      faction,
      occupation,
      homeWorld,
      age
    */
  },
};
