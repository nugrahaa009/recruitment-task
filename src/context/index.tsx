import { User } from "../types/user.type";
import { Repository } from "../types/repo.type";
import { createContext, useContext } from "react";

interface AppContextType {
  users: User[];
  repositories: Record<string, Repository[]>;
  listLoading: boolean;
  showingResult: string;
  isShowingResult: boolean;
  buttonLoading: boolean;
  fetchUsers: (username: string) => void;
  fetchRepositories: (username: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}