# Infinito Barbearia

Site da Infinito Barbearia, barbearia de bairro na Av. Prof. Papini, em Interlagos (São Paulo).

A página funciona como uma vitrine dos cortes: o cliente vê os trabalhos, lê as avaliações e agenda o horário ali mesmo.

**No ar em:** https://joaomvsa.github.io/barbearia_infinito/

## Seções

- **Início:** chamada principal, nota no Google e atalhos pra agendar ou chamar no WhatsApp
- **Galeria:** fotos dos cortes em mosaico, com visualização em tela cheia
- **Agendar:** agenda do Cal.com incorporada, separada por serviço
- **Avaliações:** depoimentos de clientes no Google
- **Sobre:** o barbeiro Michel, serviços e preços
- **Onde estamos:** endereço, horário de funcionamento e mapa

## Tecnologia

HTML, CSS e JavaScript puro, sem framework, sem backend e sem etapa de build. Hospedado de graça no GitHub Pages.

As fotos são servidas em `.webp`, com uma versão reduzida pra grade e outra maior pra tela cheia.

## Estrutura

```
index.html          conteúdo da página
css/style.css       estilos
js/main.js          galeria, lightbox, menu e agenda
img/cortes/         fotos da galeria
img/espaco/         fachada e interior
img/og-fachada.jpg  imagem de prévia do link
fotos-originais/    fotos originais em .jpeg
```

## Rodando localmente

```bash
python3 -m http.server 8080
```

E abrir http://localhost:8080.

## Manutenção

- As fotos da galeria e os serviços da agenda ficam em listas no início de `js/main.js`.
- Textos, preços e avaliações ficam direto no `index.html`.
