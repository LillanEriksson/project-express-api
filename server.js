import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
import goldenGlobesData from './data/golden-globes.json';

// import avocadoSalesData from './data/avocado-sales.json';
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
	res.send('Hello world');
});

app.get('/nominations', (req, res) => {
	res.json(goldenGlobesData);
});

app.get('/year/:year', (req, res) => {
	const year = req.params.year;
	const showWin = req.query.win;
	let nominationsFromYear = goldenGlobesData.filter(
		(item) => item.year_award === +year
	);

	if (showWin) {
		nominationsFromYear = nominationsFromYear.filter((item) => item.win);
	}
	res.json(nominationsFromYear);
});

//single item

app.get('/year/:year/category/best_drama/?win=true', (req, res) => {
	const year = req.params.year;
	const showWin = req.query.win;

	let bestDrama = goldenGlobesData.filter(
		(item) => item.category === 'Best Motion Picture - Drama'
	);

	if (showWin) {
		bestDrama = bestDrama.filter((item) => item.win);
	}
	let bestDramaOfTheYear = bestDrama.filter(
		(item) => item.year_award === +year
	);

	res.json(bestDramaOfTheYear);
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
