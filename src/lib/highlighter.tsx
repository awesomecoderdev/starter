"use client";
// import "highlight.js/styles/github.css";
import hljs from "highlight.js";

export function highlight(code: any, lang?: any): string {
	// return code;
	return hljs.highlightAuto(code).value;
}
