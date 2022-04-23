import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

export const CreatePage = () => {
    let navigate = useNavigate();
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [link, setLink] = useState('');
    const pressHandler = async (event) => {
        if (event.key === 'Enter') {

            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                });
                return navigate(`/detail/${data.link._id}`);

                console.log(data);
            } catch (e) { }
        }
    };
    return (
        <div>
            <h1>Create Page</h1>
            <div className="col s6 offset-s3">
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        name="link"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Ссылка</label>
                </div>
            </div>
        </div>
    );
}