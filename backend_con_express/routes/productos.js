var express = require('express');
var router = express.Router();

var db = require('../db');

// GET - Listar todos los productos
router.get('/', function(req, res) {
    db.query('SELECT * FROM productos', function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Error al consultar los productos'
            });
        }

        res.json(results);
    });
});

// POST - Crear un producto
router.post('/', function(req, res) {
    const { nomProducto, cantidad, precio } = req.body;

    const sql = `
        INSERT INTO productos (nomProducto, cantidad, precio)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nomProducto, cantidad, precio], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Error al crear el producto'
            });
        }

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            id_producto: result.insertId
        });
    });
});

// PUT - Actualizar un producto
router.put('/:id', function(req, res) {
    const { nomProducto, cantidad, precio } = req.body;
    const { id } = req.params;

    const sql = `
        UPDATE productos
        SET nomProducto = ?, cantidad = ?, precio = ?
        WHERE id_producto = ?
    `;

    db.query(sql, [nomProducto, cantidad, precio, id], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Error al actualizar el producto'
            });
        }

        res.json({
            mensaje: 'Producto actualizado correctamente'
        });
    });
});

// DELETE - Eliminar un producto
router.delete('/:id', function(req, res) {
    const { id } = req.params;

    db.query(
        'DELETE FROM productos WHERE id_producto = ?',
        [id],
        function(err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    error: 'Error al eliminar el producto'
                });
            }

            res.json({
                mensaje: 'Producto eliminado correctamente'
            });
        }
    );
});

module.exports = router;