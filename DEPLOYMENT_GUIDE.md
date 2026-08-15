# 🚀 How to Host & Share Your Project (Deployment Guide)

আপনার বন্ধুদের দেখানোর জন্য আপনার কাছে ২টি অপশন রয়েছে:

---

## ⚡ অপশন ১: তাৎক্ষণিক বন্ধুদের দেখানোর লিংক (Instant LocalTunnel)

আপনার কম্পিউটার যখন চালু থাকবে এবং সার্ভার রানিং থাকবে, তখন সাময়িকভাবে বন্ধুদের দেখাতে নিচের কমান্ড দুটি চালান:

### ১. ব্যাকএন্ডের জন্য পাবলিক লিংক:
```powershell
npx localtunnel --port 5000
```
*(একটি লিংক পাবেন, যেমন `https://my-backend-hasu.loca.lt`)*

### ২. ফ্রন্টএন্ডের জন্য পাবলিক লিংক:
```powershell
npx localtunnel --port 5173
```
*(একটি লিংক পাবেন, যেমন `https://my-portfolio-hasu.loca.lt`)*

> ফ্রন্টএন্ডের লিংকে ঢুকলে বন্ধুদের একটি **"Click to Continue"** বাটন আসতে পারে, সেখানে ক্লিক করলেই আপনার পুরো সাইট দেখতে পাবে!

---

## 🌐 অপশন ২: স্থায়ীভাবে ইন্টারনেটে লাইভ করা (100% Free Lifetime Hosting)

আপনার কম্পিউটার বন্ধ থাকলেও ২৪ ঘণ্টা যে কেউ ব্রাউজার থেকে ভিজিট করতে পারবে:

### ধাপ ১: ফ্রি ক্লাউড ডাটাবেজ (MySQL)
1. **[Aiven.io](https://aiven.io)** অথবা **[TiDB Cloud](https://tidbcloud.com)**-এ ফ্রি অ্যাকাউন্ট খুলুন।
2. একটি ফ্রি MySQL সার্ভিস তৈরি করে ডাটাবেজ Host, User, Password ও Name কপি করুন।

### ধাপ ২: ব্যাকএন্ড ডিপ্লয় (Render.com)
1. প্রজেক্টের `server` ফোল্ডারটি আপনার GitHub রিপোজিটরিতে পুশ করুন।
2. **[Render.com](https://render.com)**-এ ফ্রি একাউন্ট খুলে **New Web Service** সিলেক্ট করুন।
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Environment Variables-এ Aiven/TiDB-এর `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` বসিয়ে দিন।
6. Render আপনাকে একটি লাইভ ব্যাকএন্ড URL দিবে (যেমন: `https://hasu-api.onrender.com`)।

### ধাপ ৩: ফ্রন্টএন্ড ডিপ্লয় (Vercel.com)
1. প্রজেক্টের `latest` ফোল্ডারটি GitHub-এ পুশ করুন।
2. **[Vercel.com](https://vercel.com)**-এ যান এবং GitHub রিপোজিটরিটি ইমপোর্ট করুন।
3. **Environment Variables**-এ যোগ করুন:
   - `VITE_API_URL` = `https://hasu-api.onrender.com` (আপনার Render ব্যাকএন্ডের লিংক)
4. **Deploy** বাটনে ক্লিক করুন!

> সাথে সাথে আপনি পাবেন আপনার নিজস্ব কাস্টম লাইভ লিংক (যেমন: `https://hasus-digital-space.vercel.app`) যা যেকোনো বন্ধু বা ক্লায়েন্টকে আজীবনের জন্য শেয়ার করতে পারবেন!
