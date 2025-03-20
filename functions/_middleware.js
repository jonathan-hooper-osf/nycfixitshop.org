export const onRequest = async ({ request, env }) => {
    const auth = request.headers.get("Authorization");
    const expectedAuth = "Basic " + btoa("nycfixit:repair");
    if (auth !== expectedAuth) {
        return new Response("Unauthorized", { status: 401, headers: { "WWW-Authenticate": "Basic" } });
    }
};
