import React, { useState } from 'react';

const Notifications = () => {
    const [type, setType] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type, content: { text } }),
        });

        if (response.ok) {
            alert('Notification created');
            setType('');
            setText('');  
        } else {
            alert('Failed to create notification');
        }
    };

    return (
        <div
         className="w-full flex lg:flex-row flex-col gap-[20px]">
      
            <div id="form-container" className="md:w-1/2 bg-white md:py-10 md:pl-10">

                <div className="bg-neutral-100 rounded-lg p-5">

                    <h2 className="text-3xl font-medium mb-6">Create Notification</h2>
                    
                    <form id="notification-form" onSubmit={handleSubmit}>

                        <textarea id="notification-message" required placeholder="Message..." className="w-full h-40 rounded-lg p-3 mb-5" value={text} onChange={(e) => setText(e.target.value)}/>

                        <select id="notification-type" required className="w-full p-3 mb-5" value={type} onChange={(e) => setType(e.target.value)}>
                            
                            <option value="">Choose Type</option>
                            <option value="Alert">Alert</option>
                            <option value="Info">Info</option>
                            <option value="Success">Success</option>
                        </select>

                        <button id="send-notification-btn" className="w-full bg-neutral-200 rounded-md py-2" type='submit'>Send</button>
                    </form>

                </div>

            </div>

            <div className="feed-container md:w-1/2 bg-red-500">
            feed
            </div>
      </div>
    )

}

export default Notifications