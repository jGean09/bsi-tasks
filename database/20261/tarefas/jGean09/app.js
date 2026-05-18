const { MongoClient } = require('mongodb');

// URL de conexão com as credenciais que definimos no docker-compose
const url = 'mongodb://admin:rootpassword@localhost:27017';
const client = new MongoClient(url);

// Nome do banco de dados exigido no documento
const dbName = 'Atividades_Proj';

async function main() {
    try {
        // Conecta ao servidor MongoDB
        await client.connect();
        console.log('Conectado com sucesso ao servidor MongoDB!');
        
        const db = client.db(dbName);
        const colecaoEmpregados = db.collection('empregados');
        const colecaoProjetos = db.collection('projetos');

        // --- 4. SCRIPT DE INICIALIZAÇÃO (Inserir pelo menos 3 documentos) ---
        console.log('\n--- Inicializando Banco de Dados ---');
        
        // Limpa as coleções para evitar dados duplicados ao rodar várias vezes
        await colecaoEmpregados.deleteMany({});
        await colecaoProjetos.deleteMany({});

        // Inserindo 3 Empregados
        const empregadosGerais = [
            { _id: "EMP001", nome: "José Gean", cargo: "Desenvolvedor Backend", email: "josegeantlc@gmail.com" },
            { _id: "EMP002", nome: "Jackson Presidente", cargo: "Gerente de Projetos", email: "jackson@ufrn.com" },
            { _id: "EMP003", nome: "Wiritan Tesoureiro", cargo: "Analista de Sistemas", email: "wiritan@ufrn.com" }
        ];
        await colecaoEmpregados.insertMany(empregadosGerais);
        console.log('3 Empregados inseridos com sucesso!');

        // Inserindo 3 Projetos com atividades embutidas (Embedded Documents)
        const projetosIniciais = [
            {
                _id: "PROJ001",
                nome: "PDV Master",
                id_lider: "EMP001",
                atividades: [
                    { id_atividade: "ACT101", titulo: "Configurar Docker e Mongo", status: "Concluído" }
                ]
            },
            {
                _id: "PROJ002",
                nome: "Portal do Estudante",
                id_lider: "EMP002",
                atividades: [
                    { id_atividade: "ACT201", titulo: "Modelagem do Banco", status: "Em Andamento" }
                ]
            },
            {
                _id: "PROJ003",
                nome: "Sistema de Auxílios",
                id_lider: "EMP003",
                atividades: []
            }
        ];
        await colecaoProjetos.insertMany(projetosIniciais);
        console.log('3 Projetos iniciais inseridos com sucesso!');


        // --- 5. OPERAÇÕES DE CRUD ---
        console.log('\n--- Executando Operações de CRUD ---');

        // a. Create: Inserir uma nova atividade em algum projeto existente
        await colecaoProjetos.updateOne(
            { _id: "PROJ001" },
            { $push: { atividades: { id_atividade: "ACT102", titulo: "Criar scripts de CRUD", status: "Em Andamento" } } }
        );
        console.log('A de CRUD (Create): Nova atividade inserida no projeto PROJ001.');

        // c. Update: Atualizar o líder de um projeto específico (Mudando líder do PROJ001 para EMP002)
        await colecaoProjetos.updateOne(
            { _id: "PROJ001" },
            { $set: { id_lider: "EMP002" } }
        );
        console.log('C de CRUD (Update): Líder do projeto PROJ001 atualizado.');

        // d. Delete: Remover uma atividade de um projeto (Removendo a ACT101 do PROJ001)
        await colecaoProjetos.updateOne(
            { _id: "PROJ001" },
            { $pull: { atividades: { id_atividade: "ACT101" } } }
        );
        console.log('D de CRUD (Delete): Atividade ACT101 removida do projeto PROJ001.');

        // b. Read: Listar todos os projetos e, para cada projeto, listar suas atividades
        console.log('\nB de CRUD (Read): Listando Projetos e suas Atividades:');
        const listaProjetos = await colecaoProjetos.find().toArray();
        
        listaProjetos.forEach(proj => {
            console.log(`\nProjeto: ${proj.nome} (ID: ${proj._id}) - Líder ID: ${proj.id_lider}`);
            if (proj.atividades.length === 0) {
                console.log('  -> Nenhuma atividade cadastrada.');
            } else {
                proj.atividades.forEach(act => {
                    console.log(`  [${act.status}] ${act.id_activity || act.id_atividade}: ${act.titulo}`);
                });
            }
        });

    } catch (error) {
        console.error('Erro ao executar operações no MongoDB:', error);
    } finally {
        // Fecha a conexão com o banco de dados 
        await client.close();
    }
}

main();