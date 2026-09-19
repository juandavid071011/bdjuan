var express = require('express');
var router = express.Router();

var db = require('../db');

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

module.exports = router;