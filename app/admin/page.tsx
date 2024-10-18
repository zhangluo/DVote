'use client'; // 声明为客户端组件

import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Modal, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation'; // 使用新的 navigation 包
import { useAccount } from 'wagmi'
import { abi } from '@/config/contract/abi';
// import readDvoteContract from '@/hooks/readContract'
import { config } from '@/config/wagmi/wagmiConfig';
import { writeContract, getAccount, readContract, waitForTransactionReceipt } from '@wagmi/core'
import {formatBigIntToDate} from '@/utils/formateDate'

interface DataType {
  names: string;
  ids: bigint;
  startTimes: bigint;
  endTimes: bigint;
}

const AdminList: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidater, setCandidater] = useState('');
  // const { writeContract } = useWriteContract()
  const { isConnected } = useAccount();
  const { connector } = getAccount(config)
  const [tableData, setTableData] =  useState<DataType[]>();
  const handleNavigate = (record: DataType) => {
    router.push(`/admin/candidateList?name=${record.names}&id=${record.ids}`);
  };

  // const tsst = readDvoteContract();
  useEffect(()=> {
    // readContract(config, {
    //   address: '0x9377a0a10d924b263cb39c37a49b107ecbca42fb',
    //   abi,
    //   functionName: 'getElectionInfo',
    //   args: [
    //     BigInt(1)
    //   ]
    // },).then((result) => {
    //   console.log(result); // 输出: 数据加载完成!
    // })
    // .catch((error) => {
    //     console.error("Error:", error); // 错误处理
    // });

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
  
  const getElections = ()=> {
    readContract(config, {
      address: '0x1C5b9151EA31D9cD4B7d33a0BB0d976Fd9b0d937',
      abi,
      functionName: 'getAllElections',
    }).then((result) => {
      const res: Array<{ ids: bigint, names: string, startTimes: bigint, endTimes: bigint }> = [];
  
      const length = result[0].length;
    
      for (let i = 0; i < length; i++) {
        res.push({
          ids: result[0][i],          // ids 来自第一个子数组
          names: result[1][i],        // names 来自第二个子数组
          startTimes: result[2][i],   // startTimes 来自第三个子数组
          endTimes: result[3][i]      // endTimes 来自第四个子数组
        });
      }
      setTableData(res)
      // 输出结果
      console.log(res);
    })
    .catch((error) => {
        console.error("Error:", error); // 错误处理
    });
  }
  const showModal = async() => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    if (!isConnected) {
      console.error("Wallet is not connected.");
      return;
    }else {
      console.error("Wallet is connected.");
    }
    setIsModalOpen(false);
    try {
      writeContract(config,
        {
          abi,
          address: '0x1C5b9151EA31D9cD4B7d33a0BB0d976Fd9b0d937',
          functionName: 'createElection',
          args: [
            candidater,
            BigInt(10),
          ],
          account: '0x2a73fdB455dA07d01E9B3125971451f0CC361eaE',
          connector
        },
      ).then((TXHash) => {
        console.log('新建完成，', TXHash); // 输出: 数据加载完成!
        waitForTransactionReceipt(config, {
          hash: TXHash,
        }).then((result) => {
          console.log('waitForTransactionReceipt', result);
          if (result.status == 'success') {
            getElections();
          }
        })
        .catch((error) => {
            console.error("Error3333:", error); // 错误处理
        });
      })
      .catch((error) => {
          console.error("Error:", error); // 错误处理
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 className="TableTitle">选举列表</h1>
        <Button type="primary" onClick={showModal}>创建选举</Button>
      </div>
      <Table<DataType> columns={columns} dataSource={tableData} />
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
