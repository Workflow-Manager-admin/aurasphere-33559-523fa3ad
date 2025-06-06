import React, { createContext, useContext } from "react";

// PUBLIC_INTERFACE
/**
 * NotificationsContext provides stub logic for notification queue (future implementation).
 */
export const NotificationsContext = createContext({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

export function useNotifications() {
  return useContext(NotificationsContext);
}

// PUBLIC_INTERFACE
export function NotificationsProvider({ children }) {
  // Stub context, real time logic will go here later
  const notificationsStubValue = {
    notifications: [],
    addNotification: () => {},
    removeNotification: () => {},
  };

  return (
    <NotificationsContext.Provider value={notificationsStubValue}>
      {children}
    </NotificationsContext.Provider>
  );
}
