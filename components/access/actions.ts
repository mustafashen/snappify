'use server';

import {
  activateCustomer,
  createCustomer,
  createCustomerAccessToken,
  recoverCustomer,
  resetCustomer
} from 'lib/shopify';
import { validateEmail, validatePhone } from 'lib/utils';
import { cookies } from 'next/headers';

export async function customerRegister({
  email,
  password,
  firstName,
  lastName,
  phone,
  acceptsMarketing
}: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing?: boolean;
}) {
  try {
    if (!email?.trim() || !password?.trim() || !firstName?.trim() || !lastName?.trim()) {
      throw new Error('Missing required fields');
    }

    if (!validateEmail(email)) throw new Error('Invalid email address');
    if (phone && phone.trim() && !validatePhone(phone)) throw new Error('Invalid phone number')

    const payload = await createCustomer({
      email,
      password,
      firstName,
      lastName,
      phone,
      acceptsMarketing
    });

    if (payload) return payload;

    throw new Error('Failed to create customer');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}

export async function customerLogin({ email, password }: { email: string; password: string }) {
  try {
    if (!email.trim() || !password.trim()) {
      throw new Error('Missing required fields');
    }

    if (!validateEmail(email)) throw new Error('Invalid email address');
    
    const currentAccessToken = cookies().get('accessToken')?.value;

    if (!currentAccessToken) {

      const payload = await createCustomerAccessToken({ email, password });

      if (payload.accessToken) {
        cookies().set('accessToken', payload.accessToken);
        return payload;
      }
    }

    throw new Error('Failed to login customer');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}

export async function customerRecover({ email }: { email: string }) {
  try {
    if (!email.trim()) {
      throw new Error('Missing required fields');
    }

    const payload = await recoverCustomer({ email });

    if (payload) return payload;

    throw new Error('Failed to recover customer account');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}

export async function customerReset({
  password,
  resetUrl
}: {
  password: string;
  resetUrl: string;
}) {
  try {
    if (!password.trim() || !resetUrl.trim()) {
      throw new Error('Missing required fields');
    }

    const payload = await resetCustomer({ password, resetUrl });

    if (payload) return payload;

    throw new Error('Failed to reset customer account');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}

export async function customerActivate({
  password,
  activationUrl
}: {
  password: string;
  activationUrl: string;
}) {
  try {
    if (!password.trim() || !activationUrl.trim()) {
      throw new Error('Missing required fields');
    }

    const payload = await activateCustomer({ password, activationUrl });

    if (payload) return payload;

    throw new Error('Failed to activate customer');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { 
        Error: {
          message: error.message
        }
      };
    } else {
      return { 
        Error: {
          message: 'An unexpected error occurred'
        }
      };
    }
  }
}
