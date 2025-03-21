export const onRequest = async ({ request, env }) => {
    const auth = request.headers.get("Authorization");
    const expectedAuth = "Basic " + btoa(`${env.HTTP_AUTH_USERNAME}:${env.HTTP_AUTH_PASSWORD}`);
    if (auth !== expectedAuth) {
        return new Response("Unauthorized", { status: 401, headers: { "WWW-Authenticate": "Basic" } });
    }
    return next();
};
