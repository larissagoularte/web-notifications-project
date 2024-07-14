export async function onRequest(context) {
    const { request, env } = context;
    const body = await request.json();

    if(!body || !body.type || !body.content || !body.content.text) {
        return new Response("Invalid request body", { status: 400 });
    }

    const { type, content } = body;
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const notification = {
        id, 
        type,
        content,
        timestamp,
        read: false
    }

    await env.NOTIFICATIONS.put(id, JSON.stringify(notification));


    const response = [
		{
			notification: {
				type: notification.type,
				content: notification.content,
				read: notification.read
			},
			id: notification.id,
			timestamp: notification.timestamp,
		}
	];


    return new Response(response, { status: 201 });

}