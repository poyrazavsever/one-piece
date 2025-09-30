// +server.ts
// import type { RequestHandler } from '@sveltejs/kit';
//
// export const GET: RequestHandler = async ({ url, fetch }) => {
//   // Rebuild target URL
//   const upstreamPath = url.pathname.replace(/^\/api\/op\/?/, '');
//   const target = `https://api.api-onepiece.com/${upstreamPath}${url.search}`;
//
//   const resp = await fetch(target, { headers: { accept: 'application/json' } });
//   const body = await resp.arrayBuffer();
//
//   return new Response(body, {
//     status: resp.status,
//     headers: {
//       'content-type': resp.headers.get('content-type') ?? 'application/json',
//       'cache-control': 'public, max-age=300', // 5dk cache
//       'access-control-allow-origin': '*'
//     }
//   });
// };
