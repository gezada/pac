# Runbook de implantação do PAC

Procedimento operacional para colocar a landing estática no ar sem alterar recursos do Cogu.

## Estado deste runbook

- Código da landing: implementado no repositório.
- Build estático: implementado.
- Validação contínua: implementada.
- Deploy de produção: preparado, mas somente manual.
- Auditoria da VPS: pendente.
- Usuário e diretórios do PAC na VPS: pendentes.
- Virtual host do PAC: versionado, ainda não instalado.
- DNS e TLS: pendentes.

Não dispare o workflow `Deploy static site` antes de concluir as etapas 1 a 5.

## 1. Pré-requisitos

- acesso SSH autenticado à VPS correta;
- IPv4 público confirmado no hPanel;
- usuário com permissão para auditoria e preparação inicial;
- snapshot ou backup recuperável;
- autorização explícita para criar recursos exclusivos do PAC;
- nenhuma alteração simultânea no Cogu durante a janela.

Credenciais, IPs e saídas sensíveis não pertencem ao Git.

## 2. Auditoria somente de leitura

Executar e analisar:

```bash
date -Is
hostnamectl
uptime
free -h
df -h
df -i
ps aux --sort=-%mem
sudo ss -lntup
sudo systemctl --failed
sudo systemctl status nginx --no-pager
sudo nginx -T
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
docker network ls
docker volume ls
docker system df
sudo ufw status verbose
sudo ls -la /etc/nginx/sites-available
sudo ls -la /etc/nginx/sites-enabled
sudo certbot certificates
```

Registrar separadamente:

- RAM e disco livres;
- portas ocupadas;
- usuário/grupo sob o qual o Nginx lê arquivos;
- forma atual de configuração do firewall;
- virtual hosts existentes;
- certificados existentes;
- funcionamento do Cogu antes de qualquer mudança.

Se a linha de base já apresentar falha, interromper. Este projeto não autoriza corrigir o Cogu.

## 3. Linha de base protegida

Antes e depois de cada alteração operacional:

```bash
curl -fsS -o /dev/null -w 'cogu.gg: %{http_code}\n' https://cogu.gg/
curl -fsS -o /dev/null -w 'dash.cogu.gg: %{http_code}\n' https://dash.cogu.gg/
curl -fsS https://api.cogu.gg/health
sudo nginx -t
```

Guardar o horário e o resultado. Não versionar respostas sensíveis.

## 4. Preparação exclusiva do PAC

Os comandos definitivos dependem da distribuição, dos grupos e da política SSH encontrados na auditoria. O resultado obrigatório é:

```text
/srv/pac/
└── web/
    ├── releases/
    └── current -> releases/<commit-sha>
```

Requisitos:

- usuário de deploy exclusivo, sugerido `pac-deploy`;
- autenticação por chave;
- nenhuma senha ou chave compartilhada com o Cogu;
- escrita limitada a `/srv/pac/web`;
- leitura permitida ao usuário efetivo do Nginx;
- sem acesso ao Docker, banco ou checkout do Cogu;
- sem `sudo` para o deploy cotidiano.

Não copie comandos genéricos de criação de usuário sem antes conferir a distribuição e as políticas reais da VPS.

## 5. Primeira release acompanhada

Na máquina de build:

```bash
npm ci
npm run verify
```

O conteúdo de `dist/` deve ser enviado para:

```text
/srv/pac/web/releases/.incoming-<sha>-<identificador-unico>
```

Depois, executar como usuário de deploy:

```bash
bash ops/scripts/activate-release.sh \
  <sha-completo-do-commit> \
  /srv/pac/web/releases/.incoming-<sha>-<identificador-unico>
```

Confirmar:

```bash
readlink -f /srv/pac/web/current
test -f /srv/pac/web/current/index.html
```

## 6. Virtual host

Após confirmar que a primeira release existe:

1. copiar `ops/nginx/pac.bet.conf` para um arquivo novo em `/etc/nginx/sites-available/pac.bet`;
2. revisar o diff do arquivo de destino;
3. criar apenas o link `/etc/nginx/sites-enabled/pac.bet`;
4. executar `sudo nginx -t`;
5. se e somente se o teste passar, executar `sudo systemctl reload nginx`;
6. repetir a linha de base protegida.

Teste local na VPS:

```bash
curl -fsS -I -H 'Host: pac.bet' http://127.0.0.1/
```

Teste externo antes do DNS:

```bash
curl --resolve pac.bet:80:<IP_CONFIRMADO> -I http://pac.bet/
```

## 7. DNS

Somente depois dos testes diretos:

- alterar apenas o registro `A` de `@` para o IPv4 confirmado da VPS;
- manter `www` como `CNAME` para `pac.bet`;
- manter os nameservers na GoDaddy;
- não criar `AAAA` sem IPv6 validado;
- não usar IP inferido de FTP ou workflow do Cogu.

Verificar:

```bash
dig +short A pac.bet
dig +short CNAME www.pac.bet
curl -I http://pac.bet/
curl -I http://www.pac.bet/
```

## 8. TLS

Depois que ambos os nomes resolverem para a VPS:

```bash
sudo certbot --nginx -d pac.bet -d www.pac.bet
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

Validar HTTPS, redirecionamentos, URL canônica e a linha de base protegida.

## 9. Habilitação do workflow

Criar um GitHub Environment chamado `production` e adicionar secrets exclusivos:

```text
PAC_VPS_HOST
PAC_VPS_PORT
PAC_VPS_USER
PAC_VPS_SSH_KEY
PAC_VPS_KNOWN_HOSTS
```

O host deve corresponder à VPS confirmada. `PAC_VPS_KNOWN_HOSTS` deve vir de uma verificação autenticada da chave do host; não aceitar uma chave silenciosamente na primeira conexão.

Executar manualmente `Deploy static site`. Se build, ativação, healthcheck e rollback forem validados, uma mudança futura poderá adicionar gatilho de push na `main`.

## 10. Rollback

Listar primeiro:

```bash
readlink -f /srv/pac/web/current
find /srv/pac/web/releases -mindepth 1 -maxdepth 1 -type d -printf '%f\n'
```

Escolher uma release saudável e executar:

```bash
bash ops/scripts/rollback-release.sh <sha-completo-do-commit>
```

Validar o PAC e repetir a linha de base protegida. Rollback estático não exige reload do Nginx.

## 11. Registro de publicação

Para cada deploy, registrar fora de secrets:

- SHA do commit;
- data e responsável;
- resultado do build;
- release anterior e nova;
- resultado do healthcheck;
- necessidade ou não de rollback;
- resultado da linha de base do Cogu.
