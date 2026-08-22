---
name: release
description: Update hexbot.net for a new HexBot release — bump the version, write the news entry from ../hexbot's CHANGELOG.md, sweep the other pages for stale content, build, commit, push, and print the prod deploy commands. Use when the user says a new HexBot version is released or asks to update the site for a release.
---

# HexBot release site update

Update this site for a new HexBot release. The version may be given as an argument
(e.g. `/release 0.8.0`); otherwise take the topmost entry in the HexBot repo's
`CHANGELOG.md`. The HexBot repo is expected as a sibling checkout of this one
(`../hexbot` relative to the repo root); if it isn't there, ask the user where
it lives.

## 1. Read the changelog

Read the new version's section in `../hexbot/CHANGELOG.md`
(Keep a Changelog format: `## [X.Y.Z] - date — title`, with Breaking / Added /
Changed / Fixed / Removed subsections). Also skim `git -C ../hexbot log --oneline`
around the release commit if the changelog entry is thin.

## 2. Bump the version

Set `HEXBOT_VERSION` in `app/config.ts`. This drives the home page badge, the
download-tarball link, and the "has been released" line — no other edits needed
for those.

## 3. Add the news entry

In `app/(main)/news/page.tsx`, prepend a new object to `RELEASES` following the
existing `Release` type and the style of prior entries:

- `display` is the human date ("August 22, 2026"); `title` is Title Case,
  derived from the changelog's release title.
- `summary` is one sentence-or-three, concise but informative — name the
  headline features and any audit closures with their counts.
- Sections in the order they matter for readers: `breaking` first if present,
  then `added` / `changed` / `fixed` / `removed`. Use `display: "tiles"` only
  for a long grid of additions (see 0.5.0/0.6.0 for the pattern).
- Item bodies use backticks for code — they render via `renderInline`. Compress
  the changelog: keep the mechanism and the user-visible consequence, drop
  internal file paths unless they aid plugin authors.
- Update the page's `metadata.description` to mention the new headline features.
- Do NOT touch the older entries. The "See CHANGELOG.md" link renders on the
  newest entry automatically (`idx === 0`).

## 4. Sweep the rest of the site for stale content

Breaking/changed items usually invalidate copy elsewhere. Grep the `app/`
directory for affected commands, config keys, filenames, and version strings.
Known hotspots:

- `app/(main)/deploy/page.tsx` — `REPL_COMMANDS` table, quick-start terminal
  blocks (compose/config file names), config examples, the "Applying Plugin
  Changes" step.
- `app/(main)/plugins/page.tsx` — per-plugin descriptions, command lists,
  plugin count in `metadata.description` if plugins were added/removed.
- `app/(main)/page.tsx` and `app/(main)/about/page.tsx` — feature blurbs.

## 5. Verify

```bash
pnpm exec tsc --noEmit
pnpm build
```

Both must pass before committing. (Always pnpm, never npm/yarn.)

## 6. Commit and push

Show the user a summary of the page changes, then commit everything with the
message `Update site for HexBot vX.Y.Z` (body listing the notable page changes)
and `git push`.

## 7. Prod deploy

The prod box builds the image from source; there is no registry. After the push,
print this for the user to run on prod (or run it yourself if an SSH alias for
the prod host has been provided):

```bash
cd /path/to/hexbot-web
git pull
docker compose build web
docker compose up -d web
```

Scope to `web` — The Lounge container doesn't need a restart for site changes.
