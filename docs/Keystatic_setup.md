# Keystatic Setup Guide for Your Starlight Blog

## Step 1: Update keystatic.config.ts

Replace the placeholder values in `keystatic.config.ts`:
- `YOUR_GITHUB_USERNAME` → Your actual GitHub username
- `YOUR_REPO_NAME` → Your repository name (e.g., `Luna-Astroblog`)

## Step 2: Create a GitHub OAuth App

Keystatic needs GitHub authentication to edit content:

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `Keystatic - Luna Astroblog` (or whatever you prefer)
   - **Homepage URL**: 
     - Development: `http://localhost:4321`
     - Production: `https://your-site.pages.dev`
   - **Authorization callback URL**:
     - Development: `http://localhost:4321/api/keystatic/github/oauth/callback`
     - Production: `https://your-site.pages.dev/api/keystatic/github/oauth/callback`
4. Click "Register application"
5. Generate a client secret and save both the Client ID and Client Secret

**Note:** You'll need TWO OAuth apps - one for local development and one for production.

## Step 3: Set Up Environment Variables

### Local Development (.env file)

Create a `.env` file in your project root:

```env
KEYSTATIC_GITHUB_CLIENT_ID=your_dev_client_id
KEYSTATIC_GITHUB_CLIENT_SECRET=your_dev_client_secret
```

Add `.env` to your `.gitignore` if it's not already there.

### Production (Cloudflare Pages)

1. Go to your Cloudflare Pages dashboard
2. Select your project
3. Go to Settings → Environment variables
4. Add these variables:
   - `KEYSTATIC_GITHUB_CLIENT_ID` → your production client ID
   - `KEYSTATIC_GITHUB_CLIENT_SECRET` → your production client secret

## Step 4: Update Your Content Collections

Make sure your content collections match the Keystatic schema. Your blog posts should be in:
```
src/content/blog/
```

And your docs in:
```
src/content/docs/
```

## Step 5: Access Keystatic Admin

### Local:
```bash
bun run dev
```
Then navigate to: `http://localhost:4321/keystatic`

### Production:
Navigate to: `https://your-site.pages.dev/keystatic`

## Step 6: First Time Setup

When you first access Keystatic:
1. Click "Sign in with GitHub"
2. Authorize the application
3. You'll be redirected back to Keystatic
4. You can now create and edit content!

## How It Works

- **Local mode**: When running `bun run dev`, Keystatic uses local file system
- **Production mode**: On Cloudflare Pages, Keystatic commits directly to GitHub
- All changes are version controlled through Git
- Content editors don't need to know Markdown or Git

## Customizing Collections

You can modify `keystatic.config.ts` to add more fields or collections. Common additions:

```typescript
// Add a hero image field
heroImage: fields.image({
  label: 'Hero Image',
  directory: 'src/assets/images/heroes',
  publicPath: '../../assets/images/heroes/',
}),

// Add a draft status
draft: fields.checkbox({
  label: 'Draft',
  description: 'Check to save as draft',
}),

// Add categories
category: fields.select({
  label: 'Category',
  options: [
    { label: 'Tutorial', value: 'tutorial' },
    { label: 'Guide', value: 'guide' },
    { label: 'News', value: 'news' },
  ],
  defaultValue: 'guide',
}),
```

## Troubleshooting

**Issue**: "Failed to authenticate with GitHub"
- Check your OAuth app credentials
- Ensure callback URL matches exactly
- Verify environment variables are set correctly

**Issue**: "Cannot read repository"
- Make sure your GitHub user has access to the repository
- Check that the repo owner/name in config is correct
- Ensure the repository exists and is accessible

**Issue**: Changes not appearing
- Keystatic commits to GitHub, then you need to pull/deploy
- In production, Cloudflare Pages should auto-deploy on commit
- In local mode, changes are immediate to the file system

## Next Steps

- Test creating a blog post through the Keystatic UI
- Set up branch-based workflows if needed
- Add team members to the GitHub repository
- Customize the schema to match your content needs