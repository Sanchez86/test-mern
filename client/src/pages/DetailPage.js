import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";

export const DetailPage = () => {
    const { token } = useContext(AuthContext);
    const { loading, error, request } = useHttp();
    const [linkData, setLinkData] = useState(null);
    const linkId = useParams().id;

    useEffect(() => {
        (
            async () => {
                try {

                    const data = await request(`/api/link/${linkId}`, 'GET', null, {
                        Authorization: `Bearer ${token}`
                    });
                    console.log('data', data);
                    setLinkData(data);

                } catch (e) {
                    console.log('error', e);
                }
            }
        )()
    }, []);

    console.log('linkData', linkData);

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>Detail Page</h1>
            {linkData ? <LinkCard linkData={linkData} /> : null}

        </div>
    );
}