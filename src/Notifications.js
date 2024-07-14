import React, { useEffect, useState } from 'react';

const Notifications = () => {
    const [type, setType] = useState('');
    const [text, setText] = useState('');

    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        const response = await fetch('/api/notifications');
        if(response.ok) {
            const data = await response.json();
            data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setNotifications(data);
        } else {
            alert('Failed to fetch notifications');
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 4000);
        return () => clearInterval(interval);
    }, []);

    const getBackgroundColor = (type) => {
        switch (type) {
            case 'Alert':
                return '#ffcccb';
            case 'Success':
                return '#add8e6';
            case 'Info':
                return '#90ee90';
        }
    }

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
            fetchNotifications();
        } else {
            alert('Failed to create notification');
        }
    };

    return (
        <div className="w-full flex lg:flex-row flex-col gap-[20px]">
      
            <div id="form-container" className="md:w-1/2 bg-white md:py-10 md:pl-10">

                <div className="bg-neutral-100 rounded-lg p-5 h-[400px]">

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

            <div className="feed-container md:w-1/2 bg-white md:py-10 md:pr-10">
                <div id="notification-feed" className='bg-neutral-100 rounded-lg p-5 h-[400px]'>
                    {notifications.map((notification) => (
                        <div id='notification-card' key={notification.id} className='h-[70px] flex flex-col p-4 mb-[10px]' style={{ backgroundColor: getBackgroundColor(notification.type) }}>
                            <div>{notification.content.text}</div>

                            <div className='opacity-80'>
                                {new Date(notification.timestamp).toLocaleString()}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
      </div>
    )

}

export default Notifications