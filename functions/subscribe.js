export async function onRequest(context) {
    try {
      const { request, env } = context;
  
      // Ensure the request is a POST
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
      }
  
      const { email, firstName, lastName } = await request.json();
  
      // Validate input
      if (!email || !firstName || !lastName) {
        return new Response('Missing required fields', { status: 400 });
      }
  
      const apiUrl = 'https://api.sender.net/v2/subscribers';
      //const apiToken = env.SENDER_API_TOKEN;
      const apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDUzZGNiNGZlMWNhMWJlOWM3MDdjNTE3OTczY2MxZGM2MTVlM2FlMDIwZjc1ZjY2MDhmNWVhYzYyNWQ2NmFkMWRlZjhmYWNhNmRmODI2YmIiLCJpYXQiOiIxNzQ0MDM5MzMwLjgzNTc0NyIsIm5iZiI6IjE3NDQwMzkzMzAuODM1NzQ5IiwiZXhwIjoiNDg5NzY0MjkzMC44MzQ1MDIiLCJzdWIiOiI5NTc1NTgiLCJzY29wZXMiOltdfQ.BsgclN1-RsRHD93vieIbikU4_IQr5gwDUeGZJhnYyDydSWC0yHjscH9BjvnrEUvPBzfifwp8BDej_64zeAbMbw';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          first_name: firstName,
          last_name: lastName,
          // Add additional fields as needed
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${errorText}`);
      }
  
      return new Response('Subscription successful', { status: 200 });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  }