import { createContext, useMemo, useState } from 'react';

export const SessionContext = createContext(null);

export default function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const session = useMemo(() => ({ user, setUser }), [user]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
