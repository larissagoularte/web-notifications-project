export const onRequestGet = () => {
    return new Response("Hello world")
}

export const onRequestPost = async ({ request }) => {
    const { name } = await request.json();
    return new Response(`Hello ${name}`)
}