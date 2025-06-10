const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all products (Public)
router.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

// Add new product (Admin only)
router.post('/admin/products', (req, res) => {
  const { name, description, price, image } = req.body;
  const sql = 'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, description, price, image], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding product', error: err });
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
});

// Delete a product by ID (Admin only)
router.delete('/admin/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting product', error: err });
    res.json({ message: 'Product deleted successfully' });
  });
});

// Get product by ID
router.get('/admin/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
      res.json(results[0]);
    });
  });
  
  // Update product by ID
  router.put('/admin/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?';
    db.query(sql, [name, description, price, image, id], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error updating product', error: err });
      res.json({ message: 'Product updated successfully' });
    });
  });

module.exports = router;
