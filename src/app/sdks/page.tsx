import { Heading } from "@/components/Heading";
import { Col, Note, Properties, Property, Row } from "@/components/Note";
import { Metadata } from "next";

export const metadata: Metadata = {
	// title: `SDKs - ${process.env.APP_NAME}`,
	title: `SDKs`,
	description:
		"In this guide, we will talk about what happens when something goes wrong while you work with the API.",
};

export default function SDKs() {
	return (
		<>
			<h1>Errors :( </h1>
			<p className="lead">
				In this guide, we will talk about what happens when something
				goes wrong while you work with the API. Mistakes happen, and
				mostly they will be yours, not ours. Lets look at some status
				codes and error types you might encounter.
			</p>
			<p>
				You can tell if your request was successful by checking the
				status code when receiving an API response. If a response comes
				back unsuccessful, you can use the error type and error message
				to figure out what has gone wrong and do some rudimentary
				debugging (before contacting support).
			</p>
			<Note>
				Before reaching out to support with an error, please be aware
				that 99% of all reported errors are, in fact, user errors.
				Therefore, please carefully check your code before contacting
				Protocol support.
			</Note>
			<hr />
			<Heading level={2}>Status codes</Heading>
			<p>
				Here is a list of the different categories of status codes
				returned by the Protocol API. Use these to understand if a
				request was successful.
			</p>
			<Properties>
				<Property name="2xx">
					A 2xx status code indicates a successful response.
				</Property>
				<Property name="4xx">
					A 4xx status code indicates a client error — this means its
					a _you_ problem.
				</Property>
				<Property name="5xx">
					A 5xx status code indicates a server error — you wont be
					seeing these.
				</Property>
			</Properties>
			<hr />
			<Heading level={2}>Error types</Heading>
			<Row>
				<Col>
					Whenever a request is unsuccessful, the Protocol API will
					return an error response with an error type and message. You
					can use this information to understand better what has gone
					wrong and how to fix it. Most of the error messages are
					pretty helpful and actionable. Here is a list of the two
					error types supported by the Protocol API — use these to
					understand what you have done wrong.
					<Properties>
						<Property name="api_error">
							This means that we made an error, which is highly
							speculative and unlikely.
						</Property>
						<Property name="invalid_request">
							This means that you made an error, which is much
							more likely.
						</Property>
					</Properties>
				</Col>
				<Col>
					{/* ```bash {{ title: "Error response" }}
    {
      "type": "api_error",
      "message": "No way this is happening!?",
      "documentation_url": "https://protocol.chat/docs/errors/api_error"
    }
    ``` */}
				</Col>
			</Row>
		</>
	);
}
