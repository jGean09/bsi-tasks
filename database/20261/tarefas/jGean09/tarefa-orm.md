# Tarefa - ODBC e ORM

## Scripts e Programas
### Script de Conexão Nativa (Python)
- https://github.com/jGean09/BD_Atividade/blob/main/conexao_nativa.py
### Script de Conexão ORM (SQLAlchemy)
- https://github.com/jGean09/BD_Atividade/blob/main/conexao_orm.py
### Script SQL de Criação do Banco
- https://github.com/jGean09/BD_Atividade/blob/main/criacao_BD.py

## Resumo sobre ODBC (Python)
###📌 ODBC (Python e PostgreSQL)
O ODBC (Open Database Connectivity) é um padrão que serve como intermediário entre a aplicação e o banco, permitindo que diferentes linguagens acessem diferentes bancos de dados de forma padronizada. Porém, no Python, é mais comum usar drivers nativos, que são mais diretos e simples.

No caso do PostgreSQL, uma das principais bibliotecas é o psycopg2, que permite executar comandos SQL diretamente no banco.

O funcionamento básico é:

Criar uma conexão com o banco
Criar um cursor
Executar comandos SQL (INSERT, UPDATE, SELECT)
Confirmar alterações com commit
Fechar a conexão

## Resumo sobre ORM (SQLAlchemy)
📌 ORM (SQLAlchemy)
Um ORM (Object-Relational Mapper) é uma forma de trabalhar com banco de dados usando objetos da linguagem, sem precisar escrever SQL diretamente.

No Python, o ORM mais utilizado é o SQLAlchemy.

Com ele, cada tabela do banco vira uma classe, e cada registro vira um objeto. Assim, ao invés de escrever SQL, o programador manipula dados usando Python, e o ORM se encarrega de transformar isso em comandos SQL.