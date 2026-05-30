# 🛡️ Operação HTTP - Proteção de User-Agent

Este projeto simula um sistema de segurança back-end desenvolvido em **Node.js** e **Express**. Ele utiliza um *middleware* customizado para interceptar requisições e bloquear ferramentas automatizadas de raspagem de dados (como robôs de Python ou comandos `curl`) usando uma lista negra de cabeçalhos.

---

## 📸 Evidências dos Testes de Segurança

Para validar o escudo de proteção da API, realizamos testes simulados inspecionando as requisições de rede no DevTools do navegador:

### 🟢 1. Requisição Legítima (Acesso Permitido)
Quando o acesso é feito por um navegador comum (usuário real), o servidor valida os cabeçalhos padrões e concede acesso completo com o status **304 OK**.

<img width="952" height="1042" alt="image" src="https://github.com/user-attachments/assets/228b072a-afc2-4de2-8201-88856070110f" />

<img width="1917" height="1066" alt="image" src="https://github.com/user-attachments/assets/0f8af93d-5d4c-4623-986f-817b1e666cbf" />


---

### 🔴 2. Requisição por Robô/Invasor (Acesso Bloqueado)
Ao alterarmos o `User-Agent` nas condições de rede do navegador para simular a ferramenta **`curl`**, o nosso código interceptou a identidade na hora. O servidor barrou o acesso imediatamente e disparou o status de segurança **403 Forbidden**.

<img width="1919" height="1070" alt="Captura de tela 2026-05-29 200256" src="https://github.com/user-attachments/assets/b725c48f-e64d-402f-9888-9a31ddfffdd1" />

<img width="1918" height="1073" alt="Captura de tela 2026-05-29 200019" src="https://github.com/user-attachments/assets/88abd7e0-179a-4efe-9d09-4db2a303c573" />

<img width="1919" height="1069" alt="Captura de tela 2026-05-29 200236" src="https://github.com/user-attachments/assets/f621df1f-b5e6-4665-ab59-399d796e412e" />
