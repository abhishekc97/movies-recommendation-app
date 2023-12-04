import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';

import { registerUser } from '../../api/userOperationsAPI';

export default function RegisterModal({
	show,
	redirectToLogin,
	onClose,
	handleRegisterSuccess
}) {
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
					setTimeout(() => {
						toast('Registration successfull!', {
							position: toast.POSITION.TOP_CENTER
						});
						handleRegisterSuccess();
					}, 1000);
				}
			} catch (error) {
				toast.error('Could not register.', {
					position: toast.POSITION.BOTTOM_RIGHT
				});
			}
		}
	}

	// MUI style
	const muiBoxStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '75%',
		height: '80%',
		bgcolor: 'background.paper',
		border: 'none',
		p: 0
	};

	return (
		<Modal
			open={show}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={muiBoxStyle}>
				<div className="registerModalWrapper flex w-full h-full border-none">
					<div className="left flex flex-col items-center justify-center w-[55%] h-full bg-white">
						<div className="leftHeadline font-bold text-3xl w-full py-5 px-12">
							Signup to continue
						</div>
						<form
							onSubmit={handleRegister}
							className="registerForm flex flex-col h-[75%] w-[90%] pt-5 px-5 justify-start gap-3 box-border relative"
						>
							<div className="inputContainer flex flex-col w-[90%] h-[13%] items-baseline ">
								<div className="inputRow flex w-full items-center">
									<img
										src=""
										alt=""
										className="nameIcon w-6 h-5 mr-5 bg-contain"
									></img>
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
							</div>
							<div className="inputContainer">
								<div className="inputRow">
									<span className="mailIcon"></span>
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
							</div>
							<div className="inputContainer">
								<div className="inputRow">
									<span className="mobileIcon"></span>
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
							</div>
							<div className="inputContainer">
								<div className="inputRow">
									<span className="lockIcon"></span>
									<input
										type={
											isPasswordVisible
												? 'text'
												: 'password'
										}
										placeholder="Password*"
										className="inputBox"
										name="password"
										value={formData.password}
										onChange={handleInputChange}
									/>
									<i
										id="togglePassword"
										className={
											isPasswordVisible
												? 'far fa-eye'
												: 'far fa-eye-slash'
										}
										onClick={() =>
											setIsPasswordVisible(
												!isPasswordVisible
											)
										}
									></i>
								</div>
								{formErrors.password && (
									<span className="formValidationError">
										{formErrors.password}
									</span>
								)}
							</div>
							<div className="moreActionsContainer">
								<span>Already have an account?</span>
								<button
									className="redirectButton"
									onClick={() => redirectToLogin()}
								>
									Log In
								</button>
							</div>
							<button type="submit" className="registerButton">
								Signup
							</button>
						</form>
					</div>
					<div className="right">
						<div className="rightHeadline">Movies A to Z</div>
						<div className="rightDescription">
							Browse latest movies and get recommendations...
						</div>
					</div>
				</div>
			</Box>
		</Modal>
	);
}
