# Infinito Barbearia

Site de uma página da Infinito Barbearia (Interlagos, SP). HTML, CSS e JS puro, sem build.

## Ver no computador

```bash
python3 -m http.server 8080
```

Depois abra http://localhost:8080 no navegador.

## Estrutura

- `index.html`: todo o conteúdo (textos, avaliações, preços, endereço)
- `css/style.css`: visual
- `js/main.js`: galeria, lightbox, menu e agenda do Cal.com
- `img/cortes/`: fotos da galeria (`.webp` grande + `-thumb.webp` pequena)
- `img/espaco/`: fachada e interior
- `img/og-fachada.jpg`: imagem que aparece ao compartilhar o link no WhatsApp
- `fotos-originais/`: as fotos originais em `.jpeg`, guardadas pra editar depois

## Tarefas comuns

- **Adicionar foto na galeria:** veja o comentário no topo de `js/main.js` (lista `GALERIA`).
- **Adicionar serviço na agenda:** crie o evento no Cal.com e adicione na lista `SERVICOS_CAL` em `js/main.js`.
- **Mudar preços:** procure por `R$` no `index.html` (seção Sobre) e em `SERVICOS_CAL`.
- **Mudou o endereço do site?** Troque `https://joaomvsa.github.io/barbearia_infinito/` no topo do `index.html`.
