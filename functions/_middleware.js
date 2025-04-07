export const onRequest = async ({ request, env, next }) => {
    // If authentication environment variables are not set, allow the request through.
    if (!env.HTTP_AUTH_USERNAME || !env.HTTP_AUTH_PASSWORD) {
        return await next();
    }

    // If path is /subscribe, allow the request through.
    if (request.url.includes('/subscribe')) {
        return await next();
    }

    // Get the authorization header from the request
    const auth = request.headers.get("Authorization");
    
    // Construct the expected Basic auth string using environment variables
    const expectedAuth = "Basic " + btoa(`${env.HTTP_AUTH_USERNAME}:${env.HTTP_AUTH_PASSWORD}`);

    // If the provided auth doesn't match, return a 401 Unauthorized response
    if (auth !== expectedAuth) {
        return new Response("Unauthorized", {
            status: 401,
            headers: { "WWW-Authenticate": "Basic"}
        });
    }

    // If authorized, continue processing the request
    return await next();
};
