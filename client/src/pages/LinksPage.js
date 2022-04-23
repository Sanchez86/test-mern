import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";


export const LinksPage = () => {
    const { token } = useContext(AuthContext);
    const { loading, error, request } = useHttp();
    const [linksData, setLinksData] = useState(null);

    useEffect(() => {
        (
            async () => {
                try {

                    const data = await request(`/api/link/`, 'GET', null, {
                        Authorization: `Bearer ${token}`
                    });
                    console.log('data', data);
                    setLinksData(data);

                } catch (e) {
                    console.log('error', e);
                }
            }
        )()
    }, []);

    console.log('linksData', linksData);

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>Links Page</h1>
            {
                linksData ? linksData.map((item, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/detail/${item._id}`} >Open</Link>
                            <LinkCard linkData={item} />
                        </div>
                    )
                }) : null
            }


        </div>
    );
}