# Gilroy font files

Drop the real Gilroy `.woff2` files here with these exact filenames — `client/src/index.css` already
references them via `@font-face`, so no code changes are needed once they're added.

| Filename | Weight |
|---|---|
| `Gilroy-Thin.woff2` | 100 |
| `Gilroy-UltraLight.woff2` | 200 |
| `Gilroy-Light.woff2` | 300 |
| `Gilroy-Regular.woff2` | 400 |
| `Gilroy-Medium.woff2` | 500 |
| `Gilroy-SemiBold.woff2` | 600 |
| `Gilroy-Bold.woff2` | 700 |
| `Gilroy-ExtraBold.woff2` | 800 |
| `Gilroy-Black.woff2` | 900 |

Until these are added, the app falls back to `system-ui` — no visual break.
