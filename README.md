# Valentine's Day Website for Rimmu 💕

A beautiful, interactive multi-page Valentine's Day website with games, animations, and personalized messages.

## 📋 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your GIFs and Photos

You need to add these files to the `public` folder:

#### Required GIFs:
- `public/proposal.gif` - A cute proposal GIF (will show when asking "Will you be my valentine?")
- `public/crying.gif` - A crying/sad GIF (will show when she clicks "No")

#### Required Photo:
- `public/couple-photo.jpg` - Your photo together (for the final page)

**Where to find GIFs:**
- Visit [Giphy.com](https://giphy.com)
- Search for "proposal cute" or "asking valentine"
- Search for "crying sad please"
- Download the GIFs and rename them as shown above

**For the photo:**
- Choose your favorite photo together
- Name it `couple-photo.jpg` and place it in the `public` folder

### 3. Customize Your Message

Open `src/App.jsx` and find the `MessagePage` component (around line 350).

Replace this section:
```jsx
{/* YOU WILL EDIT THIS SECTION IN VS CODE */}
<h1>Your Custom Message Here</h1>
<p>Replace this with your heartfelt message to Rimmu!</p>
<p>You can add multiple paragraphs, quotes, or anything you'd like.</p>
{/* END OF EDITABLE SECTION */}
```

With your own heartfelt message! For example:
```jsx
{/* YOU WILL EDIT THIS SECTION IN VS CODE */}
<h1>To My Dearest Rimmu</h1>
<p>From the moment we met on October 17th, 2024 at 1 AM, my life changed forever.</p>
<p>Every day with you is a blessing, every moment a treasure.</p>
<p>You make me laugh, you make me think, you make me want to be better.</p>
<p>I love you more than words can express. Happy Valentine's Day, my love! 💕</p>
{/* END OF EDITABLE SECTION */}
```

### 4. Test Locally
```bash
npm run dev
```

Open your browser to `http://localhost:5173` to test the site.

**Test the password:** `1617`

### 5. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **valentines-rimmu** (or any name)
   - In which directory is your code located? **.**
   - Want to override settings? **N**

4. Your site will be deployed! You'll get a URL like: `https://valentines-rimmu.vercel.app`

#### Option B: Using Vercel Dashboard
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

### 6. Share with Rimmu! 🎉

Once deployed, you'll get a shareable link that works perfectly on iPhone!

## 📱 Features

1. **Password Protection** - Secret code: 1617
2. **Valentine Proposal** - Interactive Yes/No with GIFs
3. **Game Introduction** - Fun transition page
4. **Fishing Game** - Catch 3 fish mini-game (works with keyboard arrows or on-screen buttons for mobile)
5. **Gift Scene** - Sweet animation of giving the fish
6. **Time Together Counter** - Live counter showing time since October 17, 2024
7. **Custom Message Page** - Your personalized message with floating hearts
8. **Final Page** - Your photo together with decorations and balloons

## 🎮 Game Controls

**Desktop:** Use Arrow Left/Right keys
**Mobile:** Tap and hold the on-screen Left/Right buttons

## 🎨 Customization Tips

- All colors and styles are in the `<style>` section of `src/App.jsx`
- To change the relationship start date, edit line 270: `const startDate = new Date('2024-10-17T01:00:00');`
- To change the password, edit line 18: `if (password === '1617')`
- To add more text to the final page, edit the `FinalPage` component

## ❤️ Made with Love

Built with React, Vite, and lots of love for Rimmu!

## 🆘 Troubleshooting

**GIFs not showing?**
- Make sure they're in the `public` folder
- Check the file names match exactly: `proposal.gif`, `crying.gif`
- GIF files are case-sensitive!

**Photo not showing?**
- Make sure it's named `couple-photo.jpg` in the `public` folder
- Try different image formats (.jpg, .jpeg, .png) if needed

**Site not deploying?**
- Make sure all files are committed to Git
- Check that `package.json` exists
- Verify Node.js version is 18 or higher

---

Happy Valentine's Day! 💕✨
