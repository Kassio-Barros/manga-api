const express = require('express')
const router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio')

const Download = require('./models/donwload')

router.get('/:nome/:capitulo', function (req, res) {
  const nome = req.params.nome;
  const capitulo = req.params.capitulo

  const pagina = async () => {
    const totalCap = await Download.totalCap('https://www.mangareader.net/', nome)
    const numPag = await Download.numeroPaginas('https://www.mangareader.net/', nome, capitulo)
    const links = await Download.links('https://www.mangareader.net/', nome, capitulo)

    res.json({
      nome: req.params.nome,
      capitulo: req.params.capitulo,
      totalCapitulos: totalCap[0],
      totalPaginas: numPag,
      urls: links
    })
  }
  pagina()
})


module.exports = router
