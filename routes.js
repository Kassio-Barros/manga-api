const express = require('express')

const router = express.Router()

const Download = require('./models/download')

router.get('/', async (req, res) => {
  const { nome, capitulo } = req.query

  const totalCap = await Download.totalCap(process.env.SITE_URL, nome)
  await Download.infoPagina(process.env.SITE_URL, nome, capitulo)
  await Download.links()

  res.json({
    nome: req.query.nome,
    capitulo: req.query.capitulo,
    totalCapitulos: totalCap[0],
    totalPaginas: Download.numPage,
    urls: Download.linkImagensCompleto,
  })
})


module.exports = router
