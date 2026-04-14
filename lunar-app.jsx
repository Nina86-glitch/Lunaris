<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Lunaris">
<meta name="theme-color" content="#07060e">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon-192.png">
<title>Lunaris</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
::-webkit-scrollbar{display:none;}
body{font-family:'Cormorant Garamond','Georgia',serif;background:linear-gradient(170deg,#07060e 0%,#0f0e1a 40%,#141225 100%);color:#d4c9a8;min-height:100vh;min-height:100dvh;max-width:430px;margin:0 auto;overflow-x:hidden;position:relative;padding-top:env(safe-area-inset-top);}
.stars{position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:0;}
.star{position:absolute;border-radius:50%;background:#e8d89a;animation:twinkle 3s ease-in-out infinite alternate;}
@keyframes twinkle{0%{opacity:.1}100%{opacity:.6}}
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer{0%,100%{opacity:.6}50%{opacity:1}}
.content{position:relative;z-index:1;padding-bottom:100px;}
.header{text-align:center;padding:36px 20px 10px;}
.header h1{font-size:28px;font-weight:300;letter-spacing:4px;color:#e8d89a;text-transform:uppercase;}
.header .sub{font-size:11px;letter-spacing:8px;color:rgba(200,180,100,.4);margin-top:4px;text-transform:uppercase;}
.account-bar{text-align:center;padding:0 20px 8px;cursor:pointer;}
.account-bar span{font-size:12px;color:rgba(200,180,100,.5);letter-spacing:1px;}
.account-bar .name{color:#ffd700;font-size:14px;}
.tab-bar{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;display:flex;justify-content:space-around;background:linear-gradient(to top,rgba(7,6,14,.98),rgba(7,6,14,.85));backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);padding:8px 0 calc(20px + env(safe-area-inset-bottom));z-index:10;border-top:1px solid rgba(200,180,100,.1);overflow-x:auto;}
.tab-btn{display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:none;cursor:pointer;font-size:8px;letter-spacing:1px;font-family:'Cormorant Garamond',serif;text-transform:uppercase;transition:color .3s;padding:4px 6px;flex-shrink:0;}
.tab-btn.active{color:#ffd700;}
.tab-btn:not(.active){color:rgba(200,180,100,.35);}
.tab-icon{font-size:18px;}
.page{display:none;animation:fadeIn .4s ease;}
.page.active{display:block;}
.card{background:rgba(200,180,100,.04);border:1px solid rgba(200,180,100,.1);border-radius:16px;margin:12px 16px;padding:20px;}
.section-title{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:rgba(200,180,100,.4);margin-bottom:16px;}
.moon-info{text-align:center;padding:20px 20px 0;}
.moon-age{font-size:13px;color:rgba(200,180,100,.5);letter-spacing:2px;margin-top:12px;}
.moon-name{font-size:22px;color:#e8d89a;margin-top:4px;font-weight:400;}
.illumination{font-size:40px;color:#ffd700;font-weight:300;margin-top:8px;}
.illum-label{font-size:12px;color:rgba(200,180,100,.4);margin-top:2px;}
.month-nav{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;}
.month-nav.center{justify-content:center;gap:16px;}
.month-btn{background:none;border:none;color:rgba(200,180,100,.5);font-size:20px;cursor:pointer;padding:4px 12px;}
.month-label{font-size:16px;color:#e8d89a;letter-spacing:3px;text-transform:uppercase;}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;padding:0 16px;}
.cal-header{text-align:center;font-size:10px;color:rgba(200,180,100,.3);letter-spacing:1px;padding:4px 0;}
.cal-day{text-align:center;padding:6px 0;border-radius:10px;cursor:pointer;border:1px solid transparent;transition:all .2s;}
.cal-day.today{background:rgba(255,215,0,.15);border-color:rgba(255,215,0,.3);}
.cal-day.selected{background:rgba(200,180,100,.1);border-color:rgba(200,180,100,.2);}
.cal-day .num{font-size:13px;color:rgba(200,180,100,.6);}
.cal-day.today .num{color:#ffd700;}
.cal-day .moon{font-size:7px;margin-top:1px;opacity:.7;}
.cal-day.good{background:rgba(26,188,156,.08);}
.cal-day.bad{background:rgba(231,76,60,.06);}
.phase-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.phase-item{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(200,180,100,.5);}
.phase-item span{font-size:16px;}
.filter-bar{display:flex;gap:8px;padding:0 16px 12px;overflow-x:auto;}
.filter-btn{padding:6px 14px;border-radius:20px;border:1px solid rgba(200,180,100,.1);background:transparent;color:rgba(200,180,100,.4);font-size:11px;letter-spacing:1px;cursor:pointer;white-space:nowrap;font-family:'Cormorant Garamond',serif;}
.filter-btn.active{border-color:rgba(255,215,0,.4);background:rgba(255,215,0,.1);color:#ffd700;}
.holiday-item{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid rgba(200,180,100,.06);}
.holiday-icon{font-size:26px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:rgba(200,180,100,.06);flex-shrink:0;}
.holiday-name{font-size:15px;color:#d4c9a8;}
.holiday-date{font-size:12px;color:rgba(200,180,100,.4);margin-top:2px;}
.badge{font-size:9px;padding:2px 8px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;display:inline-block;margin-top:3px;margin-left:6px;}
.badge-state{background:rgba(231,76,60,.13);color:#e74c3c;}
.badge-orthodox{background:rgba(255,215,0,.13);color:#ffd700;}
.badge-folk{background:rgba(230,126,34,.13);color:#e67e22;}
.badge-other{background:rgba(155,89,182,.13);color:#9b59b6;}
.form-group{margin-bottom:14px;}
.form-group label{font-size:12px;color:rgba(200,180,100,.4);letter-spacing:1px;display:block;margin-bottom:6px;text-transform:uppercase;}
.form-input{background:rgba(200,180,100,.06);border:1px solid rgba(200,180,100,.15);border-radius:12px;color:#e8d89a;padding:12px 16px;font-size:16px;font-family:'Cormorant Garamond',serif;width:100%;outline:none;}
input[type="date"]::-webkit-calendar-picker-indicator,input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(.7) sepia(1) hue-rotate(10deg);}
textarea.form-input{resize:none;min-height:80px;}
.btn{background:linear-gradient(135deg,rgba(255,215,0,.2),rgba(200,180,100,.1));border:1px solid rgba(255,215,0,.3);border-radius:12px;color:#ffd700;padding:14px 24px;font-size:14px;font-family:'Cormorant Garamond',serif;letter-spacing:3px;text-transform:uppercase;cursor:pointer;width:100%;transition:all .3s;}
.btn:active{transform:scale(.98);}
.btn-sm{padding:10px 16px;font-size:12px;letter-spacing:2px;}
.btn-danger{border-color:rgba(231,76,60,.3);color:#e74c3c;background:rgba(231,76,60,.1);}
.planet-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(200,180,100,.06);font-size:14px;}
.planet-name{color:#e8d89a;}
.element-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.element-card{text-align:center;padding:12px;border-radius:12px;}
.element-card .count{font-size:20px;}
.element-card .label{font-size:11px;color:rgba(200,180,100,.5);margin-top:2px;}
.element-badge{display:inline-block;margin-top:8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:4px 14px;border-radius:20px;}
.num-result{text-align:center;padding:16px 0;}
.num-big{font-size:56px;color:#ffd700;font-weight:300;line-height:1;}
.num-label{font-size:13px;color:rgba(200,180,100,.5);letter-spacing:2px;margin-top:4px;}
.num-desc{font-size:14px;color:rgba(200,180,100,.7);margin-top:12px;line-height:1.6;text-align:left;}
.affirmation-box{background:linear-gradient(135deg,rgba(255,215,0,.06),rgba(200,180,100,.03));border:1px solid rgba(255,215,0,.15);border-radius:16px;padding:24px 20px;margin:12px 16px;text-align:center;}
.affirmation-text{font-size:18px;color:#e8d89a;font-style:italic;line-height:1.6;}
.affirmation-label{font-size:11px;color:rgba(200,180,100,.3);letter-spacing:3px;text-transform:uppercase;margin-bottom:12px;}
.chi-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;letter-spacing:1px;margin:4px;}
.chi-good{background:rgba(26,188,156,.12);color:#1abc9c;border:1px solid rgba(26,188,156,.2);}
.chi-bad{background:rgba(231,76,60,.12);color:#e74c3c;border:1px solid rgba(231,76,60,.2);}
.chi-neutral{background:rgba(200,180,100,.08);color:rgba(200,180,100,.6);border:1px solid rgba(200,180,100,.15);}
.reco-item{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid rgba(200,180,100,.06);}
.reco-icon{font-size:22px;flex-shrink:0;margin-top:2px;}
.reco-text{font-size:14px;color:rgba(200,180,100,.6);line-height:1.5;}
.reco-title{color:#d4c9a8;font-size:15px;margin-bottom:2px;}
.legend{display:flex;gap:12px;justify-content:center;margin:8px 0;flex-wrap:wrap;}
.legend-item{display:flex;align-items:center;gap:4px;font-size:11px;color:rgba(200,180,100,.4);}
.legend-dot{width:10px;height:10px;border-radius:3px;flex-shrink:0;}
/* I Ching */
.hexagram{display:flex;flex-direction:column;align-items:center;gap:6px;margin:20px 0;}
.hex-line{width:120px;height:10px;display:flex;justify-content:space-between;align-items:center;}
.hex-yang{background:#e8d89a;width:100%;height:8px;border-radius:1px;box-shadow:0 0 8px rgba(232,216,154,.4);}
.hex-yin{display:flex;width:100%;justify-content:space-between;}
.hex-yin span{display:block;width:48%;height:8px;background:#e8d89a;border-radius:1px;box-shadow:0 0 8px rgba(232,216,154,.4);}
.hex-number{font-size:14px;color:rgba(200,180,100,.4);letter-spacing:2px;text-transform:uppercase;margin-top:8px;}
.hex-name{font-size:24px;color:#ffd700;margin-top:4px;}
.hex-name-cn{font-size:32px;color:#e8d89a;margin-top:2px;}
.hex-meaning{font-size:13px;color:rgba(200,180,100,.5);text-transform:uppercase;letter-spacing:2px;margin-top:4px;}
.hex-text{font-size:14px;color:rgba(200,180,100,.7);line-height:1.7;margin-top:16px;}
.hex-judgment{font-style:italic;border-left:2px solid rgba(255,215,0,.3);padding-left:14px;margin:12px 0;color:rgba(232,216,154,.85);}
/* Interpretation */
.interp-section{margin-top:14px;padding-top:14px;border-top:1px solid rgba(200,180,100,.08);}
.interp-section:first-child{margin-top:0;padding-top:0;border-top:none;}
.interp-title{font-size:13px;color:#ffd700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;}
.interp-text{font-size:14px;color:rgba(200,180,100,.7);line-height:1.6;}
</style>
</head>
<body>
<div class="stars" id="stars"></div>
<div class="content">
<div class="header"><h1>Lunaris</h1><div class="sub">Лунный путеводитель</div></div>
<div class="account-bar" id="account-bar" onclick="showTab('profile')"></div>

<div class="page active" id="page-today"></div>

<div class="page" id="page-moon">
<div class="moon-info"><div id="moon-svg"></div><div class="moon-age" id="moon-age-text"></div><div class="moon-name" id="moon-name-text"></div><div class="illumination" id="moon-illum"></div><div class="illum-label">освещённость</div></div>
<div class="card"><div style="font-size:13px;color:rgba(200,180,100,.6);text-align:center;font-style:italic;" id="moon-advice"></div></div>
<div class="month-nav"><button class="month-btn" id="moon-prev">‹</button><span class="month-label" id="moon-month-label"></span><button class="month-btn" id="moon-next">›</button></div>
<div class="legend"><div class="legend-item"><div class="legend-dot" style="background:rgba(26,188,156,.25);"></div> Благоприятный</div><div class="legend-item"><div class="legend-dot" style="background:rgba(231,76,60,.2);"></div> Неблагоприятный</div></div>
<div class="cal-grid" id="cal-headers"></div><div class="cal-grid" id="cal-days"></div>
<div class="card" style="margin-top:16px;"><div class="section-title">Фазы луны</div><div class="phase-grid"><div class="phase-item"><span>🌑</span> Новолуние</div><div class="phase-item"><span>🌒</span> Растущий серп</div><div class="phase-item"><span>🌓</span> Первая четверть</div><div class="phase-item"><span>🌔</span> Растущая луна</div><div class="phase-item"><span>🌕</span> Полнолуние</div><div class="phase-item"><span>🌖</span> Убывающая луна</div><div class="phase-item"><span>🌗</span> Последняя четв.</div><div class="phase-item"><span>🌘</span> Убывающий серп</div></div></div>
</div>

<div class="page" id="page-holidays">
<div class="month-nav center"><button class="month-btn" id="hol-prev">‹</button><span class="month-label" id="hol-year-label"></span><button class="month-btn" id="hol-next">›</button></div>
<div class="filter-bar" id="filter-bar"></div><div style="padding:0 16px;" id="holiday-list"></div>
</div>

<div class="page" id="page-natal">
<div class="card" style="margin-top:20px;"><div class="section-title">Натальная карта</div><div class="form-group"><label>Дата рождения</label><input type="date" class="form-input" id="birth-date"></div><div class="form-group"><label>Время рождения</label><input type="time" class="form-input" id="birth-time" value="12:00"></div><button class="btn" id="natal-btn">Построить карту</button></div>
<div id="natal-result"></div>
</div>

<div class="page" id="page-iching">
<div id="iching-daily"></div>
<div class="card" style="margin-top:12px;text-align:center;">
<div class="section-title">Задать вопрос Книге Перемен</div>
<div style="font-size:13px;color:rgba(200,180,100,.6);line-height:1.7;margin-bottom:16px;">Сосредоточьтесь на своём вопросе и бросьте монеты. Ответ придёт через одну из 64 гексаграмм.</div>
<div class="form-group"><label>Ваш вопрос</label><textarea class="form-input" id="iching-question" placeholder="О чём вы хотите спросить Вселенную?"></textarea></div>
<button class="btn" id="iching-btn">🪙 Бросить монеты</button>
</div>
<div id="iching-result"></div>
</div>

<div class="page" id="page-profile">
<div class="card" style="margin-top:20px;"><div class="section-title">Ваш профиль</div><div class="form-group"><label>Фамилия</label><input type="text" class="form-input" id="prof-last" placeholder="Иванова"></div><div class="form-group"><label>Имя</label><input type="text" class="form-input" id="prof-first" placeholder="Анна"></div><div class="form-group"><label>Отчество</label><input type="text" class="form-input" id="prof-middle" placeholder="Сергеевна"></div><div class="form-group"><label>Дата рождения</label><input type="date" class="form-input" id="prof-birth"></div><div class="form-group"><label>Время рождения</label><input type="time" class="form-input" id="prof-time" value="12:00"></div><button class="btn" onclick="saveProfile()" style="margin-bottom:12px;">Сохранить</button><button class="btn btn-sm btn-danger" onclick="clearProfile()">Удалить данные</button></div>
<div id="numerology-result"></div>
</div>
</div>

<div class="tab-bar">
<button class="tab-btn active" data-tab="today"><span class="tab-icon">✨</span><span>Сегодня</span></button>
<button class="tab-btn" data-tab="moon"><span class="tab-icon">🌙</span><span>Луна</span></button>
<button class="tab-btn" data-tab="holidays"><span class="tab-icon">🎄</span><span>Праздн.</span></button>
<button class="tab-btn" data-tab="natal"><span class="tab-icon">🔮</span><span>Натал.</span></button>
<button class="tab-btn" data-tab="iching"><span class="tab-icon">☯️</span><span>И-Цзин</span></button>
<button class="tab-btn" data-tab="profile"><span class="tab-icon">👤</span><span>Профиль</span></button>
</div>

<script>
const MONTHS=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const DAYS_W=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const ZODIAC=[{name:'Овен',symbol:'♈',element:'fire',s:[3,21],e:[4,19]},{name:'Телец',symbol:'♉',element:'earth',s:[4,20],e:[5,20]},{name:'Близнецы',symbol:'♊',element:'air',s:[5,21],e:[6,20]},{name:'Рак',symbol:'♋',element:'water',s:[6,21],e:[7,22]},{name:'Лев',symbol:'♌',element:'fire',s:[7,23],e:[8,22]},{name:'Дева',symbol:'♍',element:'earth',s:[8,23],e:[9,22]},{name:'Весы',symbol:'♎',element:'air',s:[9,23],e:[10,22]},{name:'Скорпион',symbol:'♏',element:'water',s:[10,23],e:[11,21]},{name:'Стрелец',symbol:'♐',element:'fire',s:[11,22],e:[12,21]},{name:'Козерог',symbol:'♑',element:'earth',s:[12,22],e:[1,19]},{name:'Водолей',symbol:'♒',element:'air',s:[1,20],e:[2,18]},{name:'Рыбы',symbol:'♓',element:'water',s:[2,19],e:[3,20]}];

const ZODIAC_INTERP=[
'Овен — знак огненной стихии, управляемый Марсом. Вы прирождённый лидер, наделённый храбростью, страстью и неутомимой энергией. Ваша сила в умении начинать новое и идти первым там, где другие медлят. Ключевые черты: решительность, импульсивность, искренность, конкурентность.',
'Телец — знак земной стихии, управляемый Венерой. Вы цените стабильность, красоту и удовольствия жизни. Ваша сила в терпении, надёжности и умении создавать уют. Ключевые черты: упорство, чувственность, практичность, верность.',
'Близнецы — знак воздушной стихии, управляемый Меркурием. Вы обладаете острым умом, любознательностью и даром общения. Ваша сила в умении адаптироваться и видеть мир с разных сторон. Ключевые черты: интеллект, остроумие, переменчивость, общительность.',
'Рак — знак водной стихии, управляемый Луной. Вы глубоко чувствуете, заботитесь о близких и обладаете сильной интуицией. Ваша сила в эмоциональной мудрости и преданности семье. Ключевые черты: чуткость, забота, ранимость, память.',
'Лев — знак огненной стихии, управляемый Солнцем. Вы созданы сиять, вдохновлять и вести за собой. Ваша сила в харизме, благородстве и творческом самовыражении. Ключевые черты: гордость, щедрость, артистизм, великодушие.',
'Дева — знак земной стихии, управляемый Меркурием. Вы аналитичны, внимательны к деталям и стремитесь к совершенству. Ваша сила в умении служить и улучшать всё вокруг. Ключевые черты: скрупулёзность, скромность, рассудительность, забота.',
'Весы — знак воздушной стихии, управляемый Венерой. Вы стремитесь к гармонии, красоте и справедливости. Ваша сила в умении находить баланс и видеть обе стороны. Ключевые черты: дипломатичность, эстетика, нерешительность, обаяние.',
'Скорпион — знак водной стихии, управляемый Плутоном. Вы глубоки, страстны и обладаете магнетизмом. Ваша сила в способности к глубокой трансформации. Ключевые черты: интенсивность, проницательность, страстность, сила воли.',
'Стрелец — знак огненной стихии, управляемый Юпитером. Вы свободолюбивы, оптимистичны и стремитесь к познанию. Ваша сила в широте взглядов и философском уме. Ключевые черты: открытость, независимость, мудрость, прямолинейность.',
'Козерог — знак земной стихии, управляемый Сатурном. Вы амбициозны, дисциплинированны и нацелены на результат. Ваша сила в терпении и умении достигать вершин. Ключевые черты: ответственность, упорство, честолюбие, выдержка.',
'Водолей — знак воздушной стихии, управляемый Ураном. Вы оригинальны, прогрессивны и независимы. Ваша сила в нестандартном мышлении и гуманизме. Ключевые черты: новаторство, свобода, дружелюбие, идеализм.',
'Рыбы — знак водной стихии, управляемый Нептуном. Вы мечтательны, сострадательны и духовны. Ваша сила в богатом воображении и эмпатии. Ключевые черты: чувствительность, творчество, мечтательность, мудрость.'
];

const PLANETS=['☉ Солнце','☽ Луна','☿ Меркурий','♀ Венера','♂ Марс','♃ Юпитер','♄ Сатурн','⛢ Уран','♆ Нептун','♇ Плутон'];
const PLANET_MEANINGS=[
'Солнце — ваша суть, эго, жизненная сила и то, кем вы являетесь в самой глубине. Показывает источник вашей энергии и творческого самовыражения.',
'Луна — ваши эмоции, инстинкты, подсознание и то, что вам нужно для чувства безопасности. Показывает внутренний мир и реакции.',
'Меркурий — ваш ум, способ мышления, общения и обучения. Показывает, как вы воспринимаете и передаёте информацию.',
'Венера — ваша любовь, ценности, эстетика и то, что приносит удовольствие. Показывает, как вы любите и что цените.',
'Марс — ваша воля, страсть, действие и борьба. Показывает, как вы добиваетесь желаемого и проявляете энергию.',
'Юпитер — ваше расширение, удача, философия и рост. Показывает, где вы находите смысл и куда движетесь духовно.',
'Сатурн — ваши уроки, ограничения, дисциплина и зрелость. Показывает, где вы должны проявить терпение и работу над собой.',
'Уран — ваша уникальность, свобода и неожиданные перемены. Показывает, где вы стремитесь к независимости и инновациям.',
'Нептун — ваши мечты, духовность, иллюзии и тайны. Показывает связь с высшим и творческое вдохновение.',
'Плутон — ваша трансформация, сила и глубина. Показывает, где происходят радикальные перемены и обретение силы.'
];

const ELEM_COLORS={fire:'#e74c3c',earth:'#8B6914',air:'#3498db',water:'#1abc9c'};
const ELEM_NAMES={fire:'🔥 Огонь',earth:'🌍 Земля',air:'💨 Воздух',water:'💧 Вода'};
const ELEM_INTERP={
fire:'Огненная стихия даёт вам страсть, инициативу, вдохновение и творческую энергию. Вы заряжаете окружающих и стремитесь к самовыражению.',
earth:'Земная стихия даёт вам практичность, надёжность, терпение и связь с материальным миром. Вы создаёте основу и заботитесь о реальных результатах.',
air:'Воздушная стихия даёт вам интеллект, общительность, лёгкость и способность к абстрактному мышлению. Вы соединяете людей и идеи.',
water:'Водная стихия даёт вам чувствительность, интуицию, эмпатию и эмоциональную глубину. Вы понимаете невидимое и чувствуете тонко.'
};

// Detailed natal interpretations per zodiac sign
const CHARACTER=[
'Вы энергичны, решительны и независимы. Импульсивность часто ведёт вас вперёд быстрее разума. В вас живёт внутренний воин — вы не боитесь конфликтов и умеете отстаивать свою правду. Искренни, открыты, иногда резки. Быстро загораетесь идеями, но можете так же быстро терять интерес.',
'Вы спокойны, основательны и чувственны. Любите красоту, вкусную еду, уют и стабильность. Упрямы — переубедить вас почти невозможно, но вы надёжны как скала. Медленно раскачиваетесь, но уж если взялись — доводите до конца. Цените материальный комфорт и верность.',
'Вы живы, подвижны, общительны. Ваш ум работает со скоростью молнии — схватываете всё на лету. Любите новое, скучаете от рутины. Двойственны: в вас уживаются разные «я». Блестяще говорите и пишете. Иногда рассеяны и непостоянны — внимание прыгает с темы на тему.',
'Вы глубоко чувствительны, заботливы и привязаны к дому. Обладаете феноменальной памятью и интуицией. Настроение меняется как фазы луны. Ранимы и защищаете свою мягкость панцирем. Тонко чувствуете других, иногда растворяетесь в чужих эмоциях. Преданы семье.',
'Вы яркая личность с королевским достоинством. Нуждаетесь в признании и восхищении. Великодушны, щедры, верны. Любите быть в центре внимания и организовывать праздники. Горды — задеть ваше самолюбие опасно. Творческая натура, часто артистичная.',
'Вы точны, аналитичны и внимательны к деталям. Перфекционист — видите все недостатки, прежде всего в себе. Скромны, трудолюбивы, любите порядок и чистоту. Критичны (иногда чрезмерно). Практичный ум и тонкий вкус. Стремитесь быть полезными другим.',
'Вы ищете гармонию во всём. Красивы внешне и внутренне, любите искусство, эстетику и справедливость. Дипломатичны, умеете сглаживать углы. Нерешительны — долго взвешиваете все «за» и «против». Не терпите грубости и дисгармонии. Нуждаетесь в партнёрстве.',
'Вы глубоки, страстны и скрытны. Обладаете магнетизмом и силой, которую чувствуют все вокруг. Интуитивны, видите людей насквозь. Не прощаете предательства. Проходите через кризисы и возрождения. Способны на великие свершения и глубокие трансформации.',
'Вы свободолюбивы, оптимистичны, любите путешествия и приключения. Философский ум ищет большие смыслы. Прямолинейны — режете правду-матку. Не выносите ограничений. Щедры, открыты, заразительно жизнерадостны. Иногда беззаботны до легкомыслия.',
'Вы серьёзны, ответственны и целеустремлённы. Медленно но верно поднимаетесь к вершинам. Сдержанны в эмоциях, но глубоко чувствуете. Уважаете традиции, авторитет, иерархию. С возрастом только молодеете душой. Выносливы, терпеливы, надёжны.',
'Вы оригинальны, прогрессивны и независимы. Мыслите нестандартно, опережаете время. Цените дружбу и свободу превыше всего. Интересуетесь наукой, технологиями или гуманитарными идеями. Эмоционально дистанцированы — ум важнее чувств. Не терпите шаблонов.',
'Вы мечтательны, сострадательны и духовны. Живёте в мире образов, фантазий и чувств. Безгранично эмпатичны — растворяетесь в других. Творческий дар, тонкая интуиция, связь с высшим. Уязвимы к чужому влиянию, иногда теряетесь в иллюзиях. Прекрасный целитель душ.'
];

const TALENTS=[
'Лидерство, спорт, военное дело, предпринимательство, экстремальные профессии. Вы первопроходец — способны начинать с нуля и вдохновлять других. Талант быстрых решений, смелость в кризисах.',
'Искусство, кулинария, финансы, садоводство, музыка, дизайн. У вас талант создавать красоту и материальную ценность. Хорошо работаете с руками и обладаете чувством формы.',
'Журналистика, писательство, преподавание, переводы, торговля, IT. Ваш дар — слово и коммуникация. Легко изучаете языки, умеете объяснять сложное простым языком.',
'Психология, медицина, кулинария, воспитание, недвижимость, история. Вы понимаете эмоции людей и умеете заботиться. Талант к сохранению традиций и созданию атмосферы.',
'Актёрство, режиссура, педагогика, руководство, творчество, мода. Вы умеете быть в свете софитов и вдохновлять других. Природное обаяние и организаторский талант.',
'Медицина, аналитика, бухгалтерия, редактура, диетология, исследования. Ваш дар — в деталях, точности и систематизации. Способность видеть то, что другие пропускают.',
'Юриспруденция, дизайн, искусство, дипломатия, индустрия красоты, партнёрские проекты. Талант к эстетике, балансу и переговорам. Вы видите обе стороны любого вопроса.',
'Психоанализ, следствие, хирургия, оккультные науки, кризисный менеджмент, исследования. Способность к глубокой работе с тем, что другие боятся трогать. Дар трансформации.',
'Путешествия, преподавание, философия, международные связи, издательское дело, спорт. Талант видеть широкую картину и вдохновлять масштабными идеями.',
'Менеджмент, политика, строительство, архитектура, бизнес, наставничество. Талант стратегического планирования и достижения долгосрочных целей. Надёжный руководитель.',
'Наука, IT, социальные проекты, изобретательство, астрология, психология групп. Талант видеть будущее и создавать инновации. Работа с коллективами и идеями.',
'Искусство, музыка, поэзия, кинематограф, целительство, духовные практики, работа с водой. Талант проникать за грань видимого и выражать невыразимое.'
];

const KARMA=[
'Ваша карма — научиться действовать не только ради себя, но и для других. Усмирить эго, гнев и импульсивность. Развить терпение и умение слушать. Прошлые жизни: воины, первопроходцы. Урок этой жизни — сотрудничество.',
'Ваша карма — научиться отпускать материальную привязанность и жадность. Не цепляться за людей и вещи. Развить гибкость, доверие к переменам. Прошлые жизни: земледельцы, ремесленники. Урок — духовные ценности выше материальных.',
'Ваша карма — научиться глубине вместо поверхностности. Завершать начатое, не распылять силы. Слушать не только ум, но и сердце. Прошлые жизни: торговцы, посланники. Урок — концентрация и верность одной истине.',
'Ваша карма — научиться отпускать прошлое и эмоциональные привязанности. Выйти из-под опеки близких и обрести самостоятельность. Прошлые жизни: матери, хранители рода. Урок — отпустить, чтобы освободить.',
'Ваша карма — научиться смирению и служению без аплодисментов. Не требовать признания, делать добро тихо. Прошлые жизни: цари, актёры, правители. Урок — истинное величие в скромности.',
'Ваша карма — научиться принимать несовершенство мира и себя. Перестать критиковать, быть мягче. Развить веру в высшее. Прошлые жизни: служители, монахи, лекари. Урок — совершенство через принятие.',
'Ваша карма — научиться принимать решения без постоянного взвешивания. Не бояться быть несправедливой. Быть собой, а не отражением других. Прошлые жизни: дипломаты, судьи. Урок — самостоятельность.',
'Ваша карма — научиться прощать и отпускать обиды. Трансформировать разрушительные страсти. Доверять людям, не манипулировать. Прошлые жизни: маги, целители, разведчики. Урок — сила в мягкости.',
'Ваша карма — научиться ответственности и доводить дела до конца. Не убегать в новые приключения от проблем. Прошлые жизни: путешественники, философы. Урок — углубляться, а не расширяться.',
'Ваша карма — научиться радоваться процессу, а не только результату. Выражать чувства, не скрывать уязвимость. Прошлые жизни: правители, старейшины. Урок — разрешить себе быть живой.',
'Ваша карма — научиться быть с людьми, а не над ними. Включать сердце, а не только ум. Прошлые жизни: учёные, революционеры, отшельники. Урок — близость и эмоциональная вовлечённость.',
'Ваша карма — научиться границам и реальности. Не растворяться в других, не спасать всех подряд. Прошлые жизни: мистики, целители, художники. Урок — воплощение мечты в материю.'
];

const PERSONAL_RECO=[
'Регулярно занимайтесь спортом — это выпустит избыточную энергию. Практикуйте медитацию для усмирения импульсов. Считайте до 10, прежде чем действовать в гневе. Работайте над умением слушать. Ваши цвета: красный, алый, коралловый.',
'Не забывайте о движении — ваша природа склонна к статичности. Питайтесь качественно, но умеренно. Развивайте гибкость мышления через новые занятия. Отпускайте людей и вещи легче. Ваши цвета: зелёный, изумрудный, терракотовый.',
'Практикуйте моно-фокус — заканчивайте одно дело перед началом другого. Записывайте мысли в дневник. Медитируйте, чтобы успокоить поток ума. Не сплетничайте. Ваши цвета: жёлтый, голубой, серебристый.',
'Установите эмоциональные границы с близкими. Ведите дневник чувств. Проводите время у воды. Не зацикливайтесь на прошлом. Практикуйте благодарность. Ваши цвета: серебристый, жемчужный, морской волны.',
'Делегируйте и делитесь светом с другими. Не ищите постоянного одобрения. Занимайтесь творчеством регулярно. Будьте щедры, но не расточительны. Ваши цвета: золотой, оранжевый, солнечный.',
'Отпускайте перфекционизм — готово лучше идеально. Не критикуйте себя. Проводите время на природе. Заботьтесь о пищеварении и нервной системе. Ваши цвета: песочный, оливковый, коричневый.',
'Принимайте решения быстрее — интуиция знает ответ. Не угождайте всем. Найдите свой эстетический стиль. Избегайте токсичных отношений. Ваши цвета: розовый, пастельно-голубой, лавандовый.',
'Прощайте и отпускайте — груз обид отравляет. Практикуйте откровенность. Занимайтесь глубокими практиками: йога, психотерапия. Не контролируйте других. Ваши цвета: бордовый, чёрный, тёмно-красный.',
'Планируйте путешествия — они подпитывают душу. Учитесь дипломатии в общении. Не обещайте больше, чем можете. Изучайте философию. Ваши цвета: фиолетовый, пурпурный, индиго.',
'Разрешите себе отдых и веселье — не всё серьёзно. Выражайте эмоции. Работайте на долгосрочные цели терпеливо. Заботьтесь о коленях и костях. Ваши цвета: графитовый, тёмно-серый, чёрный.',
'Не отстраняйтесь от людей — включайте сердце. Окружите себя единомышленниками. Не убегайте в идеи от чувств. Изучайте новое. Ваши цвета: бирюзовый, электрический синий, сиреневый.',
'Укрепляйте границы с окружением. Занимайтесь творчеством каждый день. Проводите время у воды. Ограничьте алкоголь и фантазии-заменители. Медитируйте. Ваши цвета: морской, серебристый, лиловый.'
];

const BADGE_LABELS={state:'Государственный',orthodox:'Православный',folk:'Народный',other:'Другой'};
const FILTER_LABELS=[['all','Все'],['state','Государств.'],['orthodox','Православные'],['folk','Народные'],['other','Другие']];
const LETTER_NUM={'а':1,'б':2,'в':3,'г':4,'д':5,'е':6,'ё':7,'ж':8,'з':9,'и':1,'й':2,'к':3,'л':4,'м':5,'н':6,'о':7,'п':8,'р':9,'с':1,'т':2,'у':3,'ф':4,'х':5,'ц':6,'ч':7,'ш':8,'щ':9,'ъ':1,'ы':2,'ь':3,'э':4,'ю':5,'я':6};
const NUM_MEANINGS={1:'Лидер. Вы прирождённый первопроходец с сильной волей, независимостью и амбициями. Число 1 даёт энергию начинаний и способность вести за собой.',2:'Дипломат. Вы обладаете даром гармонии, сотрудничества и интуиции. Число 2 наделяет чуткостью, тактом и способностью видеть обе стороны.',3:'Творец. Вы наполнены радостью, творчеством и самовыражением. Число 3 даёт артистизм, оптимизм и умение вдохновлять других.',4:'Строитель. Вы надёжны, практичны и трудолюбивы. Число 4 даёт фундамент стабильности, порядка и методичного подхода к жизни.',5:'Искатель. Вы свободолюбивы, любите приключения и перемены. Число 5 наделяет адаптивностью, любознательностью и жаждой нового опыта.',6:'Хранитель. Вы заботливы, ответственны и преданны семье. Число 6 даёт гармонию, любовь к красоте и стремление помогать другим.',7:'Мыслитель. Вы глубоки, аналитичны и духовны. Число 7 наделяет мудростью, интуицией и стремлением к познанию тайн мира.',8:'Властелин. Вы амбициозны, деловиты и нацелены на успех. Число 8 даёт материальную силу, организаторские способности и авторитет.',9:'Мудрец. Вы сострадательны, великодушны и идеалистичны. Число 9 наделяет широтой взглядов, гуманизмом и способностью завершать циклы.'};
const CHI_ANIMALS=['Крыса','Бык','Тигр','Кролик','Дракон','Змея','Лошадь','Коза','Обезьяна','Петух','Собака','Свинья'];
const CHI_ANIMAL_ICONS=['🐀','🐂','🐅','🐇','🐉','🐍','🐴','🐐','🐒','🐓','🐕','🐷'];
const CHI_ELEMENTS_5=['Дерево','Огонь','Земля','Металл','Вода'];
const CHI_ELEM_ICONS=['🌿','🔥','⛰️','⚔️','💧'];
const AFFIRMATIONS=['Я привлекаю изобилие и процветание в свою жизнь','Каждый день я становлюсь лучшей версией себя','Я заслуживаю любви, счастья и гармонии','Вселенная поддерживает меня на каждом шагу','Я благодарю этот день за новые возможности','Моя интуиция ведёт меня верным путём','Я наполнена энергией и вдохновением','Все трудности делают меня сильнее и мудрее','Я отпускаю страхи и открываюсь новому','Мои мысли создают мою прекрасную реальность','Я в гармонии с ритмами Вселенной','Любовь и свет наполняют каждую клеточку моего тела','Я доверяю процессу жизни','Сегодня я выбираю радость и покой','Моё сердце открыто для чудес','Я ценю каждый момент своей жизни','Вселенная щедра ко мне','Я сильная, мудрая и красивая','Каждый вдох наполняет меня силой','Я создаю жизнь своей мечты','Мир вокруг меня отражает мою внутреннюю красоту','Я притягиваю в свою жизнь только лучшее','Сегодня — идеальный день для новых начинаний','Я с благодарностью принимаю дары Вселенной','Мои возможности безграничны','Я нахожусь в нужном месте в нужное время','Любовь — моя суперсила','Я спокойна и уверена в своих силах','Каждый день приближает меня к мечте','Я выбираю верить в лучшее'];
const RECO_BY_MOON=[
[{icon:'📝',title:'Планирование',text:'Составьте список целей на лунный месяц'},{icon:'🧘',title:'Медитация',text:'Практикуйте визуализацию желаемого'},{icon:'🌱',title:'Новые проекты',text:'Начните то, что давно откладывали'},{icon:'💆',title:'Уход за собой',text:'Маски для лица, увлажнение кожи'}],
[{icon:'💪',title:'Активные действия',text:'Двигайтесь к целям, энергия растёт'},{icon:'📚',title:'Обучение',text:'Начните изучать что-то новое'},{icon:'🤝',title:'Контакты',text:'Заводите новые знакомства'},{icon:'✂️',title:'Стрижка',text:'Хорошее время для стрижки волос'}],
[{icon:'⚡',title:'Решительность',text:'Принимайте важные решения'},{icon:'🏋️',title:'Спорт',text:'Интенсивные тренировки дадут результат'},{icon:'💼',title:'Карьера',text:'Продвигайте проекты и идеи'},{icon:'🏠',title:'Дом',text:'Начните ремонт или перестановку'}],
[{icon:'🎯',title:'Завершение',text:'Доводите начатое до конца'},{icon:'💰',title:'Финансы',text:'Хорошее время для инвестиций'},{icon:'❤️',title:'Отношения',text:'Укрепляйте связи с близкими'},{icon:'🍎',title:'Здоровье',text:'Организм хорошо усваивает витамины'}],
[{icon:'🎉',title:'Празднование',text:'Отмечайте достижения'},{icon:'💡',title:'Творчество',text:'Пик интуиции и вдохновения'},{icon:'🙏',title:'Благодарность',text:'Составьте список благодарностей'},{icon:'⚠️',title:'Осторожность',text:'Избегайте конфликтов, эмоции обострены'}],
[{icon:'📊',title:'Анализ',text:'Подведите промежуточные итоги'},{icon:'🎁',title:'Щедрость',text:'Делитесь знаниями и помогайте'},{icon:'📖',title:'Чтение',text:'Погрузитесь в хорошую книгу'},{icon:'🧹',title:'Уборка',text:'Наведите порядок в доме и делах'}],
[{icon:'🗑️',title:'Отпустите лишнее',text:'Избавьтесь от ненужных вещей'},{icon:'💊',title:'Очищение',text:'Хорошее время для детокса'},{icon:'✍️',title:'Дневник',text:'Запишите мысли и осознания'},{icon:'🌿',title:'Природа',text:'Проведите время на свежем воздухе'}],
[{icon:'😴',title:'Отдых',text:'Позвольте себе замедлиться'},{icon:'🧘',title:'Медитация',text:'Глубокие практики и самопознание'},{icon:'🛁',title:'Релакс',text:'Ванна с солью, ароматерапия'},{icon:'🌙',title:'Сны',text:'Ведите дневник сновидений'}]
];

// I Ching - 64 hexagrams. Lines: 1=yang, 0=yin (bottom to top)
const HEXAGRAMS=[
{n:1,cn:'乾',name:'Цянь',meaning:'Творчество',lines:[1,1,1,1,1,1],judge:'Великий успех. Благоприятна стойкость.',text:'Чистая творческая сила. Время решительных действий, начинаний и проявления воли. Небо благосклонно — ваши усилия принесут плоды. Будьте подобны дракону: мудрым, могучим и принципиальным.'},
{n:2,cn:'坤',name:'Кунь',meaning:'Исполнение',lines:[0,0,0,0,0,0],judge:'Изначальное свершение. Благоприятна стойкость кобылицы.',text:'Воспринимающая, материнская сила земли. Время принимать, поддерживать и взращивать. Не торопите события — позвольте им раскрыться естественно. Следуйте, а не ведите.'},
{n:3,cn:'屯',name:'Чжунь',meaning:'Начальная трудность',lines:[1,0,0,0,1,0],judge:'Изначальное свершение. Не следует никуда выступать. Благоприятно поставить князей.',text:'Новое начинание сталкивается с трудностями, как росток пробивается сквозь землю. Не отступайте — ищите помощи и сохраняйте стойкость. Хаос рождает порядок.'},
{n:4,cn:'蒙',name:'Мэн',meaning:'Юношеская неопытность',lines:[0,1,0,0,0,1],judge:'Свершение. Не я ищу юношу, юноша ищет меня.',text:'Время учиться и принимать наставления. Не стесняйтесь спрашивать — мудрость приходит к открытым. Доверьтесь учителю или внутреннему голосу.'},
{n:5,cn:'需',name:'Сюй',meaning:'Ожидание',lines:[1,1,1,0,1,0],judge:'Обладая правдой, имеешь блестящий успех. Стойкость — к счастью.',text:'Время терпения. Всё придёт в свой срок — не торопите события. Сохраняйте веру и используйте паузу для подготовки. Дождь обязательно прольётся.'},
{n:6,cn:'訟',name:'Сун',meaning:'Тяжба',lines:[0,1,0,1,1,1],judge:'Обладая правдой, будь бдителен. Середина — к счастью, крайность — к несчастью.',text:'Конфликт и спор. Не доводите до крайности — ищите компромисс. Лучше отступить, чем настаивать на своём до победного. Мудрость в уступке.'},
{n:7,cn:'師',name:'Ши',meaning:'Войско',lines:[0,1,0,0,0,0],judge:'Стойкость. Зрелому человеку — счастье. Хулы не будет.',text:'Время дисциплины и организации. Соберите силы, действуйте чётко и под руководством опытного. Победа достигается порядком, а не хаосом.'},
{n:8,cn:'比',name:'Би',meaning:'Единение',lines:[0,0,0,0,1,0],judge:'Счастье. Вникни в гадание. Изначальная вечная стойкость.',text:'Время единения и поддержки. Найдите свой круг, держитесь близких по духу. Вместе вы сильнее. Не оставайтесь в одиночестве.'},
{n:9,cn:'小畜',name:'Сяо Чу',meaning:'Малое накопление',lines:[1,1,1,0,1,1],judge:'Свершение. Плотные тучи — и нет дождя.',text:'Малые силы накапливаются. Время копить ресурсы и терпение. Большие свершения пока невозможны — занимайтесь деталями и подготовкой.'},
{n:10,cn:'履',name:'Ли',meaning:'Поступь',lines:[1,1,0,1,1,1],judge:'Наступишь на хвост тигра — он не укусит. Свершение.',text:'Действуйте осторожно, но уверенно. Опасность рядом, но если соблюдать ритуал и такт, всё пройдёт благополучно. Будьте вежливы со сложными людьми.'},
{n:11,cn:'泰',name:'Тай',meaning:'Расцвет',lines:[1,1,1,0,0,0],judge:'Малое отходит, великое приходит. Счастье. Свершение.',text:'Время гармонии и процветания. Небо и земля соединяются — всё благоприятно. Используйте этот период для роста и больших дел.'},
{n:12,cn:'否',name:'Пи',meaning:'Упадок',lines:[0,0,0,1,1,1],judge:'Великое отходит, малое приходит. Не благоприятна стойкость.',text:'Время застоя и разлада. Не пытайтесь действовать активно — сохраняйте свои принципы и ждите перемен. Уединение лучше суеты.'},
{n:13,cn:'同人',name:'Тун Жэнь',meaning:'Родня',lines:[1,0,1,1,1,1],judge:'Родня в местности. Свершение. Благоприятен брод через великую реку.',text:'Время единства с близкими по духу. Откройтесь людям, действуйте сообща. Большие предприятия удачны, если рядом верные товарищи.'},
{n:14,cn:'大有',name:'Да Ю',meaning:'Великое владение',lines:[1,1,1,1,0,1],judge:'Изначальное свершение.',text:'Великий успех и обладание. Используйте свои ресурсы мудро и щедро. Делитесь с другими — изобилие умножается, когда им делятся.'},
{n:15,cn:'謙',name:'Цянь',meaning:'Смирение',lines:[0,0,1,0,0,0],judge:'Свершение. Благородному человеку обладать концом.',text:'Сила в скромности. Не выпячивайте себя — пусть ваши дела говорят за вас. Смиренный достигает большего, чем гордый.'},
{n:16,cn:'豫',name:'Юй',meaning:'Вольность',lines:[0,0,0,1,0,0],judge:'Благоприятно поставить князей и двинуть войско.',text:'Время воодушевления и радости. Энтузиазм заразителен — используйте его, чтобы воодушевить других и двинуться к цели. Музыка и праздник уместны.'},
{n:17,cn:'隨',name:'Суй',meaning:'Последование',lines:[1,0,0,1,1,0],judge:'Изначальное свершение. Благоприятна стойкость. Хулы не будет.',text:'Время следовать за обстоятельствами и мудрыми наставниками. Не упорствуйте в своём — гибкость принесёт успех. Слушайте больше, чем говорите.'},
{n:18,cn:'蠱',name:'Гу',meaning:'Исправление',lines:[0,1,1,0,0,1],judge:'Изначальное свершение. Благоприятен брод через великую реку.',text:'Время исправлять прошлые ошибки. То, что испортилось, требует внимания и труда. Не откладывайте — займитесь восстановлением.'},
{n:19,cn:'臨',name:'Линь',meaning:'Посещение',lines:[1,1,0,0,0,0],judge:'Изначальное свершение. Благоприятна стойкость.',text:'Время приближения к вершине. Сила растёт, перспективы блестящие. Действуйте, пока благоприятный момент не ушёл.'},
{n:20,cn:'觀',name:'Гуань',meaning:'Созерцание',lines:[0,0,0,0,1,1],judge:'Умыв руки, не приноси жертв. Владея правдой, будь нелицеприятен и важен.',text:'Время наблюдать и осмыслять. Не действуйте — изучайте. Поднимитесь над ситуацией и посмотрите на неё со стороны. Мудрость рождается из созерцания.'},
{n:21,cn:'噬嗑',name:'Ши Хэ',meaning:'Раскусить препятствие',lines:[1,0,0,1,0,1],judge:'Свершение. Благоприятно применить тяжбу.',text:'Перед вами препятствие, которое нужно решительно устранить. Не избегайте конфронтации — действуйте справедливо и твёрдо.'},
{n:22,cn:'賁',name:'Би',meaning:'Убранство',lines:[1,0,1,0,0,1],judge:'Свершение. В малом благоприятно иметь куда выступить.',text:'Время заниматься красотой и формой. Уделите внимание внешнему — оно отражает внутреннее. Но не забывайте, что суть важнее украшения.'},
{n:23,cn:'剝',name:'Бо',meaning:'Разрушение',lines:[0,0,0,0,0,1],judge:'Не благоприятно иметь куда выступить.',text:'Время упадка и разрушения старого. Не сопротивляйтесь — позвольте отжившему уйти. Это освободит место для нового.'},
{n:24,cn:'復',name:'Фу',meaning:'Возврат',lines:[1,0,0,0,0,0],judge:'Свершение. Выходу и входу не будет вреда. Друзья придут — хулы не будет.',text:'Время возвращения и возрождения. Свет возвращается после тьмы. Цикл начинается заново — встречайте его с открытым сердцем.'},
{n:25,cn:'無妄',name:'У Ван',meaning:'Беспорочность',lines:[1,0,0,1,1,1],judge:'Изначальное свершение. Благоприятна стойкость.',text:'Действуйте искренне и без задних мыслей. Чистота намерений принесёт успех. Не пытайтесь хитрить — простота мудрее.'},
{n:26,cn:'大畜',name:'Да Чу',meaning:'Великое накопление',lines:[1,1,1,0,0,1],judge:'Благоприятна стойкость. Кормление не от своего дома — к счастью.',text:'Великое накопление сил. Сейчас время копить знания, опыт и ресурсы для большого свершения. Учитесь у других.'},
{n:27,cn:'頤',name:'И',meaning:'Питание',lines:[1,0,0,0,0,1],judge:'Стойкость — к счастью. Созерцай питание и то, чем сам ты наполняешь рот.',text:'Заботьтесь о том, чем вы питаете тело и дух. Окружение, мысли, слова — всё это пища. Выбирайте качественное.'},
{n:28,cn:'大過',name:'Да Го',meaning:'Великое превосходство',lines:[0,1,1,1,1,0],judge:'Стропила прогибаются. Благоприятно иметь куда выступить. Свершение.',text:'Чрезмерное напряжение. Что-то перевешивает — нужно укрепить основу или изменить подход. Не игнорируйте сигналы.'},
{n:29,cn:'坎',name:'Кань',meaning:'Бездна',lines:[0,1,0,0,1,0],judge:'Обладая правдой, ты в сердце добьёшься свершения, и действия твои будут оценены.',text:'Время трудностей и опасностей. Сохраняйте искренность и плывите по течению, как вода. Опасность учит и закаляет.'},
{n:30,cn:'離',name:'Ли',meaning:'Сияние',lines:[1,0,1,1,0,1],judge:'Благоприятна стойкость. Свершение. Разводить коров — к счастью.',text:'Свет, ясность, осознание. Время видеть вещи такими, какие они есть. Делитесь своим светом с другими, но помните, что огню нужна основа.'},
{n:31,cn:'咸',name:'Сянь',meaning:'Сочетание',lines:[0,0,1,1,1,0],judge:'Свершение. Благоприятна стойкость. Брать жену — к счастью.',text:'Время взаимного притяжения и чувств. Открытость сердца принесёт встречу. Слушайте чувства — они мудрее ума в вопросах любви.'},
{n:32,cn:'恆',name:'Хэн',meaning:'Постоянство',lines:[0,1,1,1,0,0],judge:'Свершение. Хулы не будет. Благоприятна стойкость. Благоприятно иметь куда выступить.',text:'Длительность и постоянство. Держитесь выбранного пути. Регулярность важнее силы. Постоянство приведёт к цели.'},
{n:33,cn:'遯',name:'Дунь',meaning:'Отступление',lines:[0,0,1,1,1,1],judge:'Свершение. В малом благоприятна стойкость.',text:'Время мудрого отступления. Не борьба, а отход. Сохраните силы для лучших времён. Это не поражение, а стратегия.'},
{n:34,cn:'大壯',name:'Да Чжуан',meaning:'Великая мощь',lines:[1,1,1,1,0,0],judge:'Благоприятна стойкость.',text:'Сила достигла полноты. Используйте её мудро и справедливо. Не злоупотребляйте могуществом — иначе оно обернётся против вас.'},
{n:35,cn:'晉',name:'Цзинь',meaning:'Восход',lines:[0,0,0,1,0,1],judge:'Сильному князю надлежит употребить жалованных коней.',text:'Время восхождения и признания. Ваши заслуги будут оценены. Двигайтесь вперёд с достоинством — солнце поднимается.'},
{n:36,cn:'明夷',name:'Мин И',meaning:'Поражение света',lines:[1,0,1,0,0,0],judge:'В трудности благоприятна стойкость.',text:'Тёмные времена. Спрячьте свой свет внутрь, не выставляйте его. Внешне будьте незаметны, внутренне — сильны. Это пройдёт.'},
{n:37,cn:'家人',name:'Цзя Жэнь',meaning:'Домашние',lines:[1,0,1,0,1,1],judge:'Благоприятна стойкость женщины.',text:'Семья и дом в центре. Уделите внимание близким, наведите порядок дома. Гармония начинается с семейного очага.'},
{n:38,cn:'睽',name:'Куй',meaning:'Разлад',lines:[1,1,0,1,0,1],judge:'В малых делах — счастье.',text:'Разногласия и непонимание. Не пытайтесь решить большие вопросы — занимайтесь мелочами. Со временем противоречия сгладятся.'},
{n:39,cn:'蹇',name:'Цзянь',meaning:'Препятствие',lines:[0,0,1,0,1,0],judge:'Благоприятен юго-запад, не благоприятен северо-восток. Благоприятно свидание с великим человеком. Стойкость — к счастью.',text:'На пути преграда. Не идите напролом — обойдите. Ищите помощи у мудрых и сильных. Иногда нужно изменить маршрут.'},
{n:40,cn:'解',name:'Цзе',meaning:'Разрешение',lines:[0,1,0,1,0,0],judge:'Благоприятен юго-запад. Если некуда выступить, то когда оно само придёт — счастье.',text:'Освобождение от трудностей. Узлы развязываются, проблемы решаются. Действуйте быстро, пока благоприятный момент не ушёл.'},
{n:41,cn:'損',name:'Сунь',meaning:'Убыль',lines:[1,1,0,0,0,1],judge:'Обладая правдой, изначальное счастье. Хулы не будет. Возможна стойкость.',text:'Что-то убывает, чтобы что-то прибыло. Жертва ради высшей цели оправданна. Отдавайте искренне — вернётся сторицей.'},
{n:42,cn:'益',name:'И',meaning:'Приумножение',lines:[1,0,0,0,1,1],judge:'Благоприятно иметь куда выступить. Благоприятен брод через великую реку.',text:'Время роста и приумножения. Используйте благоприятные ветры. Великие предприятия удачны. Помогая другим, вы умножаете и своё.'},
{n:43,cn:'夬',name:'Гуай',meaning:'Прорыв',lines:[1,1,1,1,1,0],judge:'Объявлено в царском дворце. Правдиво воззови.',text:'Решительный прорыв. Время сказать правду и устранить лживое. Действуйте открыто, без страха, но и без агрессии.'},
{n:44,cn:'姤',name:'Гоу',meaning:'Перечение',lines:[0,1,1,1,1,1],judge:'У женщины — мощь. Не бери эту жену.',text:'Неожиданная встреча или искушение. Будьте осторожны — не всё, что кажется привлекательным, полезно. Сохраняйте бдительность.'},
{n:45,cn:'萃',name:'Цуй',meaning:'Воссоединение',lines:[0,0,0,1,1,0],judge:'Свершение. Царю надлежит приближаться к обладателям храма.',text:'Время собирать силы и людей вместе. Объединение принесёт результат. Создавайте сообщества, празднуйте единство.'},
{n:46,cn:'升',name:'Шэн',meaning:'Подъём',lines:[0,1,1,0,0,0],judge:'Изначальное свершение. Используй свидание с великим человеком.',text:'Постепенный подъём, как растущее дерево. Не торопитесь — растите естественно и упорно. Каждый день — шаг вверх.'},
{n:47,cn:'困',name:'Кунь',meaning:'Истощение',lines:[0,1,0,1,1,0],judge:'Свершение. Стойкость великого человека — к счастью. Хулы не будет.',text:'Время истощения и трудностей. Не теряйте веру — даже сильные иногда устают. Сохраняйте достоинство в испытаниях.'},
{n:48,cn:'井',name:'Цзин',meaning:'Колодец',lines:[0,1,1,0,1,0],judge:'Меняют города, но не меняют колодец. Без потерь, но и без приобретений.',text:'Колодец — символ источника, к которому всегда можно вернуться. Помните о своих корнях и источниках силы. Делитесь с другими.'},
{n:49,cn:'革',name:'Гэ',meaning:'Смена',lines:[1,0,1,1,1,0],judge:'В свой собственный день будешь правдив. Изначальное свершение. Благоприятна стойкость.',text:'Время больших перемен. Старое уходит, новое приходит. Не цепляйтесь за прошлое — революция в жизни назрела.'},
{n:50,cn:'鼎',name:'Дин',meaning:'Жертвенник',lines:[0,1,1,1,0,1],judge:'Изначальное счастье. Свершение.',text:'Священный сосуд — символ преображения. Время создавать что-то новое из сырого материала. Творите с уважением к процессу.'},
{n:51,cn:'震',name:'Чжэнь',meaning:'Возбуждение',lines:[1,0,0,1,0,0],judge:'Свершение. Молния пришла — трепет, трепет!',text:'Гром и потрясение. Неожиданное событие встряхнёт вас. Не пугайтесь — это пробуждение. После шока придёт ясность.'},
{n:52,cn:'艮',name:'Гэнь',meaning:'Сосредоточение',lines:[0,0,1,0,0,1],judge:'Сосредоточенность на спине. Не воспримешь своего тела. Пройдёшь по своему двору и не увидишь своих людей.',text:'Время покоя и медитации. Остановитесь полностью — внутри и снаружи. Ничего не делайте. В тишине придут ответы.'},
{n:53,cn:'漸',name:'Цзянь',meaning:'Течение',lines:[0,0,1,0,1,1],judge:'Женщина уходит к мужу. Счастье. Благоприятна стойкость.',text:'Постепенное развитие, как полёт лебедя. Не торопите события. Соблюдайте последовательность шагов. Естественный ход — самый верный.'},
{n:54,cn:'歸妹',name:'Гуй Мэй',meaning:'Невеста',lines:[1,1,0,1,0,0],judge:'В походе — несчастье. Ничего благоприятного.',text:'Сложная ситуация, где вы не главный. Примите свою роль смиренно — попытки доминировать обернутся против вас. Терпение.'},
{n:55,cn:'豐',name:'Фэн',meaning:'Изобилие',lines:[1,0,1,1,0,0],judge:'Свершение. Царь приближается к ней. Не печалься, надо быть как солнце в полдень.',text:'Время изобилия и пика. Наслаждайтесь моментом, но помните: после полудня солнце клонится к закату. Используйте этот час.'},
{n:56,cn:'旅',name:'Люй',meaning:'Странствие',lines:[0,0,1,1,0,1],judge:'В малом — свершение. В странствии стойкость — к счастью.',text:'Время странствий, физических или духовных. Будьте гибкими, скромными и наблюдательными. Чужбина учит больше, чем дом.'},
{n:57,cn:'巽',name:'Сюнь',meaning:'Проникновение',lines:[0,1,1,0,1,1],judge:'Свершение в малом. Благоприятно иметь куда выступить. Благоприятно свидание с великим человеком.',text:'Мягкое проникновение, как ветер. Действуйте тонко и постепенно. Прямая сила здесь не сработает — нужна гибкость.'},
{n:58,cn:'兌',name:'Дуй',meaning:'Радость',lines:[1,1,0,1,1,0],judge:'Свершение. Благоприятна стойкость.',text:'Радость и общение. Открывайте сердце людям — радость множится, когда ею делишься. Но избегайте поверхностности.'},
{n:59,cn:'渙',name:'Хуань',meaning:'Раздробление',lines:[0,1,0,0,1,1],judge:'Свершение. Царь приближается к обладателям храма.',text:'Время растворения границ. Эго и страхи рассеиваются. Открытость и духовные практики особенно благотворны сейчас.'},
{n:60,cn:'節',name:'Цзе',meaning:'Ограничение',lines:[1,1,0,0,1,0],judge:'Свершение. Горьким ограничением нельзя быть стойким.',text:'Время дисциплины и меры. Установите границы — но не слишком строгие. Умеренность во всём, включая саму умеренность.'},
{n:61,cn:'中孚',name:'Чжун Фу',meaning:'Внутренняя правда',lines:[1,1,0,0,1,1],judge:'Вепрям и рыбам — счастье. Благоприятен брод через великую реку. Благоприятна стойкость.',text:'Искренность и внутренняя правда. Будьте честны с собой и другими. Подлинность откроет любые двери. Доверьтесь сердцу.'},
{n:62,cn:'小過',name:'Сяо Го',meaning:'Малое превосходство',lines:[0,0,1,1,0,0],judge:'Свершение. Благоприятна стойкость. Можно действовать в малом — нельзя в большом.',text:'Время малых дел и скромности. Не замахивайтесь на великое — займитесь деталями. Маленькие шаги принесут большие результаты.'},
{n:63,cn:'既濟',name:'Цзи Цзи',meaning:'Уже конец',lines:[1,0,1,0,1,0],judge:'Свершение в малом. Благоприятна стойкость. В начале — счастье, в конце — беспорядок.',text:'Цель достигнута. Но это не конец — будьте бдительны. Успех расслабляет, а беспечность ведёт к падению. Не теряйте формы.'},
{n:64,cn:'未濟',name:'Вэй Цзи',meaning:'Ещё не конец',lines:[0,1,0,1,0,1],judge:'Свершение. Молодой лис почти переправился, но вымочил свой хвост. Ничего благоприятного.',text:'Путь почти завершён, но финал ещё впереди. Не расслабляйтесь у самой цели. Последний шаг — самый важный. Соберитесь.'}
];

function moonPhase(d){let y=d.getFullYear(),m=d.getMonth()+1,day=d.getDate(),c,e;if(m<3){c=365.25*(y-1);e=30.6001*(m+13)}else{c=365.25*y;e=30.6001*(m+1)}let jd=c+e+day-694039.09;jd/=29.5305882;jd-=parseInt(jd);return Math.round(jd*29.5305882)%30;}
function phaseName(age){if(age===0||age===30)return{name:'Новолуние',icon:'🌑'};if(age<7)return{name:'Растущий серп',icon:'🌒'};if(age===7)return{name:'Первая четверть',icon:'🌓'};if(age<15)return{name:'Растущая луна',icon:'🌔'};if(age===15)return{name:'Полнолуние',icon:'🌕'};if(age<22)return{name:'Убывающая луна',icon:'🌖'};if(age===22)return{name:'Последняя четверть',icon:'🌗'};return{name:'Убывающий серп',icon:'🌘'};}
function moonIllum(age){return Math.round((1-Math.cos(age/29.5305882*2*Math.PI))/2*100)}
function moonRecoIdx(age){if(age<=2)return 0;if(age<=6)return 1;if(age<=10)return 2;if(age<=14)return 3;if(age<=17)return 4;if(age<=21)return 5;if(age<=25)return 6;return 7;}
function drawMoonSVG(age,size){size=size||160;const r=size/2-4,cx=size/2,cy=size/2,phase=(age%30)/29.5305882;const termX=Math.cos(phase*2*Math.PI)*r;let d;if(phase<0.25)d='M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 0 0 '+cx+' '+(cy+r)+' A '+Math.abs(termX)+' '+r+' 0 0 1 '+cx+' '+(cy-r);else if(phase<0.5)d='M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 0 0 '+cx+' '+(cy+r)+' A '+Math.abs(termX)+' '+r+' 0 0 0 '+cx+' '+(cy-r);else if(phase<0.75)d='M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 0 1 '+cx+' '+(cy+r)+' A '+Math.abs(termX)+' '+r+' 0 0 1 '+cx+' '+(cy-r);else d='M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 0 1 '+cx+' '+(cy+r)+' A '+Math.abs(termX)+' '+r+' 0 0 0 '+cx+' '+(cy-r);return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'"><defs><radialGradient id="mg" cx="40%" cy="35%"><stop offset="0%" stop-color="#fffde7"/><stop offset="60%" stop-color="#e8d89a"/><stop offset="100%" stop-color="#c9b458"/></radialGradient><filter id="gl"><feGaussianBlur stdDeviation="3" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="'+cx+'" cy="'+cy+'" r="'+(r+8)+'" fill="none" stroke="rgba(255,223,100,.08)" stroke-width="6"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#1a1a2e"/><path d="'+d+'" fill="url(#mg)" filter="url(#gl)"/><circle cx="'+(cx-r*.2)+'" cy="'+(cy-r*.15)+'" r="'+(r*.08)+'" fill="rgba(0,0,0,.08)"/><circle cx="'+(cx+r*.25)+'" cy="'+(cy+r*.3)+'" r="'+(r*.12)+'" fill="rgba(0,0,0,.06)"/><circle cx="'+(cx-r*.1)+'" cy="'+(cy+r*.45)+'" r="'+(r*.06)+'" fill="rgba(0,0,0,.07)"/></svg>';}
function chiAnimal(y){return(y-4)%12;}
function chiElement(y){return Math.floor(((y-4)%10)/2);}
function chiDayQuality(d){const base=new Date(2000,0,1);const diff=Math.floor((d-base)/(864e5));const stem=(diff%10+10)%10;const branch=(diff%12+12)%12;const combo=(stem+branch)%6;if(combo===0||combo===3)return'good';if(combo===2||combo===5)return'bad';return'neutral';}
function chiDayDesc(q){if(q==='good')return{label:'Благоприятный день',icon:'✅'};if(q==='bad')return{label:'Неблагоприятный день',icon:'⚠️'};return{label:'Нейтральный день',icon:'➖'};}
function easterDate(y){const a=y%4,b=y%7,c=y%19,d=(19*c+15)%30,e=(2*a+4*b-d+34)%7;const mo=Math.floor((d+e+114)/31),da=((d+e+114)%31)+1;const j=new Date(y,mo-1,da);j.setDate(j.getDate()+13);return j;}
function getHolidays(y){const e=easterDate(y),ps=new Date(e);ps.setDate(e.getDate()-7);const asc=new Date(e);asc.setDate(e.getDate()+39);const tri=new Date(e);tri.setDate(e.getDate()+49);return[{d:new Date(y,0,1),name:'Новый год',icon:'🎄',type:'state'},{d:new Date(y,0,7),name:'Рождество Христово',icon:'⭐',type:'orthodox'},{d:new Date(y,0,19),name:'Крещение Господне',icon:'💧',type:'orthodox'},{d:new Date(y,1,14),name:'День Святого Валентина',icon:'❤️',type:'other'},{d:new Date(y,1,23),name:'День защитника Отечества',icon:'🎖️',type:'state'},{d:new Date(y,2,8),name:'Международный женский день',icon:'💐',type:'state'},{d:ps,name:'Вербное воскресенье',icon:'🌿',type:'orthodox'},{d:e,name:'Пасха',icon:'🥚',type:'orthodox'},{d:new Date(y,3,12),name:'День космонавтики',icon:'🚀',type:'state'},{d:new Date(y,4,1),name:'Праздник Весны и Труда',icon:'🌷',type:'state'},{d:new Date(y,4,9),name:'День Победы',icon:'🎗️',type:'state'},{d:asc,name:'Вознесение Господне',icon:'✝️',type:'orthodox'},{d:tri,name:'Троица',icon:'🌳',type:'orthodox'},{d:new Date(y,5,1),name:'День защиты детей',icon:'👶',type:'other'},{d:new Date(y,5,12),name:'День России',icon:'🇷🇺',type:'state'},{d:new Date(y,6,8),name:'День семьи, любви и верности',icon:'🌼',type:'other'},{d:new Date(y,7,19),name:'Преображение Господне',icon:'🍎',type:'orthodox'},{d:new Date(y,7,28),name:'Успение Пресвятой Богородицы',icon:'🕊️',type:'orthodox'},{d:new Date(y,8,1),name:'День знаний',icon:'📚',type:'state'},{d:new Date(y,8,21),name:'Рождество Пресвятой Богородицы',icon:'🌹',type:'orthodox'},{d:new Date(y,9,14),name:'Покров Пресвятой Богородицы',icon:'🛡️',type:'orthodox'},{d:new Date(y,10,4),name:'День народного единства',icon:'🤝',type:'state'},{d:new Date(y,11,31),name:'Новогодняя ночь',icon:'🎆',type:'state'}].sort((a,b)=>a.d-b.d);}
function getZodiac(m,d){for(let i=0;i<ZODIAC.length;i++){const z=ZODIAC[i];if(z.s[0]===z.e[0]){if(m===z.s[0]&&d>=z.s[1]&&d<=z.e[1])return i;}else if((m===z.s[0]&&d>=z.s[1])||(m===z.e[0]&&d<=z.e[1]))return i;}return 9;}
function planetPositions(bd,ts){const seed=bd.getTime();const h=ts?parseInt(ts.split(':')[0]):12;const rng=n=>((seed*(n+1)*9301+49297+h*7919)%233280)/233280;return PLANETS.map((p,i)=>({planet:p,signIdx:Math.floor(rng(i)*12),degree:Math.floor(rng(i+100)*30)}));}
function drawWheel(pos,si){const s=300,cx=150,cy=150,oR=130,iR=94,pR=70;let v='<svg width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'" style="display:block;margin:0 auto;">';v+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(oR+6)+'" fill="none" stroke="rgba(200,180,100,.12)" stroke-width="1"/>';v+='<circle cx="'+cx+'" cy="'+cy+'" r="'+oR+'" fill="none" stroke="rgba(200,180,100,.3)" stroke-width="1.5"/>';v+='<circle cx="'+cx+'" cy="'+cy+'" r="'+iR+'" fill="none" stroke="rgba(200,180,100,.2)" stroke-width="1"/>';v+='<circle cx="'+cx+'" cy="'+cy+'" r="'+pR+'" fill="none" stroke="rgba(200,180,100,.1)" stroke-width=".5" stroke-dasharray="3 3"/>';ZODIAC.forEach((z,i)=>{const a=(i*30-90)*Math.PI/180,ma=((i*30+15)-90)*Math.PI/180;v+='<line x1="'+(cx+Math.cos(a)*iR)+'" y1="'+(cy+Math.sin(a)*iR)+'" x2="'+(cx+Math.cos(a)*oR)+'" y2="'+(cy+Math.sin(a)*oR)+'" stroke="rgba(200,180,100,.25)" stroke-width=".5"/>';if(i===si){const a2=((i+1)*30-90)*Math.PI/180;v+='<path d="M '+(cx+Math.cos(a)*iR)+' '+(cy+Math.sin(a)*iR)+' A '+iR+' '+iR+' 0 0 1 '+(cx+Math.cos(a2)*iR)+' '+(cy+Math.sin(a2)*iR)+' L '+(cx+Math.cos(a2)*oR)+' '+(cy+Math.sin(a2)*oR)+' A '+oR+' '+oR+' 0 0 0 '+(cx+Math.cos(a)*oR)+' '+(cy+Math.sin(a)*oR)+' Z" fill="rgba(200,180,100,.12)"/>';}const col=i===si?'#ffd700':ELEM_COLORS[z.element];v+='<text x="'+(cx+Math.cos(ma)*((oR+iR)/2))+'" y="'+(cy+Math.sin(ma)*((oR+iR)/2))+'" text-anchor="middle" dominant-baseline="central" font-size="13" fill="'+col+'" opacity="'+(i===si?1:.7)+'" font-family="serif">'+z.symbol+'</text>';});pos.forEach(p=>{const td=p.signIdx*30+p.degree,a=(td-90)*Math.PI/180;v+='<circle cx="'+(cx+Math.cos(a)*pR)+'" cy="'+(cy+Math.sin(a)*pR)+'" r="7" fill="rgba(200,180,100,.15)"/>';v+='<text x="'+(cx+Math.cos(a)*pR)+'" y="'+(cy+Math.sin(a)*pR)+'" text-anchor="middle" dominant-baseline="central" font-size="8" fill="#e8d89a" font-family="serif">'+p.planet.split(' ')[0]+'</text>';});v+='<circle cx="'+cx+'" cy="'+cy+'" r="18" fill="rgba(200,180,100,.05)" stroke="rgba(200,180,100,.2)" stroke-width=".5"/>';v+='<text x="'+cx+'" y="'+cy+'" text-anchor="middle" dominant-baseline="central" font-size="15" fill="#ffd700" font-family="serif">'+ZODIAC[si].symbol+'</text>';v+='</svg>';return v;}
function calcNameNumber(fn){const ch=fn.toLowerCase().replace(/\s+/g,'');let sum=0;for(const c of ch){if(LETTER_NUM[c])sum+=LETTER_NUM[c];}while(sum>9&&sum!==11&&sum!==22&&sum!==33){let s=0;String(sum).split('').forEach(d=>{s+=parseInt(d)});sum=s;}return sum;}
function loadProfile(){try{return JSON.parse(localStorage.getItem('lunaris_profile'))||null;}catch(e){return null;}}
function saveProfileData(d){localStorage.setItem('lunaris_profile',JSON.stringify(d));}
function todayAffirmation(){const d=new Date();const idx=(d.getFullYear()*366+d.getMonth()*31+d.getDate())%AFFIRMATIONS.length;return AFFIRMATIONS[idx];}

// I Ching - throw 3 coins 6 times
function castHexagram(){const lines=[];for(let i=0;i<6;i++){let sum=0;for(let j=0;j<3;j++){sum+=Math.random()<0.5?2:3;}lines.push(sum%2);}return lines;}
// Personal daily hexagram based on birth date + current date (deterministic)
function dailyHexagram(birthDate,currentDate){
  const bd=birthDate.getTime();
  const cd=new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()).getTime();
  const seed=Math.abs(bd+cd*31+currentDate.getDate()*7919);
  const lines=[];
  let s=seed;
  for(let i=0;i<6;i++){s=(s*9301+49297)%233280;lines.push(s%2);}
  return lines;
}
function findHexagram(lines){return HEXAGRAMS.find(h=>h.lines.every((v,i)=>v===lines[i]))||HEXAGRAMS[0];}
function drawHexagram(lines){let html='<div class="hexagram">';for(let i=5;i>=0;i--){if(lines[i]===1){html+='<div class="hex-line"><div class="hex-yang"></div></div>';}else{html+='<div class="hex-line"><div class="hex-yin"><span></span><span></span></div></div>';}}html+='</div>';return html;}

const today=new Date();let currentDate=new Date();let viewMonth=new Date();let holYear=today.getFullYear();let holFilter='all';

function renderStars(){const el=document.getElementById('stars');let h='';for(let i=0;i<80;i++){const x=Math.random()*100,y=Math.random()*100,s=Math.random()*1.5+.3,o=Math.random()*.5+.1,dl=Math.random()*5;h+='<div class="star" style="left:'+x+'%;top:'+y+'%;width:'+s+'px;height:'+s+'px;opacity:'+o+';animation-duration:'+(2+dl)+'s;animation-delay:'+dl+'s;"></div>';}el.innerHTML=h;}

function renderAccountBar(){const p=loadProfile();const el=document.getElementById('account-bar');if(p&&p.first){el.innerHTML='<span class="name">👤 '+p.first+' '+(p.last||'')+'</span>';}else{el.innerHTML='<span>Нажмите, чтобы создать профиль →</span>';}}

function renderToday(){const el=document.getElementById('page-today');const age=moonPhase(today);const phase=phaseName(age);const illum=moonIllum(age);const chiQ=chiDayQuality(today);const chiD=chiDayDesc(chiQ);const recoIdx=moonRecoIdx(age);const recos=RECO_BY_MOON[recoIdx];const aff=todayAffirmation();const prof=loadProfile();const aIdx=chiAnimal(today.getFullYear());const eIdx=chiElement(today.getFullYear());const hols=getHolidays(today.getFullYear());let nextHol=hols.find(h=>h.d>=today);if(!nextHol)nextHol=getHolidays(today.getFullYear()+1)[0];const daysTo=nextHol?Math.ceil((nextHol.d-today)/864e5):0;
let html='<div class="affirmation-box"><div class="affirmation-label">Аффирмация дня</div><div class="affirmation-text">«'+aff+'»</div></div>';
html+='<div class="card" style="text-align:center;"><div style="font-size:11px;color:rgba(200,180,100,.4);letter-spacing:2px;text-transform:uppercase;">'+today.getDate()+' '+MONTHS[today.getMonth()]+' '+today.getFullYear()+'</div><div style="display:flex;justify-content:center;align-items:center;gap:16px;margin:12px 0;"><div>'+drawMoonSVG(age,80)+'</div><div style="text-align:left;"><div style="font-size:18px;color:#e8d89a;">'+phase.name+'</div><div style="font-size:13px;color:rgba(200,180,100,.5);">Лунный день: '+age+' · '+illum+'%</div><div style="margin-top:6px;"><span class="chi-badge chi-'+chiQ+'">'+chiD.icon+' '+chiD.label+'</span></div></div></div><div style="font-size:12px;color:rgba(200,180,100,.4);margin-top:4px;">'+CHI_ANIMAL_ICONS[aIdx]+' Год '+CHI_ANIMALS[aIdx]+' · '+CHI_ELEM_ICONS[eIdx]+' '+CHI_ELEMENTS_5[eIdx]+'</div></div>';
if(prof&&prof.birth){const bd=new Date(prof.birth);const si=getZodiac(bd.getMonth()+1,bd.getDate());const nn=calcNameNumber((prof.last||'')+' '+(prof.first||'')+' '+(prof.middle||''));html+='<div class="card" style="text-align:center;"><div style="font-size:11px;color:rgba(200,180,100,.4);letter-spacing:2px;margin-bottom:6px;">ВАШ ЗНАК</div><div style="font-size:28px;">'+ZODIAC[si].symbol+'</div><div style="font-size:16px;color:#e8d89a;">'+ZODIAC[si].name+'</div><div style="font-size:12px;color:rgba(200,180,100,.4);margin-top:4px;">Число имени: <span style="color:#ffd700;font-size:16px;">'+nn+'</span></div></div>';}
html+='<div class="card"><div class="section-title">Рекомендации на сегодня</div>';recos.forEach(r=>{html+='<div class="reco-item"><div class="reco-icon">'+r.icon+'</div><div><div class="reco-title">'+r.title+'</div><div class="reco-text">'+r.text+'</div></div></div>';});html+='</div>';
if(nextHol){html+='<div class="card" style="text-align:center;"><div style="font-size:11px;color:rgba(200,180,100,.4);letter-spacing:2px;margin-bottom:8px;">БЛИЖАЙШИЙ ПРАЗДНИК</div><div style="font-size:32px;">'+nextHol.icon+'</div><div style="font-size:16px;color:#e8d89a;margin-top:4px;">'+nextHol.name+'</div><div style="font-size:13px;color:rgba(200,180,100,.4);margin-top:2px;">'+(daysTo===0?'Сегодня!':'через '+daysTo+' дн.')+'</div></div>';}
el.innerHTML=html;}

function renderMoon(){const age=moonPhase(currentDate),phase=phaseName(age),illum=moonIllum(age);document.getElementById('moon-svg').innerHTML=drawMoonSVG(age);document.getElementById('moon-age-text').textContent='Лунный день: '+age;document.getElementById('moon-name-text').textContent=phase.name;document.getElementById('moon-illum').textContent=illum+'%';const ri=moonRecoIdx(age);document.getElementById('moon-advice').textContent='✦ '+RECO_BY_MOON[ri][0].text+' ✦';document.getElementById('moon-month-label').textContent=MONTHS[viewMonth.getMonth()]+' '+viewMonth.getFullYear();let hdr='';DAYS_W.forEach(d=>{hdr+='<div class="cal-header">'+d+'</div>';});document.getElementById('cal-headers').innerHTML=hdr;const y=viewMonth.getFullYear(),m=viewMonth.getMonth();const fd=new Date(y,m,1);let sd=fd.getDay()-1;if(sd<0)sd=6;const dim=new Date(y,m+1,0).getDate();let days='';for(let i=0;i<sd;i++)days+='<div></div>';for(let d=1;d<=dim;d++){const dt=new Date(y,m,d),ag=moonPhase(dt),ph=phaseName(ag);const isT=dt.toDateString()===today.toDateString();const isSel=dt.toDateString()===currentDate.toDateString()&&!isT;const chiQ=chiDayQuality(dt);const cls='cal-day'+(isT?' today':'')+(isSel?' selected':'')+(chiQ==='good'?' good':chiQ==='bad'?' bad':'');days+='<div class="'+cls+'" onclick="selectDay('+y+','+m+','+d+')"><div class="num">'+d+'</div><div class="moon">'+ph.icon+'</div></div>';}document.getElementById('cal-days').innerHTML=days;}

function renderHolidays(){document.getElementById('hol-year-label').textContent=holYear;let fb='';FILTER_LABELS.forEach(function(f){fb+='<button class="filter-btn'+(holFilter===f[0]?' active':'')+'" onclick="setFilter(\''+f[0]+'\')">'+f[1]+'</button>';});document.getElementById('filter-bar').innerHTML=fb;const hols=getHolidays(holYear).filter(h=>holFilter==='all'||h.type===holFilter);let html='';hols.forEach(h=>{const dd=h.d.getDate()+' '+MONTHS[h.d.getMonth()].toLowerCase();const diff=Math.ceil((h.d-today)/864e5);const cd=diff===0?'сегодня':diff===1?'завтра':diff<0?'прошёл':'через '+diff+' дн.';html+='<div class="holiday-item"><div class="holiday-icon">'+h.icon+'</div><div style="flex:1"><div class="holiday-name">'+h.name+'</div><div style="display:flex;align-items:center"><span class="holiday-date">'+dd+'</span><span class="badge badge-'+h.type+'">'+BADGE_LABELS[h.type]+'</span></div></div><div style="font-size:11px;color:rgba(200,180,100,.3);white-space:nowrap;">'+cd+'</div></div>';});document.getElementById('holiday-list').innerHTML=html;}

function renderNatal(bd,ts){const m=bd.getMonth()+1,d=bd.getDate();const si=getZodiac(m,d),z=ZODIAC[si];const pos=planetPositions(bd,ts);const aIdx=chiAnimal(bd.getFullYear()),eIdx=chiElement(bd.getFullYear());
let html='<div class="card" style="text-align:center;"><div style="font-size:48px;">'+z.symbol+'</div><div style="font-size:22px;color:#e8d89a;margin-top:4px;">'+z.name+'</div><div><span class="element-badge" style="background:'+ELEM_COLORS[z.element]+'22;color:'+ELEM_COLORS[z.element]+'">'+ELEM_NAMES[z.element]+'</span></div><div style="margin-top:10px;font-size:13px;color:rgba(200,180,100,.5);">'+CHI_ANIMAL_ICONS[aIdx]+' '+CHI_ANIMALS[aIdx]+' · '+CHI_ELEM_ICONS[eIdx]+' '+CHI_ELEMENTS_5[eIdx]+'</div></div>';
html+='<div style="padding:0 16px">'+drawWheel(pos,si)+'</div>';

// Detailed interpretation
html+='<div class="card"><div class="section-title">Солнечный знак</div>';
html+='<div class="interp-section"><div class="interp-title">★ '+z.name+'</div><div class="interp-text">'+ZODIAC_INTERP[si]+'</div></div>';
html+='<div class="interp-section"><div class="interp-title">'+ELEM_NAMES[z.element]+'</div><div class="interp-text">'+ELEM_INTERP[z.element]+'</div></div>';
html+='</div>';

html+='<div class="card"><div class="section-title">🎭 Характер</div><div class="interp-text">'+CHARACTER[si]+'</div></div>';
html+='<div class="card"><div class="section-title">🎨 Таланты и призвание</div><div class="interp-text">'+TALENTS[si]+'</div></div>';
html+='<div class="card"><div class="section-title">☯ Карма и жизненные уроки</div><div class="interp-text">'+KARMA[si]+'</div></div>';
html+='<div class="card"><div class="section-title">✨ Рекомендации для вас</div><div class="interp-text">'+PERSONAL_RECO[si]+'</div></div>';

const moonPos=pos[1],venusPos=pos[3],marsPos=pos[4];
html+='<div class="card"><div class="section-title">Ключевые планеты</div>';
html+='<div class="interp-section"><div class="interp-title">☽ Луна в '+ZODIAC[moonPos.signIdx].name+'е</div><div class="interp-text">'+PLANET_MEANINGS[1]+' Расположение в знаке '+ZODIAC[moonPos.signIdx].name+' окрашивает ваши эмоции качествами этой стихии — '+ELEM_INTERP[ZODIAC[moonPos.signIdx].element].toLowerCase()+'</div></div>';
html+='<div class="interp-section"><div class="interp-title">♀ Венера в '+ZODIAC[venusPos.signIdx].name+'е</div><div class="interp-text">'+PLANET_MEANINGS[3]+' В знаке '+ZODIAC[venusPos.signIdx].name+' ваша любовь и эстетика проявляются ярко и характерно.</div></div>';
html+='<div class="interp-section"><div class="interp-title">♂ Марс в '+ZODIAC[marsPos.signIdx].name+'е</div><div class="interp-text">'+PLANET_MEANINGS[4]+' В знаке '+ZODIAC[marsPos.signIdx].name+' ваша воля и страсть имеют свой особый стиль действия.</div></div>';
html+='</div>';

html+='<div class="card"><div class="section-title">Позиции планет</div>';pos.forEach(p=>{const s=ZODIAC[p.signIdx];html+='<div class="planet-row"><span class="planet-name">'+p.planet+'</span><span style="color:'+ELEM_COLORS[s.element]+'">'+s.symbol+' '+s.name+' '+p.degree+'°</span></div>';});html+='</div>';

html+='<div class="card"><div class="section-title">Стихии в карте</div><div class="element-grid">';['fire','earth','air','water'].forEach(el=>{const cnt=pos.filter(p=>ZODIAC[p.signIdx].element===el).length;const names={fire:'Огонь',earth:'Земля',air:'Воздух',water:'Вода'};html+='<div class="element-card" style="background:'+ELEM_COLORS[el]+'11;border:1px solid '+ELEM_COLORS[el]+'33"><div class="count" style="color:'+ELEM_COLORS[el]+'">'+cnt+'</div><div class="label">'+names[el]+'</div></div>';});html+='</div>';
// Find dominant element
const elemCounts={fire:0,earth:0,air:0,water:0};
pos.forEach(p=>{elemCounts[ZODIAC[p.signIdx].element]++});
let dominant='fire';let maxC=0;
Object.keys(elemCounts).forEach(k=>{if(elemCounts[k]>maxC){maxC=elemCounts[k];dominant=k;}});
html+='<div class="interp-text" style="margin-top:14px;">Доминирующая стихия в вашей карте — <strong style="color:'+ELEM_COLORS[dominant]+'">'+ELEM_NAMES[dominant]+'</strong>. '+ELEM_INTERP[dominant]+'</div>';
html+='</div>';
document.getElementById('natal-result').innerHTML=html;}

function renderIChingDaily(){const p=loadProfile();const el=document.getElementById('iching-daily');if(!p||!p.birth){el.innerHTML='<div class="card" style="text-align:center;"><div class="section-title">Книга Перемен · 易經</div><div style="font-size:14px;color:rgba(200,180,100,.6);line-height:1.7;">Чтобы получить персональный совет на сегодня, заполните дату рождения в <span style="color:#ffd700;cursor:pointer;" onclick="showTab(\'profile\')">профиле</span>.</div></div>';return;}const bd=new Date(p.birth);const lines=dailyHexagram(bd,today);const hex=findHexagram(lines);const dateStr=today.getDate()+' '+MONTHS[today.getMonth()].toLowerCase()+' '+today.getFullYear();let html='<div class="card" style="text-align:center;"><div class="section-title">Совет на сегодня · '+dateStr+'</div>';html+='<div style="font-size:13px;color:rgba(200,180,100,.5);margin-bottom:8px;">Для '+p.first+(p.last?' '+p.last:'')+'</div>';html+=drawHexagram(hex.lines);html+='<div class="hex-number">Гексаграмма '+hex.n+'</div>';html+='<div class="hex-name-cn">'+hex.cn+'</div>';html+='<div class="hex-name">'+hex.name+'</div>';html+='<div class="hex-meaning">'+hex.meaning+'</div>';html+='<div class="hex-judgment">«'+hex.judge+'»</div>';html+='<div class="hex-text">'+hex.text+'</div>';html+='</div>';el.innerHTML=html;}

function renderIChing(){const lines=castHexagram();const hex=findHexagram(lines);const question=document.getElementById('iching-question').value.trim();let html='<div class="card" style="text-align:center;">';if(question)html+='<div style="font-size:13px;color:rgba(200,180,100,.5);font-style:italic;margin-bottom:12px;">«'+question+'»</div>';html+=drawHexagram(hex.lines);html+='<div class="hex-number">Гексаграмма '+hex.n+'</div>';html+='<div class="hex-name-cn">'+hex.cn+'</div>';html+='<div class="hex-name">'+hex.name+'</div>';html+='<div class="hex-meaning">'+hex.meaning+'</div>';html+='<div class="hex-judgment">«'+hex.judge+'»</div>';html+='<div class="hex-text">'+hex.text+'</div>';html+='</div>';document.getElementById('iching-result').innerHTML=html;}

function renderProfile(){const p=loadProfile();if(p){document.getElementById('prof-last').value=p.last||'';document.getElementById('prof-first').value=p.first||'';document.getElementById('prof-middle').value=p.middle||'';document.getElementById('prof-birth').value=p.birth||'';document.getElementById('prof-time').value=p.time||'12:00';if(p.first){const fn=(p.last||'')+' '+p.first+' '+(p.middle||'');const nn=calcNameNumber(fn);const meaning=NUM_MEANINGS[nn]||NUM_MEANINGS[nn%9||9];let html='<div class="card"><div class="section-title">Нумерология имени</div><div class="num-result"><div class="num-big">'+nn+'</div><div class="num-label">Число имени</div></div><div class="num-desc">'+meaning+'</div></div>';if(p.birth){const bd=new Date(p.birth);const si=getZodiac(bd.getMonth()+1,bd.getDate());const aIdx=chiAnimal(bd.getFullYear()),eIdx=chiElement(bd.getFullYear());html+='<div class="card" style="text-align:center;"><div class="section-title">Ваш знак</div><div style="font-size:40px;">'+ZODIAC[si].symbol+'</div><div style="font-size:18px;color:#e8d89a;margin-top:4px;">'+ZODIAC[si].name+'</div><div style="margin-top:8px;font-size:13px;color:rgba(200,180,100,.5);">'+CHI_ANIMAL_ICONS[aIdx]+' '+CHI_ANIMALS[aIdx]+' · '+CHI_ELEM_ICONS[eIdx]+' '+CHI_ELEMENTS_5[eIdx]+'</div></div>';}document.getElementById('numerology-result').innerHTML=html;}}}

window.selectDay=function(y,m,d){currentDate=new Date(y,m,d);renderMoon();};
window.setFilter=function(f){holFilter=f;renderHolidays();};
window.showTab=function(t){document.querySelectorAll('.tab-btn').forEach(b=>{b.classList.toggle('active',b.dataset.tab===t);});document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById('page-'+t).classList.add('active');if(t==='profile')renderProfile();if(t==='today')renderToday();if(t==='iching')renderIChingDaily();window.scrollTo(0,0);};
window.saveProfile=function(){const data={last:document.getElementById('prof-last').value.trim(),first:document.getElementById('prof-first').value.trim(),middle:document.getElementById('prof-middle').value.trim(),birth:document.getElementById('prof-birth').value,time:document.getElementById('prof-time').value||'12:00'};if(!data.first){alert('Введите имя');return;}saveProfileData(data);renderAccountBar();renderProfile();renderToday();alert('Профиль сохранён!');};
window.clearProfile=function(){if(confirm('Удалить все данные профиля?')){localStorage.removeItem('lunaris_profile');document.getElementById('prof-last').value='';document.getElementById('prof-first').value='';document.getElementById('prof-middle').value='';document.getElementById('prof-birth').value='';document.getElementById('prof-time').value='12:00';document.getElementById('numerology-result').innerHTML='';renderAccountBar();renderToday();}};
document.querySelectorAll('.tab-btn').forEach(btn=>{btn.addEventListener('click',function(){showTab(btn.dataset.tab);});});
document.getElementById('moon-prev').addEventListener('click',function(){viewMonth=new Date(viewMonth.getFullYear(),viewMonth.getMonth()-1,1);renderMoon();});
document.getElementById('moon-next').addEventListener('click',function(){viewMonth=new Date(viewMonth.getFullYear(),viewMonth.getMonth()+1,1);renderMoon();});
document.getElementById('hol-prev').addEventListener('click',function(){holYear--;renderHolidays();});
document.getElementById('hol-next').addEventListener('click',function(){holYear++;renderHolidays();});
document.getElementById('natal-btn').addEventListener('click',function(){const v=document.getElementById('birth-date').value;const t=document.getElementById('birth-time').value;if(v)renderNatal(new Date(v),t);});
document.getElementById('iching-btn').addEventListener('click',renderIChing);
const prof=loadProfile();if(prof&&prof.birth){document.getElementById('birth-date').value=prof.birth;document.getElementById('birth-time').value=prof.time||'12:00';}

renderStars();renderAccountBar();renderToday();renderMoon();renderHolidays();renderIChingDaily();
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(function(){});}
</script>
</body>
</html>
