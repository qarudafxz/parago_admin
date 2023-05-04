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

		//boilerplate for message
		const message = {
			from: process.env.PARAGO_EMAIL,
			to: email,
			subject: "Parago Admin Account Verification",
			text: `Hello ${name}, please click the link below to verify your account: ${process.env.CLIENT_URL}/users/${userID}/verify/$${token}}`,
			html: `<p>Hello ${name}, please click the link below to verify your account: <br><br>${process.env.CLIENT_URL}/users/${userID}/verify/$${token}</p>`,
			date: new Date(),
		};

		//function to send the email using sendEmail method with parameters: message, callback
		await transporter.sendMail(message, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log("Email has been sent:- ", info.response);
			}
		});

		await transporter.verify((error, success) => {
			if (error) {
				console.error(error);
			} else {
				console.log("Server is ready to take our message", success);
			}
		});
	} catch (err) {
		console.error(err);
	}
};
