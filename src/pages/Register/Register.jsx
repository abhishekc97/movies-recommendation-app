import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { registerUser } from '../../api/userOperationsAPI';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		mobile: '',
		password: ''
	});

	const [formErrors, setFormErrors] = useState({
		name: '',
		email: '',
		mobile: '',
		password: ''
	});

	function handleInputChange(event) {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	}

	function validateForm() {
		const errors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		const mobileRegex = /^\+?\d{0,3}?\d{10}$/;

		if (!formData.name.trim()) {
			errors.name = 'Name cannot be empty';
		}
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!emailRegex.test(formData.email)) {
			errors.email = 'Email address format is invalid';
		}
		if (!formData.mobile.trim()) {
			errors.mobile = 'Please give a 10 digit phone number';
		} else if (!mobileRegex.test(formData.mobile)) {
			errors.mobile = 'Incorrect format. Follow +00 123-456-7890';
		}
		if (!formData.password) {
			errors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			errors.password = 'Password must be at least 6 characters long';
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	}

	async function handleRegister(e) {
		e.preventDefault();
		const isValidForm = validateForm();
		if (isValidForm) {
			// api to register
			try {
				let response = await registerUser(formData);
				if (response.status === 200) {
					localStorage.setItem('token', response.data.token);

					toast('Registration successfull!', {
						position: toast.POSITION.TOP_CENTER
					});
					setTimeout(() => {
						navigate('/login');
					}, 1500);
				}
			} catch (error) {
				toast.error('Could not register.', {
					position: toast.POSITION.BOTTOM_RIGHT
				});
			}
		}
	}

	return (
		<div className="registerWrapper flex flex-col w-full h-[100vh] mx-auto my-0 border-none items-center justify-center border-l-indigo-700">
			<div className="registerInnerWrapper flex flex-col items-baseline">
				<div className="pageHeadline">Movies A to Z</div>
				<div className="pageDescription">
					Browse latest movies and get recommendations...
				</div>
				<div className="registerContainer flex flex-col items-center justify-center w-[55%] h-full bg-white">
					<form
						onSubmit={handleRegister}
						className="registerForm flex flex-col h-[75%] w-[90%] pt-5 px-5 justify-start gap-3 box-border relative"
					>
						{/* <div className="inputContainer flex flex-col w-[90%] h-[13%] items-baseline "> */}
						<div className="inputRow flex w-full h-[15%] items-center">
							<img
								src="/images/profile_icon.png"
								alt=""
								className="nameIcon w-6 h-5 mr-5 bg-contain"
							/>
							<input
								type="text"
								placeholder="Name"
								className="inputBox"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
							/>
						</div>
						{formErrors.name && (
							<span className="formValidationError">
								{formErrors.name}
							</span>
						)}
						{/* </div> */}
						{/* <div className="inputContainer"> */}
						<div className="inputRow inputRow flex w-full h-[15%] items-center">
							<img
								src="/images/email_icon.png"
								alt=""
								className="mailIcon w-6 h-5 mr-5 bg-contain"
							/>

							<input
								type="email"
								placeholder="Email*"
								className="inputBox"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						{formErrors.email && (
							<span className="formValidationError">
								{formErrors.email}
							</span>
						)}
						{/* </div> */}
						{/* <div className="inputContainer"> */}
						<div className="inputRow inputRow flex w-full h-[15%] items-center">
							<img
								src="/images/mobile_icon.png"
								alt=""
								className="mobileIcon w-6 h-5 mr-5 bg-contain"
							/>

							<input
								type="tel"
								placeholder="Mobile"
								className="inputBox"
								name="mobile"
								value={formData.mobile}
								onChange={handleInputChange}
							/>
						</div>
						{formErrors.mobile && (
							<span className="formValidationError">
								{formErrors.mobile}
							</span>
						)}
						{/* </div> */}
						{/* <div className="inputContainer"> */}
						<div className="inputRow flex w-full h-[15%] items-center">
							<img
								src="/images/lock_icon.png"
								alt=""
								className="lockIcon w-6 h-5 mr-5 bg-contain"
							/>

							<input
								type={isPasswordVisible ? 'text' : 'password'}
								placeholder="Password*"
								className={`inputBox border-none border-b h-10 font-medium text-lg text-gray-400 focus:outline-none placeholder:font-medium placeholder:text-xl placeholder:text-gray-400`}
								name="password"
								value={formData.password}
								onChange={handleInputChange}
							/>
							<i
								id="togglePassword"
								className={
									isPasswordVisible
										? 'far fa-eye cursor-pointer ml-[-30px]'
										: 'far fa-eye-slash'
								}
								onClick={() =>
									setIsPasswordVisible(!isPasswordVisible)
								}
							></i>
						</div>
						{formErrors.password && (
							<span className="formValidationError text-red-500 w-[80%]">
								{formErrors.password}
							</span>
						)}
						{/* </div> */}
						<div className="moreActionsContainer flex my-5">
							<span>Already have an account?</span>
							<Link to="/login">Log In</Link>
						</div>
						<button
							type="submit"
							className="registerButton absolute bottom-8 right-5 text-white w-48 border-none rounded-3xl text-lg font-medium"
						>
							Signup
						</button>
					</form>
				</div>
			</div>

			<ToastContainer />
		</div>
	);
}
