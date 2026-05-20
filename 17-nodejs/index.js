const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const cors    = require('cors');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const db      = require('./database');
const auth    = require('./authMiddleware');

const app = express();
const SECRET_KEY = 'your_secret';
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.'));
        }
    }
});

// Serve static files
app.use('/uploads', express.static(uploadsDir));

// =====================================================
// AUTHENTICATION ENDPOINTS
// =====================================================

// Register
app.post('/auth/register', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run('INSERT INTO users(username, password) VALUES(?, ?)', 
        [username, hashedPassword], 
        function(err) {
            if (err) {
                return res.status(400).json({ error: 'User already exists' });
            }
            res.json({ message: 'User registered successfully', userId: this.lastID });
        }
    );
});

// Login
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Logout
app.post('/auth/logout', auth, (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const expiresAt = Math.floor(Date.now() / 1000) + 3600;

    db.run('INSERT INTO blacklisted_tokens(token, expires_at) VALUES(?, ?)', 
        [token, expiresAt], 
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Logout failed' });
            }
            res.json({ message: 'Logout successful' });
        }
    );
});

// =====================================================
// CHARACTERS ENDPOINTS
// =====================================================

// Get all characters
app.get('/characters', auth, (req, res) => {
    db.all('SELECT * FROM characters', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get character by ID
app.get('/characters/:id', auth, (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM characters WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json(row);
    });
});

// Create character
app.post('/characters', auth, (req, res) => {
    const { name, role, organization, synchronization_rate, image } = req.body;

    if (!name || !role) {
        return res.status(400).json({ error: 'Name and role required' });
    }

    db.run('INSERT INTO characters(name, role, organization, synchronization_rate, image) VALUES(?, ?, ?, ?, ?)',
        [name, role, organization || null, synchronization_rate || 0, image || null],
        function(err) {
            if (err) {
                return res.status(400).json({ error: 'Character already exists' });
            }
            res.json({ message: 'Character created', characterId: this.lastID });
        }
    );
});

// Update character
app.put('/characters/:id', auth, (req, res) => {
    const { id } = req.params;
    const { name, role, organization, synchronization_rate, image } = req.body;

    db.run('UPDATE characters SET name = ?, role = ?, organization = ?, synchronization_rate = ?, image = ? WHERE id = ?',
        [name, role, organization, synchronization_rate, image, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Character not found' });
            }
            res.json({ message: 'Character updated' });
        }
    );
});

// Delete character
app.delete('/characters/:id', auth, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM characters WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json({ message: 'Character deleted' });
    });
});

// Upload image for character
app.post('/characters/:id/images', auth, upload.single('image'), (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
    }

    const filename = req.file.filename;
    const filepath = `/uploads/${filename}`;

    db.run('INSERT INTO images(filename, filepath, entity_type, entity_id) VALUES(?, ?, ?, ?)',
        [filename, filepath, 'characters', id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ 
                message: 'Image uploaded successfully', 
                imageId: this.lastID,
                filepath: filepath,
                filename: filename
            });
        }
    );
});

// Get all images for character
app.get('/characters/:id/images', auth, (req, res) => {
    const { id } = req.params;

    db.all('SELECT * FROM images WHERE entity_type = ? AND entity_id = ?', 
        ['characters', id], 
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        }
    );
});

// Delete image from character
app.delete('/characters/:id/images/:imageId', auth, (req, res) => {
    const { id, imageId } = req.params;

    db.get('SELECT * FROM images WHERE id = ? AND entity_type = ? AND entity_id = ?', 
        [imageId, 'characters', id], 
        (err, image) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!image) {
                return res.status(404).json({ error: 'Image not found' });
            }

            // Delete file from filesystem
            const filePath = path.join(uploadsDir, image.filename);
            fs.unlink(filePath, (fsErr) => {
                if (fsErr) console.error('Error deleting file:', fsErr);
            });

            // Delete record from database
            db.run('DELETE FROM images WHERE id = ?', [imageId], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Image deleted successfully' });
            });
        }
    );
});

// =====================================================
// EVA UNITS ENDPOINTS
// =====================================================

// Get all EVA units
app.get('/eva-units', auth, (req, res) => {
    db.all('SELECT eva_units.id, eva_units.code_name, eva_units.model_type, eva_units.status, eva_units.pilot_id, eva_units.image, characters.name as pilot_name FROM eva_units JOIN characters ON eva_units.pilot_id = characters.id', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get EVA unit by ID
app.get('/eva-units/:id', auth, (req, res) => {
    const { id } = req.params;

    db.get('SELECT eva_units.id, eva_units.code_name, eva_units.model_type, eva_units.status, eva_units.pilot_id, eva_units.image, characters.name as pilot_name FROM eva_units JOIN characters ON eva_units.pilot_id = characters.id WHERE eva_units.id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'EVA unit not found' });
        }
        res.json(row);
    });
});

// Create EVA unit
app.post('/eva-units', auth, (req, res) => {
    const { code_name, model_type, status, pilot_id, image } = req.body;

    if (!code_name || !model_type) {
        return res.status(400).json({ error: 'Code name and model type required' });
    }

    db.run('INSERT INTO eva_units(code_name, model_type, status, pilot_id, image) VALUES(?, ?, ?, ?, ?)',
        [code_name, model_type, status || 'active', pilot_id || null, image || null],
        function(err) {
            if (err) {
                return res.status(400).json({ error: 'EVA unit already exists' });
            }
            res.json({ message: 'EVA unit created', evaUnitId: this.lastID });
        }
    );
});

// Update EVA unit
app.put('/eva-units/:id', auth, (req, res) => {
    const { id } = req.params;
    const { code_name, model_type, status, pilot_id, image } = req.body;

    db.run('UPDATE eva_units SET code_name = ?, model_type = ?, status = ?, pilot_id = ?, image = ? WHERE id = ?',
        [code_name, model_type, status, pilot_id, image, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'EVA unit not found' });
            }
            res.json({ message: 'EVA unit updated' });
        }
    );
});

