import { useAppContext } from '../context'
import { StarOutlined } from '@ant-design/icons'
import { Card, Col, Collapse, Flex, List, Row, Space, Typography } from 'antd'

const { Panel } = Collapse
const { Title, Text } = Typography

export const UserListComponent: React.FC = () => {
  const { users, fetchRepositories, repositories, listLoading } = useAppContext()

  const handlePanelChange = (keys: string | string[]) => {
    const activeKey = Array.isArray(keys) ? keys[0] : keys
    if (activeKey) {
      fetchRepositories(activeKey)
    }
  }

  const redirectUrl = (url: string) => {
    window.open(url, '_blank');
  }

  return (
    <Row gutter={16}>
      <Col span={24}>
        {users.length > 0 && (
          <Collapse accordion onChange={handlePanelChange} expandIconPosition='end'>
            {users.map((user) => (
              <Panel header={user.login} key={user.login}>
                <List
                  loading={listLoading}
                  dataSource={repositories[user.login] || []}
                  renderItem={(repo) => (
                    <Card style={{ marginBottom: 10 }} styles={{ body: { padding: 12 } }} hoverable onClick={() => redirectUrl(repo.html_url)}>
                      <Row gutter={[16, 8]} align='middle'>
                        <Col span={24}>
                          <Flex justify='space-between' align='center'>
                            <Title level={5} style={{ margin: 0 }}>{repo.name}</Title>
                            <Space>
                              <StarOutlined />
                              <Text>{repo.stargazers_count}</Text>
                            </Space>
                          </Flex>
                        </Col>
                        <Col span={24}>
                          <Text>{repo.description || 'No description'}</Text>
                        </Col>
                      </Row>
                    </Card>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        )}
      </Col>
    </Row>
  )
}