import { useState } from 'react'
import { useAppContext } from '../context'
import { Button, Col, Input, Row, Typography } from 'antd'

const { Text } = Typography

export const SearchComponent: React.FC = () => {
  const [username, setUsername] = useState('')

  const { fetchUsers, buttonLoading, isShowingResult, showingResult } = useAppContext()

  const handleSearch = () => {
    if (username.trim()) {
      fetchUsers(username)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Row gutter={[16, 8]}>
      <Col span={24}>
        <Input
          size='large'
          value={username}
          onKeyPress={handleKeyPress}
          placeholder='Enter username'
          onChange={(e) => setUsername(e.target.value)}
        />
      </Col>
      <Col span={24}>
        <Button
          block
          size='large'
          type='primary'
          disabled={!username}
          onClick={handleSearch}
          loading={buttonLoading}
        >
          Search
        </Button>
      </Col>
      {isShowingResult && (
        <Col span={24}>
          <Text type='secondary'>{`Showing users for "${showingResult}"`}</Text>
        </Col>
      )}
    </Row>
  )
}