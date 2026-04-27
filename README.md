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

- `emailTo`: כתובת המייל לקבלת פניות (למשל `miriam@domain.co.il`)
- `phoneE164`: מספר טלפון בפורמט בינלאומי (למשל `+9725XXXXXXXX`)
- `instagramUrl`, `mapsUrl`: קישורים אם יש

## החלפת תמונות בגלריה

בתיקייה `assets/` יש כרגע תמונות Placeholder (`gallery-1.svg` וכו’).

כדי להחליף לתמונות אמיתיות:

- שימי את הקבצים בתיקיית `assets/`
- עדכני את ההפניות ב־`index.html` (החלק של `#gallery`)

