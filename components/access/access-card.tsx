'use client';
import { Tab } from '@headlessui/react';
import LoginCard from 'components/access/login-card';
import RegisterCard from 'components/access/register-card';
import React, { useState } from 'react';
import RecoverCard from './recover-card';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function AccessCard() {
  const [recoverView, setRecoverView] = useState(false);

  const returnLogin = (
    <button className="btn btn-link pl-0" onClick={() => setRecoverView(false)}>
      <ChevronLeftIcon className="h-5 w-5" />
      Return to Login
    </button>
  );
  const switchRecover = (
    <button className="btn btn-link pl-0" onClick={() => setRecoverView(true)}>
      Forgot Password?
    </button>
  );
  return (
    <div className="flex h-[80vh] animate-fade-up items-center justify-center overflow-visible">
      <div className="card card-bordered w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <Tab.Group>
            <Tab.List className="tabs-boxed tabs flex justify-center *:flex-grow">
              <Tab value="login" className={`tab ui-selected:tab-active`}>
                Login
              </Tab>
              <Tab value="register" className={`tab ui-selected:tab-active`}>
                Register
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {recoverView ? (
                  <RecoverCard returnLogin={returnLogin} />
                ) : (
                  <LoginCard switchRecover={switchRecover} />
                )}
              </Tab.Panel>
              <Tab.Panel>
                <RegisterCard />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
