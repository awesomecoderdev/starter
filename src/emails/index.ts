import { buildSendMail } from "@/utils/mailer";
import nodemailer from "nodemailer";

const sendMail = buildSendMail({
	transport: nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: parseInt(process.env.MAIL_PORT ?? "587"),
		// secure: process.env.MAIL_ENCRYPTION == "tls", // use TLS
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	}),
	defaultFrom: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
});

export default sendMail;

export const sendMarketingMail = buildSendMail({
	transport: nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: parseInt(process.env.MAIL_PORT ?? "587"),
		// secure: process.env.MAIL_ENCRYPTION == "tls", // use TLS
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	}),
	defaultFrom: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
});
