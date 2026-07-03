const expressAsyncHandler = require("express-async-handler");
const Language = require("../models/Language");

// Slug match -> translation module 
// all articles should have same slug (start in next)
const addLanguage = expressAsyncHandler(

    async (req, res)=>{
        try{

            const {name, code} = req.body;

            if(!name || !code){
                res.status(400).json({message: "Language name or code is required"});
                return;
            }
            const language = new Language({
                name: name,
                code : code
            });

            await language.save();

            res.status(201).json(language);
        }catch(err){
            console.log("Language insert err", err);
            res.status(500).json({message:"Server error, try again"});
        }
    }
)

const getLanguages = expressAsyncHandler(async (req, res) => {
  try {
    const languages = await Language.find().sort({ name: 1 });

    res.status(200).json(languages);
  } catch (err) {
    console.log("Fetch language error:", err);
    res.status(500).json({ message: "Server error, try again" });
  }
});

const getLanguageById = expressAsyncHandler(async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    res.status(200).json(language);
  } catch (err) {
    console.log("Fetch language error:", err);
    res.status(500).json({ message: "Server error, try again" });
  }
});

const updateLanguage = expressAsyncHandler(async (req, res) => {
  try {
    const { name, code } = req.body;

    const language = await Language.findById(req.params.id);

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    if (name) language.name = name;
    if (code) language.code = code;

    await language.save();

    res.status(200).json(language);
  } catch (err) {
    console.log("Update language error:", err);
    res.status(500).json({ message: "Server error, try again" });
  }
});

const deleteLanguage = expressAsyncHandler(async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    await language.deleteOne();

    res.status(200).json({ message: "Language deleted successfully" });
  } catch (err) {
    console.log("Delete language error:", err);
    res.status(500).json({ message: "Server error, try again" });
  }
});

module.exports = {
  addLanguage,
  getLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
};