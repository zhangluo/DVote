"use client";
import { Button, Col, Row, Statistic, Card, Tabs, Table, Modal, InputNumber } from 'antd';
import { useState } from "react";
import type { TableProps, TabsProps } from 'antd';
// import LineChart from '@/components/LineChart';
import LineChart from '@/components/LineChart';

interface DataType {
  key: string;
  date: string;
  num: number;
  money: number;
}
interface DataType2 {
  key: string;
  candidater: string;
  num: number;
  money: number;
}

export default function CandidateInfo() {
  const [currentTab, setCurrentTab] = useState('1')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (user:any) => {
      setIsModalOpen(true);
    };
  
  const handleOk = () => {
  setIsModalOpen(false);
  };

  const handleCancel = () => {
  setIsModalOpen(false);
  };


  const columns: TableProps<DataType>['columns'] = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '投票数',
      dataIndex: 'num',
      key: 'num',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '捐款金额',
      dataIndex: 'money',
      key: 'money',
    },
  ];
  const columns2: TableProps<DataType2>['columns'] = [
    {
      title: '候选人',
      dataIndex: 'candidater',
      key: 'candidater',
    },
    {
      title: '总投票数',
      dataIndex: 'num',
      key: 'num'
    },
    {
      title: '总捐款金额',
      dataIndex: 'money',
      key: 'money',
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      date: '2024-10-2',
      num: 32,
      money: 667
    },
    {
      key: '2',
      date: '2024-10-2',
      num: 12,
      money: 1667
    },
    {
      key: '3',
      date: '2024-10-2',
      num: 3442,
      money: 6267
    },
  ];
  const data2: DataType2[] = [
    {
      key: '1',
      candidater: '韩立',
      num: 32,
      money: 667
    },
    {
      key: '2',
      candidater: '王林',
      num: 32,
      money: 1667
    },
    {
      key: '3',
      candidater: '陈平安',
      num: 3442,
      money: 6267
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
    setCurrentTab(key)
  };
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '我的数据',
    },
    {
      key: '2',
      label: '竞争对手数据',
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {currentTab === '1' ? 
      (
      <>
        <Card title="我的投票和捐款数">
          <Row gutter={16}>
              <Col span={12}>
                <Statistic title="总投票数" value={112893} />
              </Col>
              <Col span={12}>
                <Statistic title="总捐款金额" value={112893} precision={2} />
                <Button style={{ marginTop: 16 }} type="primary" onClick={showModal}>
                  提款
                </Button>
              </Col>
          </Row>
        </Card>
        <h2 style={{padding: '20px 0', fontSize: '16px', fontWeight: 'bold'}}>每天投票和捐款统计</h2>
        <Table<DataType> columns={columns} dataSource={data} />
        <LineChart />
        <Modal 
          title="提款"
          centered={true} 
          okText="确认提款" 
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

      </>
      ) :
      (
        <>
          <h2 style={{padding: '20px 0', fontSize: '16px', fontWeight: 'bold'}}>投票和捐款数据</h2>
          <Table<DataType2> columns={columns2} dataSource={data2} />
        </>
      )
    }
    
    </>
  )
}