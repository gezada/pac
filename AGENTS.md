# Instruções operacionais para agentes

Este arquivo define limites obrigatórios para qualquer pessoa ou agente de IA que trabalhe no PAC.

## Leia antes de agir

1. Leia o [`README.md`](./README.md) integralmente.
2. Confirme o estado do repositório, a branch e o diff.
3. Trate a VPS, o DNS e o Nginx como ambientes protegidos até concluir a auditoria descrita em [`ops/RUNBOOK.md`](./ops/RUNBOOK.md).
4. Não declare que inspecionou ou alterou a VPS sem ter realizado a ação em uma sessão autenticada.

## Escopo permitido

- Este repositório: `gezada/pac`.
- Código e documentação do PAC.
- Na VPS, somente recursos nomeados e criados exclusivamente para o PAC:
  - `/srv/pac`;
  - `/etc/nginx/sites-available/pac.bet`;
  - `/etc/nginx/sites-enabled/pac.bet`;
  - certificados de `pac.bet` e `www.pac.bet`;
  - usuário e credenciais de deploy exclusivos do PAC.

## Escopo protegido

Não edite, reinicie, remova, reutilize nem renomeie:

- repositório, serviços, runners, workflows ou secrets do Cogu;
- virtual hosts preexistentes;
- bancos, schemas, usuários, volumes, redes ou Redis do Cogu;
- DNS de `cogu.gg`;
- configurações globais de Nginx, Docker, Node.js ou do sistema operacional.

Se um recurso não estiver inequivocamente identificado como PAC, considere-o protegido.

## Estado atual do produto

- A página é uma landing estática temporária de “Em construção”.
- Stack: Vite + TypeScript, sem framework de interface.
- Não existe backend, banco de dados ou container do PAC.
- O build é gerado em `dist/`.
- A fonte da verdade é o Git; `dist/` não deve ser versionado.
- O workflow de produção é manual até o primeiro deploy acompanhado ser aprovado.

## Comandos

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm run verify
```

## Regras para mudanças

- Não versionar secrets, IPs privados, chaves ou senhas.
- Manter dependências fixadas no `package-lock.json`.
- Preservar a geração de site totalmente estático.
- Atualizar documentação e registro de decisões quando a arquitetura mudar.
- Validar `npm run verify` antes de publicar.
- Para mudanças de infraestrutura, registrar linha de base, rollback e resultado.
- Não ativar deploy automático em push antes de a preparação da VPS, o primeiro deploy e o rollback terem sido validados.
- Não transformar a landing em aplicação dinâmica apenas por antecipação. Backend, banco e Docker só entram quando houver requisito concreto.

## Entrada futura do lobo

O personagem/arte do lobo ainda não foi fornecido. Quando chegar:

1. preservar o arquivo-fonte fora do build quando aplicável;
2. adicionar a versão web otimizada em `public/brand/`;
3. definir dimensões para evitar deslocamento de layout;
4. usar `alt` adequado ou `alt=""` se for estritamente decorativo;
5. testar desktop, tablet e celular;
6. não redesenhar nem reinterpretar a marca sem pedido explícito.
