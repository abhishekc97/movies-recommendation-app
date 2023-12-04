import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import { getAllTMDBMoviesAPI } from '../../api/moviesAPI';
import MovieCard from '../../components/MovieCard/MovieCard';

export default function Home({ isAuthenticated }) {
	return (
		<div className="homeWrapper flex flex-col w-full h-full m-auto ">
			<Header isAuthenticated={isAuthenticated} />
			<div className="sections w-full relative top-20 bg-white scroll-smooth snap-y snap-mandatory">
				<Main isAuthenticated={isAuthenticated} />
			</div>
		</div>
	);
}

function Main({ isAuthenticated }) {
	const [movies, setMovies] = useState([]);

	const [pageFilters, setPageFilters] = useState({
		page: '',
		sort_by: ''
	});

	async function getAllTmdbMovies() {
		const results = await getAllTMDBMoviesAPI(
			pageFilters.page,
			pageFilters.sort_by
		);
		if (results) {
			setMovies(results.results);
		}
	}

	function handleSearchClick() {
		console.log('search');
	}

	useEffect(() => {
		getAllTmdbMovies();
	}, []);

	useEffect(() => {
		console.log(movies);
	}, [movies]);

	return (
		<div className="mainWrapper min-h-screen flex flex-col items-center justify-center">
			{/* Top section */}
			<div className="topSection flex w-full justify-between px-16 sm:my-6 md:my-6 mb-8 h-16 min-h-16 ">
				<Button
					variant="outline-secondary"
					onClick={handleSearchClick}
					className="w-fit border rounded-md px-4"
				>
					Search for a movie
				</Button>
			</div>
			{/* Grid layout for showing movies */}
			<div className="moviesContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:h-[632px] mx-auto mb-8">
				{movies.map((movie, index) => (
					<div key={movie.id} className="movieCard p-4">
						<MovieCard movie={movie} />
					</div>
				))}
			</div>
		</div>
	);
}
