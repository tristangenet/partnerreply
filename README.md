# PartnerReply

PartnerReply is a small React + TypeScript application that assists WiziShop support agents in crafting replies. It analyzes a partner's message with OpenAI, classifies the request and produces a concise answer, including any code snippets to copy.

Features:

- Optional fields to provide HTML, CSS/JS code or an image screenshot.
- Animated loader while OpenAI generates the answer.
- Dark and light mode toggle.
- Recent history of generated replies with ability to clear it.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. When the app is running, enter your OpenAI API key in the field at the top of the page. The key is stored locally in `localStorage` under `openai_api_key`.

## Building for production

Generate the production assets with:
```bash
npm run build
```
You can preview the built app locally using:
```bash
npm run preview
```
