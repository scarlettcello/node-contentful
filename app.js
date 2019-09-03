const path = require('path');
const express = require('express');
const hbs = require('hbs');
const sass = require('node-sass-middleware');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

const blog = require('./src/services/retrievePost').blog;
const blogList = require('./src/services/blog').blogList;

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(
	sass({
		src: __dirname + './src/scss',
		dest: __dirname + './src/public',
		debug: true
	})
);

app.get('', (req, res) => {
	res.send(blog);
});

app.get('/services', (req, res) => {
	res.send({
		prodcuts: []
	})
});

app.get('/blog', (req, res) => {
	// res.render('blog', {
	// 	blogList: blogList
	// });
	res.send(blogList);
});

app.get('/blogPost', (req, res) => {
	res.render('blogPost', {
		title: blog.title,
		content: blog.content.content[0].content[0].value
	});
});

app.get('/services/*', (req, res) => {
	res.send('Service not found');
})

app.get('*', (req, res) => {
	res.render('404', {
		error: 'Page not found'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
