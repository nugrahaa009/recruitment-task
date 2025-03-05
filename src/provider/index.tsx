import axios from 'axios'
import { useState } from 'react'
import { AppContext } from '../context'
import { User } from '../types/user.type'
import { Repository } from '../types/repo.type'

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([])
  const [repositories, setRepositories] = useState<Record<string, Repository[]>>({})
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [listLoading, setListLoading] = useState<boolean>(false)
  const [isShowingResult, seIsShowingResult] = useState<boolean>(false)
  const [showingResult, setShowingResult] = useState<string>('')

  const fetchUsers = async (query: string) => {
    setShowingResult(query)
    setButtonLoading(true)
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=5`)
      setUsers(response.data.items)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      seIsShowingResult(true)
      setButtonLoading(false)
    }
  }

  const fetchRepositories = async (username: string) => {
    setListLoading(true)
    try {
      const { data } = await axios.get(`https://api.github.com/users/${username}/repos`)
      setRepositories((prev) => ({ ...prev, [username]: data }))
    } catch (error) {
      console.error('Failed to fetch repositories', error)
    } finally {
      setListLoading(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        users,
        repositories,
        listLoading,
        fetchUsers,
        fetchRepositories,
        buttonLoading,
        showingResult,
        isShowingResult
      }}>
      {children}
    </AppContext.Provider>
  )
}