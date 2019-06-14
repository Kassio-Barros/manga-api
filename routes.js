const express = require('express')
const router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio')

router.get('/:nome/:capitulo', function (req, res) {
  const nome = req.params.nome;
  const capitulo = req.params.capitulo
  const linksImagens = new Array
  const linkImagensCompleto = new Array

  const pagina = async () => {
    const paginaInicial = await rp(`https://www.mangareader.net/${nome}`)
    const $ = cheerio.load(paginaInicial);
    const ultimoCapitulo = $('#latestchapters > ul:nth-child(2) > li:nth-child(1) > a:nth-child(2)').text().trim()
    const regexNumero = /\w+$/g

    const resultRegex = ultimoCapitulo.match(regexNumero)

    const paginaManga = await rp(`https://www.mangareader.net/${nome}/${capitulo}`)
    const $2 = cheerio.load(paginaManga);

    const numeroPaginas = $2('#pageMenu').children().last().text()
    $2('#pageMenu').find('option').each(function (i, elem) {
      linksImagens[i] = $(this).val();
    })

    linksImagens.forEach((i, elem) => {
      linkImagensCompleto.push({ pagina: elem + 1, url: `https:/www.mangareader.net${[i]}` })
    })

    res.json({
      nome: req.params.nome,
      capitulo: req.params.capitulo,
      totalCapitulos: resultRegex[0],
      totalPaginas: numeroPaginas,
      urls: linkImagensCompleto
    })
  }
  pagina()
})


module.exports = router
