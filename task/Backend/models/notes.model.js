const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notesSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    created_by: { type: Schema.Types.ObjectId, ref: "user" },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Notes = mongoose.model("note", notesSchema);

module.exports = { Notes };
