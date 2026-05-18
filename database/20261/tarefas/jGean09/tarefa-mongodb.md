# Projeto e Administração de Banco de Dados

**Matrícula:** 20240038378
**Nome:** José Gean de Macedo Alves
**Email:** josegeantlc@gmail.com

## Tarefas

* [Tarefa Individual - MongoDB](./tarefa-mongodb.md)

# Tarefa - MongoDB

## 2.b Resumo sobre o MongoDB
O MongoDB é um Sistema Gerenciador de Banco de Dados (SGBD) NoSQL orientado a documentos. Diferente dos bancos relacionais tradicionais que utilizam tabelas, linhas e colunas, o MongoDB armazena dados em estruturas flexíveis chamadas de documentos BSON (uma extensão binária do JSON).

### Principais Características:
* **Esquema Flexível (Schemaless):** Documentos dentro da mesma coleção não precisam obrigatoriamente seguir a mesma estrutura de campos, facilitando a evolução ágil do software.
* **Documentos Incorporados (Embedded Documents):** Permite aninhar arrays e subdocumentos dentro de um único registro principal, reduzindo a necessidade de operações complexas de `JOIN`.
* **Alta Escalabilidade:** Suporta escalabilidade horizontal de forma nativa através de *sharding* (distribuição de dados entre múltiplos servidores).
* **Alta Disponibilidade:** Garante tolerância a falhas e redundância por meio de *Replica Sets*.

---

## 6. Alta Disponibilidade e Configuração Avançada (Replica Sets)

### a. O que é um Replica Set e quais os papéis de seus membros?
No contexto do MongoDB, um **Replica Set** é um grupo de instâncias (processos `mongod`) que mantêm o mesmo conjunto de dados. Ele fornece redundância, tolerância a falhas e alta disponibilidade para o sistema em ambientes de produção. Se o servidor principal falhar, o grupo automaticamente elege um substituto para assumir o controle sem interromper a aplicação.

#### Papéis (Roles) dos Membros:
1. **Membro Primário (Primary):** É o único nó que recebe todas as operações de escrita da aplicação. Ele registra todas as mudanças em seu histórico de operações (oplog).
2. **Membro Secundário (Secondary):** Replica o histórico de operações (oplog) do nó Primário de forma assíncrona para manter seus dados idênticos. Por padrão, opera em modo de apenas leitura.
3. **Arbiter (Árbitro):** Não armazena nenhuma cópia dos dados e não pode se tornar um nó Primário. Sua única função dentro do cluster é participar das votações de desempate durante uma eleição para escolher o novo Primário caso o original fique offline.

### b. Etapas essenciais para transformar o servidor em um Replica Set de 3 membros via Docker

Para converter a nossa estrutura atual de container único em um Replica Set composto por 3 membros funcionais para o banco `Atividades_Proj`, são necessárias as seguintes configurações:

#### Passo 1: Atualização do arquivo `docker-compose.yml`
Devemos declarar três serviços do MongoDB configurados para rodar sob o mesmo nome de Replica Set (parâmetro `--replSet`).

```yaml
version: '3.8'

services:
  mongo1:
    image: mongo:latest
    container_name: mongo1
    command: ["mongod", "--replSet", "rs-atividades", "--bind_ip_all"]
    ports:
      - "27017:27017"
    volumes:
      - mongo1_data:/data/db

  mongo2:
    image: mongo:latest
    container_name: mongo2
    command: ["mongod", "--replSet", "rs-atividades", "--bind_ip_all"]
    ports:
      - "27018:27017"
    volumes:
      - mongo2_data:/data/db

  mongo3:
    image: mongo:latest
    container_name: mongo3
    command: ["mongod", "--replSet", "rs-atividades", "--bind_ip_all"]
    ports:
      - "27019:27017"
    volumes:
      - mongo3_data:/data/db

volumes:
  mongo1_data:
  mongo2_data:
  mongo3_data: