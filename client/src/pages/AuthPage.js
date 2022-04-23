import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from '../hooks/http.hook';

export const AuthPage = () => {

    const auth = useContext(AuthContext);

    const { loading, error, request } = useHttp();

    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {

        if (error === null) return;

        if (error.errors) {
            if (error) {
                error.errors.map(error => {
                    if (error.msg) {
                        if (window.M) {
                            window.M.toast({ html: error.msg })
                        }
                    }
                });
            }
        }

        if (error.message) {
            if (window.M) {
                window.M.toast({ html: error.message })
            }
        }

    }, [error]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            if (window.M) {
                window.M.toast({ html: data.message })
            }
        } catch (e) {
            console.log('registerHandler', e)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            if (data.message) {
                console.log(data.message);
                if (window.M) {
                    window.M.toast({ html: data.message })
                }
            }

            auth.login(data.token, data.userId);

        } catch (e) {
            console.log('loginHandler', e)
        }
    }

    return (
        <div>
            <h6>Auth Page</h6>
            <div className="row">
                <div className="col s6 offset-s3">
                    <h2>Сократи ссылку</h2>
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Авторизация</span>
                            <div>

                                <div className="input-field">
                                    <input
                                        placeholder="Введите email"
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={form.email}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        placeholder="Введите пароль"
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="password">Email</label>
                                </div>

                            </div>
                            <div className="card-action">
                                <div className="row">
                                    <div className="col s6">
                                        <button
                                            className="btn"
                                            disabled={loading}
                                            onClick={loginHandler}
                                        >
                                            Войти
                                        </button>
                                    </div>
                                    <div className="col s6">
                                        <button
                                            className="btn"
                                            disabled={loading}
                                            onClick={registerHandler}
                                        >
                                            Регистрация
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}