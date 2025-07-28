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
3. Start the backend server to proxy requests to OpenAI:
   ```bash
   npm start
   ```
   The OpenAI API key must be provided in the `OPENAI_API_KEY` environment
   variable and is **not** stored in the browser anymore.

## Building for production

Generate the production assets with:
```bash
npm run build
```
You can preview the built app locally using:
```bash
npm run preview
```

## Deploying to Vercel

1. Create an account on [Vercel](https://vercel.com/) if you don't already have one.
2. Push this repository to GitHub (or another Git provider).
3. In Vercel, click **New Project** and import the repository.
4. Keep the default settings. The build command is `npm run build` and the output directory is `dist`.
5. Once the deployment finishes, note the public URL provided by Vercel.

## Embedding in WordPress

The application can be embedded in a page using an `<iframe>`.
Add the query parameter `?embed=1` to enable the embed mode which removes the background.

Example snippet to paste in your WordPress page:

```html
<iframe src="https://your-vercel-app.vercel.app/?embed=1"
        style="width:100%;height:600px;border:0;" loading="lazy"></iframe>
```

## Managing WiziShop documentation links

The side panel "Liens documentation WiziShop" lists useful articles. You can
search the list, click a title to copy its URL, and add your own links.

1. Fill in a title and URL below the list then click **Ajouter**. Custom links
   are stored locally in `localStorage` under `custom_doc_links`.
2. Use the **×** button next to a custom link to remove it.
3. Click **Réinitialiser liens perso** to clear all custom links.
4. Default links can also be removed using the **×** button and restored with
   **Réinitialiser liens par défaut**.

Default links are defined in `public/docs.json` and can be edited to update the
initial list.
