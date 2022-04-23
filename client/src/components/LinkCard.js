import React from 'react';

export const LinkCard = ({ linkData }) => {
    return (
        <div className='link-card'>
            <p>ID: <strong>{linkData?._id}</strong></p>
            <p>Code: <strong>{linkData?.code}</strong></p>
            <p>Owner: <strong>{linkData?.owner}</strong></p>
            <p>From: <strong><a href={linkData?.from} target='_blank'>{linkData?.from}</a></strong></p>
            <p>Новая ссылка: <strong><a href={linkData?.to} target="_blank">{linkData?.to}</a></strong></p>
            <p>Date: <strong>{new Date(linkData?.date).toLocaleDateString()}</strong></p>
            <p>Clicks: <strong>{linkData?.clicks}</strong></p>
        </div>
    )
};
