import { withBasePath } from "@/lib/with-base-path";

export const prerender = false;

export function GET() {
	return new Response(null, { status: 307, headers: { Location: withBasePath("/keystatic") } });
}
