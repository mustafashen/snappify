'use client';

import { ReactElement, useState } from 'react';
import { customerRecover } from './actions';

export default function RecoverCard({ returnLogin }: { returnLogin: ReactElement }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRecover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await customerRecover({ email });
    if ('Error' in res) {
      //@ts-ignore
      setMessage(res.Error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleRecover} className="card bg-base-100">
        <div className="card-body px-0">
          <h2 className="card-title">Recover Account</h2>
          <p>Enter email address for password change</p>
          <div>
            <label className="hidden" htmlFor="email">
              Email
            </label>
            <input
              onInput={handleChange}
              value={email}
              id="email"
              className="input input-primary"
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className="card-actions flex-col flex-nowrap">
            <button className="btn btn-primary" type="submit">
              Send
            </button>
            {returnLogin}
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
