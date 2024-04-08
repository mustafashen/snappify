'use client';
import { usePathname } from 'next/navigation';
import { customerReset } from './actions';
import { useState } from 'react';

export default function Reset({ domain }: { domain: string }) {
  const resetUrl = 'https://' + domain + usePathname();
  const [message, setMessage] = useState('');

  const handleReset = async (e: any) => {
    e.preventDefault();
    if (
      e.target[0].value !== '' &&
      e.target[1].value !== '' &&
      e.target[0].value === e.target[1].value
    ) {
      const res = await customerReset({
        password: e.target[0].value,
        resetUrl
      });
      if ('Error' in res) {
        setMessage(res.Error.message)
      }
    }
  };

  return (
    <>
      <form onSubmit={handleReset} className="card card-bordered mx-auto mt-24 w-96 bg-base-100">
        <div className="card-body gap-3">
          <h2 className="card-title">Reset account password</h2>
          <p>Enter a new password</p>
          <div>
            <label className="hidden" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="input input-primary"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="hidden" htmlFor="password">
              Password
            </label>
            <input
              id="re-password"
              className="input input-primary"
              type="password"
              placeholder="Repeat password"
            />
          </div>
          <div className="card-actions">
            <button type="submit" className="btn btn-primary">
              Reset password
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
