'use client'; // 声明为客户端组件

import React, { useState } from 'react';
import { Space, Table, Button, Modal, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation'; // 使用新的 navigation 包

interface DataType {
  key: string;
  name: string;
  date: string;
  id: number;
}

const AdminList: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidater, setCandidater] = useState('');

  const handleNavigate = (record: DataType) => {
    router.push(`/admin/candidateList?name=${record.name}&id=${record.id}`);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '选举名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: DataType) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={() => handleNavigate(record)}>
            管理候选人
          </Button>
          <Button danger={true}>删除</Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: '美国大选',
      id: 1,
      date: '2024-11-1',
    },
    {
      key: '2',
      name: '乌克兰大选',
      id: 2,
      date: '2024-12-1',
    },
    {
      key: '3',
      name: '以色列大选',
      id: 3,
      date: '2024-12-22',
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className="TableTitle">选举列表</h1>
        <Button type="primary" onClick={showModal}>创建选举</Button>
      </div>
      <Table<DataType> columns={columns} dataSource={data} />
      <Modal 
        title="创建新选举"
        centered={true}
        okText="创建选举"
        cancelText="取消"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ width: '100px' }}>新选举名称:</span>
          <Input placeholder="请输入选举名称" value={candidater} onChange={(e) => setCandidater(e.target.value)} />
        </div>
      </Modal>
    </>
  );
}

export default AdminList;
