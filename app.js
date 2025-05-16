const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();
const PORT = process.env.PORT || 3000;

// CONFIGURAR MUSTACHE
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// SERVIR ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// INYECTAR AÑO
app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  next();
});

// RUTA DE TEST
app.get('/test', (req, res) => res.send('<h1 style="color: green;">✅ Test OK</h1>'));

// FUNCIÓN PARA RENDERIZAR CON LAYOUT Y PARTIALS
const renderWithLayout = (body, title) => ({
  title,
  partials: {
    body,
    header: 'partials/header',
    footer: 'partials/footer'
  }
});

// RUTAS PRINCIPALES
app.get('/', (req, res) => {
  res.render('layouts/main', renderWithLayout('index', 'Inicio'));
});

app.get('/about', (req, res) => {
  res.render('layouts/main', renderWithLayout('about', 'Sobre mí'));
});

app.get('/projects', (req, res) => {
  res.render('layouts/main', renderWithLayout('projects', 'Proyectos'));
});

app.get('/contact', (req, res) => {
  res.render('layouts/main', renderWithLayout('contact', 'Contacto'));
});

// ARRANCAR
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));