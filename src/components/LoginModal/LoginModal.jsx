import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './LoginModal.module.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/userOperationsAPI';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function LoginModal({ show, onClose }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const [formErrors, setFormErrors] = useState({
		email: '',
		password: ''
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function handleInputChange(event) {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	}

	function validateForm() {
		const errors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!emailRegex.test(formData.email)) {
			errors.email = 'Email address format is invalid';
		}
		if (!formData.password) {
			errors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			errors.password = 'Password must be at least 6 characters long';
		}
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	}

	async function handleLogin(e) {
		e.preventDefault();
		const isValidForm = validateForm();
		if (isValidForm) {
			// api to login
			try {
				let response = await loginUser(formData);
				if (response.status === 200) {
					localStorage.setItem('token', response.data.token);
					setTimeout(() => {
						dispatch({ type: 'login' });
						navigate('/');
						onClose();
					}, 1500);
				}
			} catch (error) {
				toast.error('Could not login', {
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
				<div className="loginModalWrapper">
					<div className="left">
						<div className="leftHeadline">Log in to continue</div>
						<form onSubmit={handleLogin} className="loginForm">
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

							<button type="submit" className="loginButton">
								Log In
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
