import express from 'express';
import pool from '../db.mjs';
import { verifyRecaptcha } from '../middleware/recaptcha.mjs';

const router = express.Router();

// Get applications for admin
router.get('/admin/enquiries', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM career ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error("Error fetching careers:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Submit application
router.post('/apply', verifyRecaptcha('career_form'), async (req, res) => {
    try {
        const { name, last_name, email, phone, position_applied, experience, resume, coverletter } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and Email are required' });
        }
        // ✅ Phone validation (exact 10 digits)
        if (!phone || !/^\d{10}$/.test(phone)) {
            return res.status(400).json({ error: 'Mobile number must be exactly 10 digits' });
        }

        // Server-side validation for cover letter (max 200 words)
        if (coverletter) {
            const wordCount = coverletter.trim().split(/\s+/).filter(word => word.length > 0).length;
            if (wordCount > 200) {
                return res.status(400).json({ error: 'Cover letter must be less than 200 words' });
            }
        }



        const [result] = await pool.query(
            'INSERT INTO career (name, last_name, email, phone, position_applied, experience, resume, coverletter) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, last_name, email, phone, position_applied, experience, resume, coverletter]
        );

        res.status(201).json({ id: result.insertId, message: "Application submitted successfully" });
    } catch (err) {
        console.error("Error submitting application:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Admin: Delete application
router.delete('/admin/enquiries/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM career WHERE id = ?', [id]);
        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
