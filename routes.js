const express = require('express')
const router = express.Router();

router.get('/:nome/:capitulo', function (req, res) {
  res.json({ nome: req.params.nome, capitulo: req.params.capitulo })
})


module.exports = router
