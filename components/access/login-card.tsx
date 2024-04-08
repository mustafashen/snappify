'use client';
import React, { FormEvent, ReactElement, useState } from 'react';
import { customerLogin } from './actions';

export default function LoginCard({ switchRecover }: { switchRecover: ReactElement }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const res = await customerLogin({ ...loginData });
    if ('Error' in res) {
      setMessage(res.Error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleLogin} className="card bg-base-100">
        <div className="card-body px-0">
          <h2 className="card-title">Login</h2>
          <p>Login to your account</p>
          <div>
            <label className="hidden" htmlFor="email">
              Email
            </label>
            <input
              onInput={handleChange}
              value={loginData.email}
              id="email"
              className="input input-primary"
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div>
            <label className="hidden" htmlFor="password">
              Password
            </label>
            <input
              onInput={handleChange}
              value={loginData.password}
              id="password"
              className="input input-primary"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="card-actions flex-col flex-nowrap">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
            {switchRecover}
          </div>
        </div>
      </form>
      {
        message ? (
          <div className="toast toast-center">
            <div className="alert alert-error">
              <span>{message}</span>
            </div>
          </div>
        ) : null
      }
    </>
  );
}
