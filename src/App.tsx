import React from 'react'
import { Card, Col, Row } from 'antd'
import { AppProvider } from './provider'
import { SearchComponent } from './components/Search'
import { UserListComponent } from './components/UserList'

const App: React.FC = () => {
  return (
    <AppProvider>
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <Card>
          <Row gutter={[16, 24]}>
            <Col span={24}>
              <SearchComponent />
            </Col>
            <Col span={24}>
              <UserListComponent />
            </Col>
          </Row>
        </Card>
      </div>
    </AppProvider>
  )
}

export default App
