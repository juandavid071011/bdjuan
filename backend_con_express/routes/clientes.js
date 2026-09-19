var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
    db.query('SELECT * FROM clientes', function(err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Error al consultar los clientes'
            });
        }

        res.json(results);
    });
});

module.exports = router;