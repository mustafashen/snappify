'use client';
import React, { FormEvent, useState } from 'react';
import { customerRegister } from './actions';

export default function RegisterCard() {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [message, setMessage] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await customerRegister(registerData);

    if ('Error' in res) {
      setMessage(res.Error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleLogin} className="card bg-base-100">
        <div className="card-body px-0">
          <h2 className="card-title">Register</h2>
          <p>Create a new account</p>
          <div>
            <label className="hidden" htmlFor="email">
              Email
            </label>
            <input
              onInput={handleChange}
              value={registerData.email}
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
              value={registerData.password}
              id="password"
              className="input input-primary"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="hidden" htmlFor="firstName">
              First name
            </label>
            <input
              onInput={handleChange}
              value={registerData.firstName}
              id="firstName"
              className="input input-primary"
              type="text"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="hidden" htmlFor="lastName">
              Last name
            </label>
            <input
              onInput={handleChange}
              value={registerData.lastName}
              id="lastName"
              className="input input-primary"
              type="text"
              placeholder="Last name"
            />
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" type="submit">
              Create Account
            </button>
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
