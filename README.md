## Структура проекта

**Основные каталоги**

```
.
├── dist/
│   ├── assets/
│   │   ├── css/
│   │   ├── fonts/
│   │   ├── img/
│   │   ├── less/
│   │   ├── consultation.php
│   │   ├── db.json
│   │   └── server.php
│   ├── index.html
│   └── script.js
├── src/
│   ├── assets/
│   │   ├── css/
│   │   ├── fonts/
│   │   ├── img/
│   │   ├── less/
│   │   ├── consultation.php
│   │   ├── db.json
│   │   └── server.php
│   ├── js/
│   │   ├── modules/
│   │   ├── services/
│   │   └── main.js
│   ├── screenshots/
│   └── index.html
├── gulpfile.js
├── package.json
├── package-lock.json
└── README.md

```

=======

![Интерфейс приложения](./src/screenshots/screenshot1.png)
![Интерфейс приложения](./src/screenshots/screenshot2.png)
![Интерфейс приложения](./src/screenshots/screenshot3.png)
![Интерфейс приложения](./src/screenshots/screenshot4.png)
![Интерфейс приложения](./src/screenshots/screenshot5.png)
![Интерфейс приложения](./src/screenshots/screenshot6.png)
![Интерфейс приложения](./src/screenshots/screenshot7.png)
![Интерфейс приложения](./src/screenshots/screenshot8.png)
![Интерфейс приложения](./src/screenshots/screenshot9.png)
![Интерфейс приложения](./src/screenshots/screenshot10.png)
![Интерфейс приложения](./src/screenshots/screenshot11.png)

**О проекте**

Сайт магазина картин на Vanilla JavaScript. Пользователь может заказать картину, указав необходимые требования (габариты, материал холста и т.п.) Требования будут отправлены на сервер с помощью json-server в виде объекта. На сайте реализованы слайдеры. Также пользователь может загрузить на сайт свой потрет и отправить заявку на написание картины (реаоизована обратная связь с пользователем).

**Технологии**

- Gulp
- Vanilla JavaScript
- webpack

**Установка**

```
git clone https://github.com/NikRNN/Picture.git
cd Picture
npm install
npm gulp
```
