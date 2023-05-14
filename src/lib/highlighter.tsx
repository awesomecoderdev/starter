"use client";

export function highlight(code: any, lang?: any): any {
	return code;

	// return (
	// 	<code>
	// 		<code className="language-js">
	// 			<span>
	// 				<span style={{ color: "var(--shiki-token-keyword)" }}>
	// 					import
	// 				</span>
	// 				<span> </span>
	// 				<span style={{ color: "var(--shiki-color-text)" }}>
	// 					ApiClient
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-keyword)" }}>
	// 					from
	// 				</span>
	// 				<span
	// 					style={{
	// 						color: "var(--shiki-token-string-expression)",
	// 					}}
	// 				>
	// 					'@example/protocol-api'
	// 				</span>
	// 			</span>
	// 			<span>
	// 				<span style={{ color: "var(--shiki-token-keyword)" }}>
	// 					const
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-constant)" }}>
	// 					client
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-keyword)" }}>
	// 					=
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-keyword)" }}>
	// 					new
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-function)" }}>
	// 					ApiClient
	// 				</span>
	// 				<span style={{ color: "var(--shiki-color-text)" }}>
	// 					(token)
	// 				</span>
	// 			</span>
	// 			<span>
	// 				<span style={{ color: "var(--shiki-token-keyword)" }}>
	// 					await
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-constant)" }}>
	// 					client
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-function)" }}>
	// 					.
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-constant)" }}>
	// 					conversations
	// 				</span>
	// 				<span style={{ color: "var(--shiki-token-function)" }}>
	// 					.list
	// 				</span>
	// 				<span style={{ color: "var(--shiki-color-text)" }}>()</span>
	// 			</span>
	// 		</code>
	// 	</code>
	// );
}
