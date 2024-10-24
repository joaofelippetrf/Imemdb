# IMEdb

Um aplicativo web que permite aos usuários explorar e visualizar informações sobre uma ampla variedade de filmes. O aplicativo exibe detalhes como títulos, resumos, gêneros e pôsteres, além de permitir a busca pelos filmes mais populares.

## Funcionalidades

- **Filmes que voce pode gostar**: Visualize uma lista de filmes que podem interessar.
- **Busca por Gêneros**: Navegue por diferentes gêneros de filmes e visualize filmes específicos em cada gênero.
- **Top 100 Filmes**: Veja os 100 filmes mais bem votados da base de dados.
- **Detalhes do Filme**: Clique em um filme para ver informações detalhadas, incluindo uma descrição mais longa, classificações e outros detalhes.
- **Pesquisa de filme**: Pesquise o filme pelo seu titulo.

## Tecnologias Utilizadas

- **Frontend**: 
  - React.js
  - Axios para chamadas HTTP
  - Bootstrap para estilização
- **Backend**: 
  - Spring Boot (Java)
  - Banco de Dados: MySQL
  - 
## Instalação do Projeto

- Instalar node.js, XAMPP(MySQL) e JAVA
- Puxar código do github
- Rodar o MySQL através do XAMPP.
- Criar o banco de dados local e atualizar com as informações no arquivo :"proje/src/main/java/resources/application.properties"
- Abastecer banco de dados com  a API do TMDB, executando arquivo : "proje/automatizacao/getdados.py"
- Rodar a aplicação backend através da extensão do Spring Boot ou executando o comando "gradlew bootRun"
- Navegar para a pasta do frontend: "cd frontend"
- Executar os comandos: "npm install" e "npm run dev" para rodar aplicação frontend.
