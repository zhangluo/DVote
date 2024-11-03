'use client'; // 声明为客户端组件

import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, Input,Spin, message, Popconfirm,Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation'; // 使用新的 navigation 包
// import readDvoteContract from '@/hooks/readContract'
import { config, ABIConfig } from '@/config/wagmi/wagmiConfig';
import { writeContract, getAccount, readContract, waitForTransactionReceipt } from '@wagmi/core'
import {formatBigIntToDate} from '@/utils/formateDate';

interface DataType {
  names: string;
  ids: bigint;
  startTimes: bigint;
  endTimes: bigint;
  isValids: boolean;
}

const ElectionList: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidater, setCandidater] = useState('');
  const { connector } = getAccount(config)
  const [tableData, setTableData] =  useState<DataType[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleNavigate = (record: DataType) => {
    router.push(`/candidateList?name=${record.names}&id=${record.ids}`);
  };

  // const tsst = readDvoteContract();
  useEffect(()=> {
    getElections();
  }, [])

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'ids',
      key: 'ids',
      render: (id: bigint) => <a>{Number(id)}</a>,
    },
    {
      title: '选举名称',
      dataIndex: 'names',
      key: 'names',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'startTimes',
      key: 'startTimes',
      render:(startTimes: bigint)=> <span>{formatBigIntToDate(startTimes)}</span>
    },
    {
      title: '结束时间',
      dataIndex: 'endTimes',
      key: 'endTimes',
      render:(endTimes: bigint)=> <span>{formatBigIntToDate(endTimes)}</span>
    },
    {
      title: '状态',
      dataIndex: 'isValids',
      key: 'isValids',
      render:(isValids: boolean)=> <span>{isValids ? 
      <Tag color="success">正常</Tag> : <Tag color="error">已结束</Tag>}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: DataType) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleNavigate(record)}>
            详情
          </Button>
          <Popconfirm
            title="关闭选举"
            description="您确定要关闭该选举?"
            onConfirm={() => handleRemove(record.ids)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger disabled={!record.isValids}>关闭</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleRemove = (id: any) => {
    if (!id) return
    console.log(id)
    setLoading(true);
    writeContract(config,
      {
        address: ABIConfig.address,
        abi: ABIConfig.abi,
        functionName: 'removeElections',
        args: [[id]],
        connector
      },
    ).then((TXHash) => {
      waitForTransactionReceipt(config, {
        hash: TXHash,
      }).then((result) => {
        if (result.status == 'success') {
          setLoading(false);
          message.success('选举关闭成功！')
          getElections();
        }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
    })
    .catch((error) => {
        setLoading(false);
        message.error(`关闭失败${error}`)
    });
  }

  const getElections = ()=> {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: 'getAllElections',
      args: [], 
    }).then((result) => {
      console.log(1111, result)
       // 类型断言 result 为我们期望的结构
      const typedResult = result as [bigint[], string[], bigint[], bigint[], boolean[]];
      const res: Array<{ ids: bigint, names: string, startTimes: bigint, endTimes: bigint, isValids:boolean }> = [];
  
      if (result) {
        const length = typedResult[0].length;
    
        for (let i = 0; i < length; i++) {
          res.push({
            ids: typedResult[0][i], 
            names: typedResult[1][i],
            startTimes: typedResult[2][i],
            endTimes: typedResult[3][i],
            isValids: typedResult[4][i]
          });
        }
        setTableData(res)
      }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
  }
  const showModal = async() => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    setIsModalOpen(false);
    setLoading(true);
    try {
      writeContract(config,
        {
          address: ABIConfig.address,
          abi: ABIConfig.abi,
          functionName: 'createElection',
          args: [
            candidater,
            BigInt(30000),
          ],
          connector
        },
      ).then((TXHash) => {
        waitForTransactionReceipt(config, {
          hash: TXHash,
        }).then((result) => {
          if (result.status == 'success') {
            setLoading(false);
            getElections();
          }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
      })
      .catch((error) => {
          setLoading(false);
          message.error(`创建失败${error}`)
          console.error("Error:", error);
      });
    } catch (error) {
      console.error("Contract Write Error:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <Spin spinning={loading} tip="正在合约交互中，请耐心等待..." percent='auto'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 className="TableTitle">选举列表</h1>
          <Button type="primary" onClick={showModal}>创建选举</Button>
        </div>
        <Table<DataType> columns={columns} dataSource={tableData} />
      </Spin>
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

export default ElectionList;
