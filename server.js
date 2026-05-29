const express = require('express');
const app = express();
const PORT = 3000;

// Lista negra de agentes proibidos ou bots conhecidos de scraping agressivo
const BANNED_AGENTS = ['python-requests', 'curl', 'wget', 'bad-bot-crawler'];

// Middleware de Inspeção de Identidade (User-Agent)
const userAgentInspector = (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';

    // 1. Bloqueia requisições sem crachá de identificação
    if (!userAgent) {
        return res.status(400).json({
            status: 'Negado',
            error: 'Requisição suspeita: Agente não identificado (User-Agent ausente).'
        });
    }

    // 2. Verifica se o agente faz parte da lista negra
    const isBanned = BANNED_AGENTS.some(bot => userAgent.toLowerCase().includes(bot));

    if (isBanned) {
        return res.status(403).json({
            status: 'Bloqueado',
            message: 'Acesso negado pela Contra-Inteligência. Bots não autorizados nesta rota.'
        });
    }

    // Se passar nas verificações, avança para a rota
    next();
};

app.use(userAgentInspector);

// Rota protegida (A Base de Dados)
app.get('/api/resource', (req, res) => {
    res.json({
        status: 'Sucesso',
        data: 'Acesso concedido. Bem-vindo à base de dados segura, Agente!'
    });
});

app.listen(PORT, () => {
    console.log(`🤖 QG de Operações rodando com segurança na porta ${PORT}`);
});