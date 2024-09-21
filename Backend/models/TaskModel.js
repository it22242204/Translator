const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    input_text: {
      type: String,
      require: true,
    },
    translated_text: {
      type: String,
      require: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
