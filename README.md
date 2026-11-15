# Gerenciador de Campeonatos de Futebol

Aplicação web para organizar e simular temporadas de campeonatos de futebol.

## Escopo inicial

- Campeonato Brasileiro Série A
- Campeonato Brasileiro Série B
- Cadastro único de clubes, reutilizável entre temporadas e divisões
- Calendários, partidas, classificação e estatísticas
- Simulação automática de resultados
- Histórico de temporadas e evolução interna das equipes

## Regra fundamental dos ratings

Os dados reais servem **somente para a avaliação inicial** dos clubes. Depois da configuração inicial, ratings e evolução serão calculados exclusivamente a partir dos resultados simulados dentro deste sistema. O sistema não deve consultar resultados reais, notícias, transferências ou rankings externos para atualizar a força dos clubes.

A promoção ou o rebaixamento, por si só, não altera a força de um clube.

## Princípios de projeto

- Cada clube possui um cadastro único, independentemente da competição ou temporada.
- Formatos e regulamentos pertencem à temporada da competição, pois podem mudar.
- A força do clube e a forma recente devem ser conceitos separados.
- Toda alteração de rating deve ser registrada para preservar o histórico.
- A simulação é automática; placares não serão inseridos manualmente.

## Desenvolvimento

A primeira versão usa HTML, CSS e JavaScript sem dependências de build, para facilitar testes e publicação estática. Os dados do protótipo ficam no armazenamento local do navegador; isso ainda não é um banco de dados compartilhado entre dispositivos.

### Temporada inicial importada\n\nA base inicial inclui os 20 participantes da Série A e os 20 participantes da Série B de 2026, com estado/UF e vínculo à divisão. Os clubes ficam em um cadastro compartilhado e as inscrições ficam registradas dentro da temporada. O regulamento da simulação permanece como “A definir”; os regulamentos reais não são aplicados automaticamente. Fontes de conferência: páginas e documentos oficiais da CBF para a Série A e a Série B de 2026.\n\n### Executar

Abra `index.html` em um navegador. Para publicar, o repositório poderá ser configurado no GitHub Pages.

## Próximas etapas

1. Estrutura da aplicação e navegação.
2. Cadastro e edição de clubes.
3. Módulo de temporadas e importação inicial dos 40 participantes de 2026 (Série A e Série B).
4. Geração de calendário e classificação.
5. Motor de simulação e evolução interna dos ratings.
6. Histórico e estatísticas.
