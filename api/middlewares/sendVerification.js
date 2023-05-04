import nodemailer from "nodemailer";

export const sendVerification = async (name, email, userID, token) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 587,
			secure: true,
			auth: {
				user: process.env.PARAGO_EMAIL,
				pass: process.env.PARAGO_PASSWORD,
			},
		});

		const message = {
			from: process.env.PARAGO_EMAIL,
			to: email,
			subject: "Parago Admin Account Verification",
			text: `Hello ${name}, please click the link below to verify your account: ${process.env.CLIENT_URL}/verify?id=${userID}/${token}}`,
			html: `<p>Hello ${name}, please click the link below to verify your account: ${process.env.CLIENT_URL}/verify?id=${userID}/${token}</p>`,
			date: new Date(),
		};

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
