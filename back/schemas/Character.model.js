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
  faction: [{ type: String }] /* Imperium; Chaos; Orcs and etc. */,
  occupation: [
    { type: String },
  ] /* Job = Imperial Comissar or Chapter Master */,
  psyker:
    String /* psyker; not psyker; pariah(hollow, anti-psyker) */,
  race: [{ type: String }] /* Orc; Human; Eldar; Tau */,
  age: String /* 10000 years */,
  gender: String,
  created_at: String,
  homeWorld: String,
  selected: {
    type: Boolean,
    default: false
  },
  lastSelected: { type: Date, default: null },
});

characterSchema.pre("save", function (next) {
  this.created_at = Date.now();
  next();
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
