const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();
const PORT = process.env.PORT || 3000;

// CONFIGURAR MUSTACHE
app.engine('mustache',
  mustacheExpress(
    path.join(__dirname, 'views', 'partials'),
    '.mustache'
  )
);
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

// RUTAS MUSTACHE
app.get('/',        (req, res) => res.render('index',    { title: 'Inicio' }));
app.get('/about',   (req, res) => res.render('about',    { title: 'Sobre mí' }));
app.get('/projects',(req, res) => res.render('projects', { title: 'Proyectos' }));
app.get('/contact', (req, res) => res.render('contact',  { title: 'Contacto' }));

// ARRANCAR
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
