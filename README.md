# Miriam Rotenberg — דף נחיתה

דף נחיתה סטטי (HTML/CSS/JS) בעברית (RTL) עבור חברת ייצור פאות.

## פתיחה מקומית (Windows)

- פתחי את הקובץ `index.html` בדפדפן (Double click).
- לחלופין, אם יש לך Python מותקן:

```bash
python -m http.server 5500
```

ואז להיכנס ל־`http://localhost:5500`.

## עדכון פרטי קשר

בקובץ `script.js` חפשי את האובייקט `CONTACT` ועדכני:

- `phoneE164`: מספר טלפון בפורמט בינלאומי (למשל `+9725XXXXXXXX`)
- `instagramUrl`, `mapsUrl`: קישורים אם יש

## שליחת “צור קשר” ישירות למייל (ב־Vercel)

הטופס שולח ל־`/api/contact` (פונקציית Serverless ב־Vercel) ומשם נשלח מייל דרך Resend.

כדי שזה יעבוד בפרודקשן צריך להגדיר ב־Vercel → Project → Settings → Environment Variables:

- `RESEND_API_KEY`: המפתח מ־Resend
- `CONTACT_EMAIL_TO`: כתובת המייל לקבלת פניות (למשל `riki2061@gmail.com`)
- `CONTACT_EMAIL_FROM` (אופציונלי): כתובת “From” מאומתת ב־Resend. אם לא מגדירים, משתמשים ב־`onboarding@resend.dev`.

## החלפת תמונות בגלריה

כל פריטי הגלריה משתמשים באותו קובץ: `assets/gallery-showcase.png`. להחלפה — החליפי את הקובץ הזה ועדכני את הנתיב ב־`index.html` אם שינית את השם.

