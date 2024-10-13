import React, { useState }from 'react';
import { Card, Space, Avatar, Button,Select,Modal,InputNumber} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './list.scss'

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [candidater, setCandidater] = useState('');

    const handleChange = (value: any) => {
        console.log(1111111111111111, value)
    }
    const showModal = (user:any) => {
        setCandidater(user);
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            <div className="sortWrap">
                <span>排序方式：</span>
                <Select
                    defaultValue="1"
                    style={{ width: 240 }}
                    onChange={handleChange}
                    options={[
                        { value: '1', label: '按投票数排序' },
                        { value: '2', label: '按捐款数排序' },
                    ]}
                    />
            </div>
            <Card title="候选人张三">
                <div className="candidate-info-wraps">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div className="infos">
                        <p>简介： 这是一简介</p>
                        <p>投票数： 100</p>
                        <p>捐款数： $4000</p>
                    </div>
                    <div className='actions'>
                        <Button type="primary">投票</Button>
                        <Button type="primary" className="custom-success" onClick={()=> showModal('张三')}>捐款</Button>
                    </div>
                </div>
            </Card>
            <Card title="候选人张三">
                <div className="candidate-info-wraps">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div className="infos">
                        <p>简介： 这是一简介</p>
                        <p>投票数： 100</p>
                        <p>捐款数： $4000</p>
                    </div>
                    <div className='actions'>
                        <Button type="primary">投票</Button>
                        <Button type="primary" className="custom-success">捐款</Button>
                    </div>
                </div>
            </Card>
            <Card title="候选人张三">
                <div className="candidate-info-wraps">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div className="infos">
                        <p>简介： 这是一简介</p>
                        <p>投票数： 100</p>
                        <p>捐款数： $4000</p>
                    </div>
                    <div className='actions'>
                        <Button type="primary">投票</Button>
                        <Button type="primary" className="custom-success">捐款</Button>
                    </div>
                </div>
            </Card>
            <Card title="候选人张三">
                <div className="candidate-info-wraps">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div className="infos">
                        <p>简介： 这是一简介</p>
                        <p>投票数： 100</p>
                        <p>捐款数： $4000</p>
                    </div>
                    <div className='actions'>
                        <Button type="primary">投票</Button>
                        <Button type="primary" className="custom-success">捐款</Button>
                    </div>
                </div>
            </Card>
            <Modal 
                title={'捐款给候选人：' +candidater} 
                centered={true} 
                okText="确认捐款" 
                cancelText="取消"
                open={isModalOpen}
                width={320} 
                onOk={handleOk} 
                onCancel={handleCancel}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{width: '80px'}}>捐款金额:</span>
                    <InputNumber suffix="wei" style={{ width: '100%' }} />
                </div>
            </Modal>
        </Space>
    )
};

export default App;