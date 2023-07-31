import * as React from "react";
import { awareness } from "../store";

export function useUser() {
  const [user, setUser] = React.useState();

  // Set the initial user's state
  React.useEffect(() => {
    awareness.setLocalState({});
    setUser(awareness.getLocalState());
  }, []);

  const updateUserPoint = React.useCallback((id, user) => {
    awareness.setLocalStateField("tdUser", user);
    awareness.setLocalStateField("id", id);
    setUser(awareness.getLocalState());
  }, []);

  return { user, updateUserPoint };
}
