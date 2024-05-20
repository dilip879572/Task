const { Notes } = require("../models/notes.model.js");
exports.createNotes = async (req, res) => {
  try {
    const { title, description } = req.body;
    let savedNotes = new Notes(req.body);
    let result = await savedNotes.save();
    return res.status(201).json({
      success: true,
      message: "Notes created successfully",
      notes: result,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    return res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      notes: notes,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.deleteNotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    await Notes.findByIdAndDelete(noteId);
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.updateNotes = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
