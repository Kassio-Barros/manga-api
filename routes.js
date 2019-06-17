const express = require('express')

const router = express.Router()

const Download = require('./models/download')

router.get('/', async (req, res) => {
  const { nome, capitulo } = req.query

  const totalCap = await Download.totalCap(process.env.SITE_URL, nome)
  const numPag = await Download.numeroPaginas(process.env.SITE_URL, nome, capitulo)
  const links = await Download.links(process.env.SITE_URL, nome, capitulo)

  res.json({
    nome: req.params.nome,
    capitulo: req.params.capitulo,
    totalCapitulos: totalCap[0],
    totalPaginas: numPag,
    urls: links,
  })
})


module.exports = router
