const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

// Rutas de las páginas que quieres generar
const pages = [
  { view: 'index', title: 'Inicio', output: 'index.html' },
  { view: 'about', title: 'Sobre mí', output: 'about.html' },
  { view: 'projects', title: 'Proyectos', output: 'projects.html' },
  { view: 'contact', title: 'Contacto', output: 'contact.html' },
  { view: '404', title: 'Página no encontrada', output: '404.html' }
];

// Carga el layout principal y los partials
const layout = fs.readFileSync(path.join(__dirname, 'views', 'layouts', 'main.mustache'), 'utf8');
const header = fs.readFileSync(path.join(__dirname, 'views', 'partials', 'header.mustache'), 'utf8');
const footer = fs.readFileSync(path.join(__dirname, 'views', 'partials', 'footer.mustache'), 'utf8');

pages.forEach(page => {
  const viewPath = path.join(__dirname, 'views', `${page.view}.mustache`);
  const viewContent = fs.readFileSync(viewPath, 'utf8');
  const html = mustache.render(layout, {
    title: page.title,
    year: new Date().getFullYear(),
    body: mustache.render(viewContent, { title: page.title })
  }, {
    'partials/header': header,
    'partials/footer': footer
  });
  fs.writeFileSync(path.join(__dirname, page.output), html, 'utf8');
  console.log(`Generado: ${page.output}`);
});