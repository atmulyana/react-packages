import React from 'react';

export function meta() {
    return [
        {title: "User-Agent string"}
    ];
}

export default function UserAgent() {
    const [userAgent, setUserAgent] = React.useState('');
    React.useEffect(() => {
        setUserAgent(navigator.userAgent);
    }, []);

    return <div className='p-4'>
        <span>{userAgent}</span>
    </div>;
}
