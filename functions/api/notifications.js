export async function onRequestPost(context) {
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

export async function onRequestGet(context) {
    const { env } = context;

    const keys = await env.NOTIFICATIONS.list();
    if(keys.keys.length === 0) {
        return new Response(JSON.stringify([]), { status: 200 });
    }

    const notifications = await Promise.all(
        keys.keys.map(async (key) => {
            const notification = await env.NOTIFICATIONS.get(key.name, {type: 'json'});
            return notification;
        })
    );

    return new Response(JSON.stringify(notifications), {status: 200 });
}