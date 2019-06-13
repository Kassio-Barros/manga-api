const express = require('express')
const router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio')

router.get('/:nome/:capitulo', function (req, res) {
  const nome = req.params.nome;
  const capitulo = req.params.capitulo

  const pagina = async () => {
    const result = await rp(`https://www.mangareader.net/${nome}`)
    const $ = cheerio.load(result);
    const ultimoCapitulo = $('#latestchapters > ul:nth-child(2) > li:nth-child(1) > a:nth-child(2)').text().trim()
    const regexNumero = /\w+$/g

    const resultRegex = ultimoCapitulo.match(regexNumero)
    res.json({
      nome: req.params.nome,
      capitulo: req.params.capitulo,
      totalCapitulos: resultRegex[0]
    })
  }
  pagina()
})


module.exports = router
