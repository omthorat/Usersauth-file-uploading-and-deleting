const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/fileuploading", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB Schema for User
const userSchema = new mongoose.Schema({
  username: String,
  email:String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// MongoDB Schema File
const fileSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  filename: String,
  fileCode: Number,
});

const File = mongoose.model('File', fileSchema);

// Multer Configuration File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Register User
app.post('/register', async (req, res) => {
  try {
    const { username,email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email,password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Middleware 
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
  });
};

// Upload File
app.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  console.log('req.file:', req.file);
console.log('req.user:', req.user);
  try {
    const { originalname } = req.file;
    const { userId } = req.user;
    const fileCode = Math.floor(100000 + Math.random() * 900000);
    const file = new File({ userId, filename: originalname, fileCode });
    await file.save();
    res.status(201).json({ fileCode });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error ${error.message}');
  }
});

app.get('/files', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const files = await File.find({ userId });
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete File
app.delete('/delete/:fileCode', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { fileCode } = req.params;
    await File.findOneAndDelete({ userId, fileCode });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error ${error.message}');
  }
});

// Serve Uploaded Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
