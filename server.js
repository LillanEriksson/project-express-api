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
const port = process.env.PORT || 8090;
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

// app.get('/nominations/:year/', (req, res) => {
// 	const { year } = req.params;

// 	res.json();
// });

//single item

app.get('/nominations/:year/', (req, res) => {
	const year = req.params.year;

	let nominationsFromYear = goldenGlobesData.filter(
		(item) => item.year_award === +year
	);

	res.json(nominationsFromYear);
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