// Delete EVA unit
app.delete('/eva-units/:id', auth, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM eva_units WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'EVA unit not found' });
        }
        res.json({ message: 'EVA unit deleted' });
    });
});

// Upload image for EVA unit
app.post('/eva-units/:id/images', auth, upload.single('image'), (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
    }

    const filename = req.file.filename;
    const filepath = `/uploads/${filename}`;

    db.run('INSERT INTO images(filename, filepath, entity_type, entity_id) VALUES(?, ?, ?, ?)',
        [filename, filepath, 'eva_units', id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ 
                message: 'Image uploaded successfully', 
                imageId: this.lastID,
                filepath: filepath,
                filename: filename
            });
        }
    );
});

// Get all images for EVA unit
app.get('/eva-units/:id/images', auth, (req, res) => {
    const { id } = req.params;

    db.all('SELECT * FROM images WHERE entity_type = ? AND entity_id = ?', 
        ['eva_units', id], 
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        }
    );
});

// Delete image from EVA unit
app.delete('/eva-units/:id/images/:imageId', auth, (req, res) => {
    const { id, imageId } = req.params;

    db.get('SELECT * FROM images WHERE id = ? AND entity_type = ? AND entity_id = ?', 
        [imageId, 'eva_units', id], 
        (err, image) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!image) {
                return res.status(404).json({ error: 'Image not found' });
            }

            // Delete file from filesystem
            const filePath = path.join(uploadsDir, image.filename);
            fs.unlink(filePath, (fsErr) => {
                if (fsErr) console.error('Error deleting file:', fsErr);
            });

            // Delete record from database
            db.run('DELETE FROM images WHERE id = ?', [imageId], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Image deleted successfully' });
            });
        }
    );
});

// =====================================================
// ANGELS ENDPOINTS
// =====================================================

// Get all angels
app.get('/angels', auth, (req, res) => {
    db.all('SELECT * FROM angels', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get angel by ID
app.get('/angels/:id', auth, (req, res) => {
    const { id } = req.params;

    db.get('SELECT * FROM angels WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Angel not found' });
        }
        res.json(row);
    });
});

// Create angel
app.post('/angels', auth, (req, res) => {
    const { name, angel_number, attack_type, threat_level, eva_unit_id, character_id, image } = req.body;

    if (!name || !angel_number || !eva_unit_id || !character_id) {
        return res.status(400).json({ error: 'Name, angel number, EVA unit ID, and character ID required' });
    }

    db.run('INSERT INTO angels(name, angel_number, attack_type, threat_level, eva_unit_id, character_id, image) VALUES(?, ?, ?, ?, ?, ?, ?)',
        [name, angel_number, attack_type || null, threat_level || null, eva_unit_id, character_id, image || null],
        function(err) {
            if (err) {
                return res.status(400).json({ error: 'Angel already exists' });
            }
            res.json({ message: 'Angel created', angelId: this.lastID });
        }
    );
});

// Update angel
app.put('/angels/:id', auth, (req, res) => {
    const { id } = req.params;
    const { name, angel_number, attack_type, threat_level, eva_unit_id, character_id, image } = req.body;

    db.run('UPDATE angels SET name = ?, angel_number = ?, attack_type = ?, threat_level = ?, eva_unit_id = ?, character_id = ?, image = ? WHERE id = ?',
        [name, angel_number, attack_type, threat_level, eva_unit_id, character_id, image, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Angel not found' });
            }
            res.json({ message: 'Angel updated' });
        }
    );
});

// Delete angel
app.delete('/angels/:id', auth, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM angels WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Angel not found' });
        }
        res.json({ message: 'Angel deleted' });
    });
});

// Upload image for angel
app.post('/angels/:id/images', auth, upload.single('image'), (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
    }

    const filename = req.file.filename;
    const filepath = `/uploads/${filename}`;

    db.run('INSERT INTO images(filename, filepath, entity_type, entity_id) VALUES(?, ?, ?, ?)',
        [filename, filepath, 'angels', id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ 
                message: 'Image uploaded successfully', 
                imageId: this.lastID,
                filepath: filepath,
                filename: filename
            });
        }
    );
});

// Get all images for angel
app.get('/angels/:id/images', auth, (req, res) => {
    const { id } = req.params;

    db.all('SELECT * FROM images WHERE entity_type = ? AND entity_id = ?', 
        ['angels', id], 
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        }
    );
});

// Delete image from angel
app.delete('/angels/:id/images/:imageId', auth, (req, res) => {
    const { id, imageId } = req.params;

    db.get('SELECT * FROM images WHERE id = ? AND entity_type = ? AND entity_id = ?', 
        [imageId, 'angels', id], 
        (err, image) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!image) {
                return res.status(404).json({ error: 'Image not found' });
            }

            // Delete file from filesystem
            const filePath = path.join(uploadsDir, image.filename);
            fs.unlink(filePath, (fsErr) => {
                if (fsErr) console.error('Error deleting file:', fsErr);
            });

            // Delete record from database
            db.run('DELETE FROM images WHERE id = ?', [imageId], function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: 'Image deleted successfully' });
            });
        }
    );
});

// =====================================================
// SERVER
// =====================================================

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});