# hexbot-web

Marketing and documentation site for [HexBot](https://github.com/jstnmthw/hexbot), the modular IRC bot for Node.js. Lives at [hexbot.net](https://hexbot.net).

Built with Next.js 16 (App Router), React 19, and Tailwind CSS v4. The `/chat` route embeds a self-hosted [The Lounge](https://thelounge.chat) instance with a custom HexBot theme, served at [chat.hexbot.net](https://chat.hexbot.net).

## Stack

- Next.js 16 + React 19
- Tailwind CSS v4 (PostCSS)
- TypeScript
- pnpm
- Docker / Docker Compose

## Develop

```bash
pnpm install
pnpm dev          # next dev --webpack, http://localhost:3000
pnpm typecheck
pnpm lint
pnpm format:write
```

## Deploy

```bash
docker compose up -d --build
```

Compose brings up two services:

- `web` — the Next.js site on port `3000`
- `thelounge` — IRC web client on `127.0.0.1:9000`, with the custom theme mounted from `thelounge/themes/hexbot/`

## Layout

```
app/
  (main)/        homepage, about, deploy, news, plugins, chat
  (beta)/beta/   beta landing
  components/    shared UI
  config.ts      HEXBOT_VERSION, SITE_URL, CHAT_URL
public/          static assets (logo, icons)
thelounge/       The Lounge config + custom theme (gitignored data)
```

Update `HEXBOT_VERSION` in `app/config.ts` when bumping to track a new HexBot release.
