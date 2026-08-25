# HIGH TECH PS - Host Project

مستودع متكامل ومجهز للعرض المباشر واستضافة الويب عبر **GitHub Pages** لتشغيل المضيف مع دعم كامل للتخزين المؤقت أوفلاين (Offline Caching)[cite: 3].

---

## 🌟 المميزات

* **واجهة موحدة:** تحتوي على زر مركزي تفاعلي وشاشة لعرض سجلات وتنبيهات الكاش والنظام مباشرة.
* **دعم التخزين الأوفلاين (Offline):** متوافق مع نظام التخزين المؤقت **AppCache** و **Service Worker** لضمان عمل الموقع بدون اتصال بالإنترنت[cite: 3].
* **تصميم عصري ومتجاوب:** تصميم مخصص يتناسب مع شاشات المتصفح على أجهزة PlayStation والهواتف وأجهزة المكتب.

---

## 📁 الهيكل الكامل لمجلدات وملفات المستودع

```text
├── index.html                  # الصفحة الرئيسية للواجهة
├── background.png              # صورة الخلفية والشعار الرئيسي
├── manifest.json               # ملف تعريف تطبيق الويب (PWA)
├── cache.manifest              # قائمة الكاش الكلية لنظام AppCache
├── sw.js                       # ملف Service Worker للتخزين المؤقت
├── README.md                   # ملف التعليمات ووصف المستودع
│
├── boobs/                      # مجلد ملفات ثغرة boobs
│   ├── exfathax.img
│   ├── exfathax_pico.img
│   ├── index.html
│   ├── int64.js
│   ├── kexploit.js
│   ├── patch.s
│   ├── rop.js
│   └── webkit.js
│
├── includes/                   # مجلد ملفات الواجهة والتحكم بالكاش
│   ├── applicationCache.js     # ملف متابعة ونسبة شريط كاش الصفحة
│   ├── script.js              # ملف التفاعل والتنفيذ
│   └── style.css               # ملف تنسيقات CSS والواجهة
│
├── lapsus/                     # مجلد حزمة Lapsus
│   ├── fonts/                  # الخطوط والتراخيص
│   │   ├── FONTS.LICENSE
│   │   ├── LiberationMono-Regular.ttf
│   │   └── README.txt
│   ├── kpatch/                 # ملفات تصحيح النواة (Kernel Patches)
│   ├── lapse/                  # وحدة PS4 الفرعية
│   ├── module/                 # وحدات الذاكرة والنظام (mjs)
│   ├── rop/                    # ملفات ROP الفرعية
│   ├── Exploit Host Server v1.0.exe
│   ├── about.html
│   ├── alert.mjs
│   ├── config.mjs
│   ├── index.html
│   ├── lapse.mjs
│   ├── payload.bin
│   ├── psfree.mjs
│   └── send.mjs
│
├── psfree/                     # مجلد حزمة PSFree
│   ├── kernel/                 # ملفات النواة والصور
│   ├── kpatch/                 # ملفات الباتش وسكريبتات التجميع
│   ├── module/                 # ملفات الذاكرة والثوابت
│   ├── rop/                    # ملفات ROP
│   ├── COPYING
│   ├── about.html
│   ├── alert.mjs
│   ├── config.mjs
│   ├── exploit.mjs
│   ├── index.html
│   └── send.mjs
│
└── src/                        # مجلد السكريبتات والـ Patches الرئيسية
    ├── ps4/                    # ملفات نواة ومستخدم PS4
    ├── patches/                # ملفات الباتشات الثنائية (bin)
    ├── lapse.js
    ├── loader.js
    ├── main.js
    ├── misc.js
    ├── netctrl.js
    ├── payload.bin
    ├── utils.mjs
    ├── worker.js
    └── workers.js
