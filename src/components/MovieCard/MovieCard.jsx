export default function MovieCard({ movie }) {
	return (
		<div className="flex flex-col m-2">
			<span>{movie.title}</span>
		</div>
	);
}
