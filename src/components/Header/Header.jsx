import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Header({ isAuthenticated }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleLogout() {
		dispatch({ type: 'logout' });
		localStorage.removeItem('token');
		navigate('/');
	}

	return (
		<div className="headerWrapper flex w-full items-center px-12 h-20 bg-sky-800 text-white fixed top-0 z-10 ">
			<div className="headerContainer flex relative w-full items-center">
				<Link
					to="/"
					className="mainPageLink text-3xl text-white font-bold"
				>
					Movies A-Z
				</Link>
				<Link
					to="/login"
					className={`loginButton flex items-center justify-center absolute box-border mr-1 right-40 border-none border-0 w-28 h-11 bg-none cursor-pointer' ${
						isAuthenticated ? 'flex' : 'hidden'
					}
                        'textStyle text-white decoration-0 font-bold text-3xl'
                    `}
				>
					Log in
				</Link>
				<Link
					to="/register"
					className={`signupButton flex items-center justify-center absolute box-border mr-1 right-40 border-2 rounded-lg w-32 h-11 bg-none cursor-pointer'${
						isAuthenticated ? 'hidden' : 'flex'
					} 'textStyle text-white decoration-0 font-bold text-3xl'
                    `}
				>
					Sign up
				</Link>
				<div
					onClick={handleLogout}
					className={`$'logoutButton  flex items-center justify-center absolute box-border mr-1 right-40 border-none border-0 rounded-lg w-32 h-11 bg-none cursor-pointer' ${
						isAuthenticated ? 'flex' : 'hidden'
					} 'textStyle text-white decoration-0 font-bold text-3xl'
                    `}
				>
					Log out
				</div>
				<div
					className={`profileBox flex w-32 h-12 border-0 absolute right-0 items-center justify-center gap-1 ' ${
						isAuthenticated ? 'flex' : 'hidden'
					} 'textStyle text-white decoration-0 font-bold text-3xl'
                    `}
				>
					<span>Hello!</span>
					<img
						src="/images/default_profile_picture.png"
						className="profilePic"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
