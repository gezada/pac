# Migração do PAC para infraestrutura própria

Este documento existe para retirar o PAC da VPS compartilhada sem depender de nenhum recurso do Cogu.

## Princípio

A migração cria um novo ambiente em paralelo, implanta o mesmo commit, testa sem mudar o tráfego e altera somente o DNS do PAC no corte final.

## Inventário obrigatório

Na fase atual:

- repositório: `gezada/pac`;
- branch de produção: `main`;
- runtime de build: Node.js 22;
- instalação: `npm ci`;
- validação: `npm run verify`;
- artefato: `dist/`;
- servidor: arquivos estáticos;
- raiz Nginx: `/srv/pac/web/current`;
- domínios: `pac.bet` e `www.pac.bet`;
- dados persistentes: nenhum;
- backend: nenhum;
- banco: nenhum;
- variáveis de runtime: nenhuma.

Atualize este inventário antes de adicionar API, banco, upload, fila, cron, serviços externos ou qualquer estado persistente.

## Migração da landing estática

1. Provisionar o novo destino.
2. Instalar ou disponibilizar um servidor de arquivos estáticos.
3. Fazer checkout do commit que está em produção.
4. Executar `npm ci` e `npm run verify`.
5. Publicar `dist/` no novo destino.
6. Reproduzir cabeçalhos de segurança e cache de `ops/nginx/pac.bet.conf`, adaptando-os ao novo provedor.
7. Testar com resolução local ou hostname temporário.
8. Confirmar resposta, assets, responsividade e certificado.
9. Reduzir TTL antecipadamente quando necessário.
10. Alterar somente os registros de `pac.bet`.
11. Monitorar o novo ambiente.
12. Manter a release antiga disponível por uma janela curta de rollback.
13. Remover recursos antigos do PAC apenas após aprovação explícita e por lista exata.
14. Revalidar o Cogu sem modificar seus recursos.

## Migração futura com dados

Quando houver componentes dinâmicos, acrescentar antes do corte:

- diagrama real de serviços e redes;
- versões de imagens e runtimes;
- lista de variáveis e secrets, sem valores;
- dump consistente e restauração testada;
- migrations aplicadas;
- volumes e uploads persistentes;
- filas e jobs agendados;
- integrações externas e webhooks;
- janela de congelamento de escrita;
- sincronização incremental ou final;
- healthchecks;
- plano de retorno ao ambiente antigo.

O banco, os volumes e os serviços migrados devem ser exclusivamente do PAC. Nunca exportar ou manipular dados do Cogu dentro deste procedimento.

## Critério de conclusão

A migração está concluída quando:

- o PAC funciona sem arquivos, credenciais, serviços ou dados na VPS antiga;
- o DNS aponta para o novo destino;
- deploy e rollback funcionam no novo ambiente;
- backups e restauração foram testados, se houver dados;
- existe uma lista exata dos recursos antigos do PAC;
- a remoção desses recursos não exige tocar em componentes do Cogu.
