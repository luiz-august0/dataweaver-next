'use client';

import Login from '../../components/Login';

export default function Page({ params }: { params: { recoveryToken: string } }) {
  return <Login recoveryToken={params.recoveryToken} />;
}
