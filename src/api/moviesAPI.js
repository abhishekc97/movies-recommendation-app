import axios from 'axios';
const URL = process.env.REACT_APP_BACKEND_URL;

// GET request API to get list of all movies from TMDB
export async function getAllTMDBMoviesAPI(page, sort_by) {
	try {
		const reqUrl = `${URL}/api/movies/get-tmdb-movies?page=${page}&sort_by=${sort_by}`;
		console.log(reqUrl);
		const result = await axios.get(reqUrl);
		if (result) {
			console.log(result);
			return result.data;
		}
	} catch (error) {
		console.log(error);
	}
}
