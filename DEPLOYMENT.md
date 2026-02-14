# 🚀 Deployment Guide for Vercel

## Quick Start (5 minutes)

### Step 1: Prepare Your Files ✅

1. **Add your GIFs and photo** to the `public` folder:
   - `proposal.gif`
   - `crying.gif`
   - `couple-photo.jpg`

2. **Customize your message** in `src/App.jsx` (around line 350)

### Step 2: Deploy to Vercel 🌐

#### Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```
   Follow the prompts to login with your email or GitHub.

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Answer the prompts:
   - Set up and deploy? → **Y**
   - Which scope? → Select your account
   - Link to existing project? → **N**
   - What's your project's name? → `valentines-rimmu` (or any name you like)
   - In which directory is your code located? → **./​** (just press Enter)
   - Want to override the settings? → **N**

4. **Done!** You'll get a URL like:
   ```
   https://valentines-rimmu-abc123.vercel.app
   ```

5. **To deploy updates later:**
   ```bash
   vercel --prod
   ```

#### Method 2: GitHub + Vercel Dashboard

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Valentine's site for Rimmu"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub.com
   - Follow GitHub's instructions to push your code

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the settings
   - Click "Deploy"

4. **Done!** Your site will be live in ~2 minutes.

### Step 3: Test Your Site 📱

1. Open the Vercel URL on your iPhone
2. Test the password: `1617`
3. Go through all the pages to make sure everything works
4. Check that your GIFs and photo are showing correctly

### Step 4: Share with Rimmu! 💕

Send her the link and enjoy the magic! ✨

## 🔧 Common Issues & Solutions

### GIFs Not Showing?
- ✅ Make sure files are in the `public` folder
- ✅ Check file names are exactly: `proposal.gif`, `crying.gif`
- ✅ Try different GIF formats if needed

### Photo Not Displaying?
- ✅ Ensure it's named `couple-photo.jpg`
- ✅ Place it in the `public` folder
- ✅ Try .png format if .jpg doesn't work

### Deploy Failed?
- ✅ Run `npm install` first
- ✅ Make sure all files are committed (if using GitHub)
- ✅ Check Node.js version: `node --version` (should be 18+)

### Need to Update the Site?
```bash
# Make your changes, then:
vercel --prod
```

## 📱 Mobile Optimization

The site is fully optimized for iPhone:
- Touch controls for the fishing game
- Responsive design for all screen sizes
- Smooth animations
- Works in Safari and Chrome

## 🎨 Pro Tips

1. **Custom Domain:** In Vercel dashboard, you can add a custom domain like `rimmu-valentines.com`

2. **Password Protection:** The password is hardcoded as `1617`. To change it, edit line 18 in `src/App.jsx`

3. **Analytics:** Enable Vercel Analytics in the dashboard to see when she visits!

4. **Environment Variables:** You can add secrets in Vercel dashboard if needed

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev)
- Check the main README.md for more details

---

Made with ❤️ for Rimmu
