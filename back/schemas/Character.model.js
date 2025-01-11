const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  nickName: [
    {
      type: String,
    },
  ],
  //   weapon: [{
  //     weaponType: String /* Melee; Range */,
  //   }],
  //   artifacts: String /* Spear of Sanguinius */,
  //   armor: String /* No armor; Power Armour; Custodian Armour; Necrodermis(necrons)  */,
  status: String /* alive; dead; unknown; */,
  fraction: String /* Imperium; Chaos; Orcs and etc. */,
  occupation: [
    {
      type: String,
    },
  ] /* Job = Imperial Comissar or Chapter Master */,
  psyker:
    Number /* 1 = psyker; 0 = not psyker; -1 = pariah(hollow, anti-psyker) */,
  race: String /* Orc; Human; Eldar; Tau */,
  age: Number /* 10000 years */,
  sex: String,
  created_at: String,
});

characterSchema.pre("save", function (next) {
  this.created_at = Date.now();
  next();
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
