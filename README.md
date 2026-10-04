This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Managing the fleet (Google Sheet)

The Fleet page, the homepage carousel and every `/fleet/<id>` page read from a Google Sheet. Add or edit a row and the site updates within about 5 minutes, with no code changes or redeploy.

### One-time setup

1. In Google Sheets, create a blank sheet named **Yacht Collective - Fleet**, then **File > Import > Upload** `content/fleet-starter.csv` and choose **Replace current sheet**.
2. **File > Share > Publish to web**: pick the fleet tab, choose **Comma-separated values (.csv)**, click **Publish**, and copy the link.
3. In Vercel, go to **Project > Settings > Environment Variables** and add:
   - `FLEET_SHEET_CSV_URL`: the link from step 2.
   - `REVALIDATE_SECRET` (optional): any long random password, which enables instant refresh.
4. Redeploy once. For local development, put the same variables in `.env.local`.

### Columns

| Column | What to enter |
| --- | --- |
| `id` | URL slug, e.g. `lagoon-62` gives `/fleet/lagoon-62`. Leave blank to generate it from the name. |
| `name`, `tagline`, `category`, `location`, `description` | Plain text |
| `lengthFt`, `guests`, `cabins`, `crew`, `rateFrom` | Numbers (`S$2,900` and `62 ft` are fine) |
| `highlights`, `amenities` | One item per line inside the cell (Alt+Enter, or Cmd+Enter on Mac) |
| `images` | One photo link per line. The first is the card cover photo. |
| `published` | `TRUE` to show, `FALSE` to hide. Blank counts as shown. |
| `order` | Display order (1 comes first) |
| `gradient` | Optional background shown when there are no photos: `navy`, `charcoal` or `midnight` |

Rows with a missing name or an invalid number are skipped, so they don't break the site. Check the Vercel logs for `[fleet sheet]` warnings.

### Photos

Each line in `images` can be:

- **Google Drive**: upload the photo, then **Share > General access > Anyone with the link**, and paste the share link.
- **Any https image link**, such as Cloudinary or Imgur.
- **A file in this repo**, e.g. `/images/yachts/lagoon-62/01.jpg` (stored in `public/images/yachts/`).

### Refresh immediately

Changes appear automatically within 5 minutes. To refresh right away, open `https://<your-site>/api/revalidate?secret=<REVALIDATE_SECRET>` and then reload the page.

If the sheet link is missing or the sheet can't be reached, the site shows the built-in fleet from `lib/data/yachts.fallback.ts`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
