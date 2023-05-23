import nodemailer from "nodemailer";

export const sendVerification = async (name, email, userID, token) => {
	try {
		//transporter is a boilerplate or setup for sending emails
		//parameters include service, host, port, secure, auth
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 587,
			secure: true,
			auth: {
				user: process.env.PARAGO_EMAIL,
				//password must be a generated APP password for verification
				//since less secure app is deprecated
				pass: process.env.PARAGO_PASSWORD,
			},
		});

		await new Promise((resolve, reject) => {
			transporter.verify((error, success) => {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					console.log("Server is ready to take our message", success);
					resolve(success);
				}
			});
		});

		//boilerplate for message
		const message = {
			from: process.env.PARAGO_EMAIL,
			to: email,
			subject: "Parago Password Reset",
			html: `
					<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" height="100%" bgcolor="#F3F3F3">
							<tr>
									<td align="center">
											<table cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="background-color: #ffffff; border-collapse: collapse;">
													<tr>
															<td align="center" style="padding: 40px 0;">
																	<img src="https://i.ibb.co/GdHL0Wt/PNGG.png" alt="Parago Logo" width="200" height="50">
															</td>
													</tr>
													<tr>
															<td align="center" style="padding: 20px 40px; font-family: 'Poppins', sans-serif; font-size: 16px; line-height: 24px;">
																	<h1 style="font-family: 'Poppins', sans-serif; font-weight: bold; font-size: 30px; margin: 0;">Dear ${name},</h1>
																	<p style="font-size: 13px; margin-top: 20px;">Thank you for creating an account with Parago Admin. To complete your registration, please click the link below to verify your account:</p>
																	<p style="background-color: #0043DC; padding: 10px 20px; margin-top: 30px; display: inline-block;">
																			<a href="${
																				process.env.NODE_ENV === "production"
																					? "http://parago-admin.vercel.app"
																					: "http://localhost:5173"
																			}/users/${userID}/verify/${token}" style="color: #ffffff; font-size: 16px; text-decoration: none; cursor: pointer;">Verify my account</a>
																	</p>
																	<p style="font-size: 13px; margin-top: 30px;">If you did not create an account with Parago Admin, please disregard this email.</p>
																	<p style="font-size: 13px; margin-top: 30px;">Thank you,</p>
																	<p style="font-size: 13px;">The Parago Team</p>
																	<p style="font-size: 12px; margin-top: 30px;"><i>This is an automated email. Please do not reply to this email.</i></p>
															</td>
													</tr>
											</table>
									</td>
							</tr>
					</table>
			`,
			date: new Date(),
		};

		//function to send the email using sendEmail method with parameters: message, callback
		//callback returns error or info
		await new Promise((resolve, reject) => {
			transporter.sendMail(message, (error, info) => {
				if (error) {
					console.log(error);
					reject(error);
				} else {
					console.log("Email has been sent:- ", info.response);
					resolve(info);
				}
			});
		});
	} catch (err) {
		console.error(err);
	}
};

export const verifyEmailForPasswordReset = async (email, token) => {
	try {
		//transporter is a boilerplate or setup for sending emails
		//parameters include service, host, port, secure, auth
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 587,
			secure: true,
			auth: {
				user: process.env.PARAGO_EMAIL,
				//password must be a generated APP password for verification
				//since less secure app is deprecated
				pass: process.env.PARAGO_PASSWORD,
			},
		});

		await new Promise((resolve, reject) => {
			transporter.verify((error, success) => {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					console.log("Server is ready to take our message", success);
					resolve(success);
				}
			});
		});

		//boilerplate for message
		const message = {
			from: process.env.PARAGO_EMAIL,
			to: email,
			subject: "Parago Admin Account Verification",
			html: `
					<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" height="100%" bgcolor="#F3F3F3">
							<tr>
									<td align="center">
											<table cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="background-color: #ffffff; border-collapse: collapse;">
													<tr>
															<td align="center" style="padding: 40px 0;">
																	<img src="https://i.ibb.co/GdHL0Wt/PNGG.png" alt="Parago Logo" width="200" height="50">
															</td>
													</tr>
													<tr>
															<td align="center" style="padding: 20px 40px; font-family: 'Poppins', sans-serif; font-size: 16px; line-height: 24px;">
																	<h1 style="font-family: 'Poppins', sans-serif; font-weight: bold; font-size: 30px; margin: 0;">Forgot Password</h1>
																	<p style="font-size: 13px; margin-top: 20px;">This is your confirmation that you are granted to change your password. Please click on change password, otherwise, If you think this is a mistake, contact the paraGO Administrator</p>
																	<p style="background-color: #0043DC; padding: 10px 20px; margin-top: 30px; display: inline-block;">
																			<a href="${
																				process.env.NODE_ENV === "production"
																					? "http://parago-admin.vercel.app"
																					: "http://localhost:5173"
																			}/change-password/${email}/token/${token}" style="color: #ffffff; font-size: 16px; text-decoration: none; cursor: pointer;">Change Password</a>
																	</p>
																	<p style="font-size: 13px;">The Parago Team</p>
																	<p style="font-size: 12px; margin-top: 30px;"><i>This is an automated email. Please do not reply to this email.</i></p>
															</td>
													</tr>
											</table>
									</td>
							</tr>
					</table>
			`,
			date: new Date(),
		};
		await new Promise((resolve, reject) => {
			transporter.sendMail(message, (error, info) => {
				if (error) {
					console.log(error);
					reject(error);
				} else {
					console.log("Email has been sent:- ", info.response);
					resolve(info);
				}
			});
		});
	} catch (err) {
		console.error(err);
	}
};
