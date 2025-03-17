const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Chatbot data storage (this could be moved to a separate module if needed)
let preloadedData = null;

// Controller object
const modelController = {
  // Preload data
  preload: (req, res) => {
    preloadedData = req.body.data;
    res.json({ message: "Data preloaded successfully!" });
  },

  // Enhanced Chat
  chat: async (req, res) => {
    const userMessage = req.body.message;

    if (!preloadedData) {
      return res.json({ reply: "No data preloaded yet! Select a part first." });
    }

    try {
      const prompt = `
        You’re an educational AI assistant designed for students learning about engineering and materials science. The user asked: "${userMessage}". Respond based on this context: The ${preloadedData.item} is made by ${preloadedData.details} and crafted with ${preloadedData.materials}. Provide a detailed, study-based response in a point-by-point format using emojis to make it engaging. Each point should teach something valuable about the part, its manufacturing, materials, or usage in a bicycle. Keep the tone conversational and encouraging for learning!

        Format your response as HTML with proper line breaks and tags, like this:
        <p>🧠 <strong>Key Fact</strong>: [Educational fact about the part]</p>
        <p>🔧 <strong>How It’s Made</strong>: [A step or detail about manufacturing]</p>
        <p>🛠️ <strong>Material Spotlight</strong>: [Detail about the material and why it’s used]</p>
        <p>🚴 <strong>Why It Matters</strong>: [How this part impacts the bicycle’s performance or functionality]</p>
        <p>📚 <strong>Fun Fact</strong>: [An interesting tidbit to keep the student engaged]</p>
      `;

      const result = await model.generateContent(prompt);
      const speech = result.response.text();

      res.json({ reply: speech });
    } catch (error) {
      console.error("Error with Generative AI:", error);
      res.json({
        reply: `Whoops, I hit a snag! Let’s talk about the ${preloadedData.item}—what do you want to know?`,
      });
    }
  },

  // Upload a model
  uploadModel: async (req, res) => {
    const gfs = req.app.locals.gfs; // Access gfs from app locals
    if (!gfs) return res.status(503).send("Database not ready");

    try {
      const file = req.file;
      if (!file) return res.status(400).send("No file uploaded");

      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadStream = gfs.openUploadStream(fileName, {
        contentType: file.mimetype,
        metadata: { originalName: file.originalname, size: file.size },
      });

      uploadStream.end(file.buffer);
      uploadStream.on("finish", () => {
        res.json({
          fileId: uploadStream.id,
          message: "Model uploaded successfully",
        });
      });
      uploadStream.on("error", (error) => {
        throw error;
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).send("Upload failed");
    }
  },

  // Fetch a model
  getModel: async (req, res) => {
    const gfs = req.app.locals.gfs;
    const db = req.app.locals.db;
    if (!gfs) return res.status(503).send("Database not ready");

    try {
      const fileId = new ObjectId(req.params.id);
      const files = await db
        .collection("models.files")
        .findOne({ _id: fileId });
      if (!files) return res.status(404).send("Model not found");

      res.set("Content-Type", files.contentType);
      const downloadStream = gfs.openDownloadStream(fileId);
      downloadStream.pipe(res);

      downloadStream.on("error", (error) => {
        console.error("Stream error:", error);
        res.status(500).send("Error streaming model");
      });
    } catch (error) {
      console.error("Fetch error:", error);
      res.status(500).send("Error fetching model");
    }
  },

  // List all models
  getModels: async (req, res) => {
    const gfs = req.app.locals.gfs;
    const db = req.app.locals.db;
    if (!gfs) return res.status(503).send("Database not ready");

    try {
      const files = await db.collection("models.files").find().toArray();
      res.json(
        files.map((file) => ({
          id: file._id,
          name: file.metadata.originalName,
          size: file.metadata.size,
          uploadDate: file.uploadDate,
        }))
      );
    } catch (error) {
      console.error("List error:", error);
      res.status(500).send("Error listing models");
    }
  },
};

module.exports = modelController;
