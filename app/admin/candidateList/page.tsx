'use client'; 
import React, { useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, Upload, message } from 'antd';
import type { FormProps, TableProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';

interface DataType {
  key: string;
  name: string;
  date: string;
  desc: string;
}

type FieldType = {
  username?: string;
  desc?: string;
};

const CandidateList: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'edit'>('new');
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);

  const searchParams = useSearchParams();
  const name = searchParams.get('name'); 
  const candidateId = searchParams.get('id'); 

  const showModal = (type: 'new' | 'edit', record?: DataType) => {
    setModalType(type);
    setIsModalOpen(true);
    if (type === 'edit' && record) {
      form.setFieldsValue({
        username: record.name,
        desc: record.desc,
      });
      setCurrentRecord(record);
    } else {
      form.resetFields();
      setCurrentRecord(null);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Process the form values here
      console.log('Form Values:', values);
      message.success('操作成功!');
      setIsModalOpen(false);
      // Update data source if needed
    } catch (err: any) {
      message.error('表单校验失败');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '候选人',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: DataType) => (
        <Space size="middle">
          <Button size="small" type="primary" onClick={() => showModal('edit', record)}>编辑</Button>
          <Button danger>删除</Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      date: '2024-10-2',
      name: "林动",
      desc: "这个是描述"
    },
    {
      key: '2',
      date: '2024-10-2',
      name: '消炎',
      desc: "这个是描述"
    },
    {
      key: '3',
      date: '2024-10-2',
      name: '叶凡',
      desc: "这个是描述"
    },
  ];

  const { TextArea } = Input;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ padding: '20px 0', fontSize: '16px', fontWeight: 'bold' }}>当前选举：{name}</h2>
        <Button type="primary" onClick={() => showModal('new')}>新增候选人</Button>
      </div>
      <Table<DataType> columns={columns} dataSource={data} />
      <Modal
        title={modalType === 'new' ? '新增候选人' : '编辑候选人'}
        centered={true}
        okText="确认"
        cancelText="取消"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="名称"
            name="username"
            rules={[{ required: true, message: '请输入候选人名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="头像" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item<FieldType> label="描述" name="desc" rules={[{ required: true, message: '请输入候选人描述' }]}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CandidateList;
