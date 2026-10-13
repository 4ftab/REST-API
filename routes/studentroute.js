const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GET all students
router.get("/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        res.json(results);
    });

});

// CREATE student
router.post("/students", (req, res) => {

    const { name, email, age } = req.body;

    const sql = `
        INSERT INTO students (name, email, age)
        VALUES (?, ?, ?)`;

    db.query(sql, [name, email, age], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        res.status(201).json({
            message: "Student created successfully",
            studentId: result.insertId
        });
    });

});

// GET student by Roll_No
router.get("/students/:Roll_no", (req, res) => {

    const { Roll_no } = req.params;

    const sql = "SELECT * FROM students WHERE Roll_no = ?";

    db.query(sql, [Roll_no], (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(results[0]);
    });

});

// UPDATE student
router.put("/students/:Roll_no", (req, res) => {

    const { Roll_no } = req.params;
    const { name, email, age } = req.body;

    const sql = `
        UPDATE students
        SET name = ?, email = ?, age = ?
        WHERE Roll_no = ?
    `;

    db.query(sql, [name, email, age, Roll_no], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully"
        });
    });

});

// DELETE student
router.delete("/students/:Roll_no", (req, res) => {

    const { Roll_no } = req.params;

    const sql = "DELETE FROM students WHERE Roll_no = ?";

    db.query(sql, [Roll_no], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    });

});

module.exports = router;