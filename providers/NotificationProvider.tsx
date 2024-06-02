import React, { createContext, useState, ReactNode, FC } from "react";
import NotificationBar from "@/components/NotificationBar";
import { useContext } from "react/index";

interface Notification {
  message: string;
  type: "error" | "success";
}

interface NotificationContextProps {
  setNotification: (message: string, type?: "error" | "success") => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  setNotification: () => {},
});

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (
    message: string,
    type: "error" | "success" = "error",
  ) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Auto-hide after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ setNotification: showNotification }}>
      {children}
      {notification && (
        <NotificationBar
          message={notification.message}
          type={notification.type}
        />
      )}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  const { setNotification } = useContext(NotificationContext);

  return { setNotification };
};

export { NotificationContext, NotificationProvider, useNotificationContext };
