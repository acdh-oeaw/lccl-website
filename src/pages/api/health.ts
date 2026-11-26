export const prerender = false;

export function GET() {
	return new Response("OK", {
		headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
	});
}
