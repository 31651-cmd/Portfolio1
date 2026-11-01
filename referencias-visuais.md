# Referências Visuais e Diretrizes de Design
**Portfólio Pessoal de Enrico Pereira Bonato**

Este documento detalha as três referências visuais que nortearam o desenvolvimento do portfólio pessoal de Enrico Pereira Bonato, destacando os elementos observados, as escolhas de interação e a fundamentação para a identidade visual adotada.

---

## 1. Referências Selecionadas

### 1.1 Lusion Labs — [https://labs.lusion.co/](https://labs.lusion.co/)
* **Papel no projeto**: Referência principal para composição geral, estética de alto contraste e dinâmica de imagens.
* **Elementos visuais que chamaram a atenção**:
  * Fundo escuro profundo com tipografia branca de alto contraste e proporções imponentes.
  * O efeito de **lente circular interativa**, onde a imagem em repouso apresenta uma estética monocromática/dessaturada e, ao deslizar o cursor sobre ela, uma abertura circular revela a imagem em cores reais e vibrantes.
  * Navegação discreta, limpa e funcional, mantendo o foco do visitante nas imagens protagonistas e na narrativa visual.
  * Ritmo visual assimétrico, fugindo de grades padronizadas de cartões idênticos.
* **O que foi aproveitado e adaptado**:
  * Implementação de uma versão leve e nativa da **lente circular reveladora** utilizando propriedades modernas de CSS (`mask-image`, `radial-gradient` e variáveis CSS dinâmicas atualizadas via `requestAnimationFrame`).
  * Títulos em caixa alta com tipografia limpa, forte e contemporânea.
  * Composição espaçosa, permitindo que cada imagem respire e conte sua história.
  * Evitou-se o excesso de efeitos pesados de WebGL tridimensional para priorizar carregamento instantâneo, leveza e acessibilidade em qualquer dispositivo.

---

### 1.2 Bleibtgleich — [https://bleibtgleich.dev/](https://bleibtgleich.dev/)
* **Papel no projeto**: Referência para ritmo de rolagem, elegância editorial e transições de texto.
* **Elementos visuais que chamaram a atenção**:
  * Animações sutis e progressivas de revelação de palavras e frases durante o scroll.
  * Hierarquia tipográfica sofisticada, combinando títulos de impacto com textos corridos equilibrados e fáceis de ler.
  * Transições suaves entre blocos de conteúdo sem saltos bruscos ou distrações visuais.
* **O que foi aproveitado e adaptado**:
  * Revelação progressiva das seções e blocos de texto com `IntersectionObserver` e suporte rigoroso a `prefers-reduced-motion`.
  * Apresentação editorial para a seção **Sobre Mim** e para os **Interesses & Hobbies**, onde o texto e a imagem dialogam em harmonia.
  * Espaçamento generoso entre parágrafos, gerando uma experiência de leitura calma e contemplativa.

---

### 1.3 NOTH.IN — [https://www.noth.in/](https://www.noth.in/)
* **Papel no projeto**: Referência para micro-interações táteis e sensibilidade nos detalhes.
* **Elementos visuais que chamaram a atenção**:
  * Resposta delicada do cursor ao interagir com palavras-chave, botões e links.
  * Feedback visual imediato e refinado que valoriza cada interação sem poluir o visual.
  * Uso de pequenos marcadores (tags/badges) para classificar informações e conceitos de forma enxuta.
* **O que foi aproveitado e adaptado**:
  * Efeitos sutis de destaque em palavras-chave e elementos interativos ao passar o cursor.
  * Marcadores editoriais em estilo técnico/minimalista (ex.: badges de interesses e tecnologias).
  * Botões com micro-animação de deslocamento suave e mudança refinada de tom.

---

## 2. Justificativa da Identidade Visual

### Paleta de Cores
* **Preto (#171717 / #0F0F0F)**: Base predominante que confere sobriedade, modernidade e atmosfera cinematográfica. Estabelece um contraste exemplar e remete à estética dos estúdios criativos contemporâneos.
* **Branco (#FFFFFF)**: Utilizado nos títulos principais, textos de alto destaque e ícones de navegação, garantindo legibilidade impecável e nitidez tipográfica.
* **Bege (#D8C8AD)**: Elemento de calor, organicidade e acolhimento. Aparece em detalhes seletivos (borda da lente, badges, marcadores, links ativos e foco de formulário), equilibrando a seriedade do preto com um toque humano e caloroso que traduz a personalidade tranquila e receptiva de Enrico.

### Tipografia
* **Títulos e Destaques (Syne & Space Grotesk)**: Tipografia geométrica, moderna e expressiva em caixa alta, proporcionando presença marcante sem recorrer a clichês futuristas ou efeitos artificiais.
* **Textos de Apoio e Leitura (Plus Jakarta Sans)**: Desenho aberto e neutro, garantindo conforto visual prolongado tanto no desktop quanto no mobile.
* **Metadados e Marcadores (JetBrains Mono)**: Letras monoespaçadas discretas para categorias, idade, números de seção e tags, trazendo precisão editorial.

### Estilo das Fotografias
* Todas as fotografias utilizadas (piano, corrida ao ar livre, quadra de basquete, academia e setup de jogos) seguem uma direção de arte consistente: iluminação natural, enquadramentos arquitetônicos, paleta de tons terrosos, bege e carvão, eliminando qualquer aspecto artificial ou excessivamente colorido.
* O espaço da fotografia pessoal de Enrico foi desenhado com moldura editorial refinada, permitindo fácil substituição por sua foto autêntica.

---

## 3. Conclusão
A sinergia entre o dinamismo visual do **Lusion Labs**, a sobriedade tipográfica do **Bleibtgleich** e a sensibilidade interativa do **NOTH.IN** resultou em um portfólio autêntico, minimalista e envolvente, que comunica fielmente quem é **Enrico Pereira Bonato**: alguém jovem, sociável, calmo, apaixonado por movimento, música e constante evolução.
