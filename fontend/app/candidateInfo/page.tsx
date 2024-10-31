"use client";
import { Button, Col, Row, Statistic, Card, Tabs, Table, Modal, InputNumber, Select,Spin,message } from 'antd';
import { useState,useEffect, SetStateAction } from "react";
import type { TableProps, TabsProps } from 'antd';
// import LineChart from '@/components/LineChart';
import LineChart from '@/components/LineChart';
import { useAccount } from 'wagmi';
import { config, ABIConfig } from '@/config/wagmi/wagmiConfig';
import { writeContract, getAccount, readContract, waitForTransactionReceipt } from '@wagmi/core'

interface DataType {
  date: string;
  num: number;
  money: number;
}

interface DataType2 {
  id: BigInt;
  name: string;
  donationAmount: BigInt;
  voteCount: BigInt;
}
interface selctOptions {
  label: string;
  value: number;
}
interface DataType3 {
  id: bigint;
  name: string;
  description: string;
  imageUrl: string;
  voteCount: bigint;
  donationAmount: bigint;
  candidateAddress: string;
  isValid: boolean;
}

export default function CandidateInfo() {
  const [currentTab, setCurrentTab] = useState('1')
  const [currentElection, setCurrentElection] = useState(BigInt(1))
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [electionList, setElectionList] =  useState<selctOptions[]>();
  const [myData, setMyData] =  useState<DataType3>();
  const [competitorsData, setCompetitorsData] =  useState<DataType2[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();
  const [donateValue, setDonateValue] = useState(0);

  const { connector } = getAccount(config);
  const showModal = (user:any) => {
    setIsModalOpen(true);
  };

  useEffect(()=> {
    getElections();
  }, [])

  useEffect(()=> {
    getCandidateList();
  }, [currentElection])

  const getElections = ()=> {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: 'getAllElections',
      args: [], 
    }).then((result) => {
        // 类型断言 result 为期望的结构
      const typedResult = result as [bigint[], string[], bigint[], bigint[]];
      const res: Array<{ value: number, label: string }> = [];
  
      if (result) {
        const length = typedResult[0].length;
    
        for (let i = 0; i < length; i++) {
          res.push({
            value: Number(typedResult[0][i]), 
            label: typedResult[1][i]
          });
        }
        setCurrentElection(BigInt(res[0].value))
        setElectionList(res)
      }
    })
    .catch((error) => {
        console.error("Errors:", error);
    });
  }
  const getCandidateList= () => {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: 'getCandidates',
      args: [
        currentElection
      ]
    },).then((result) => {
      const res = result as DataType3[];
      const competitors_data: SetStateAction<DataType2[] | undefined> = [];
      console.log(res)
      setMyData(undefined) // 重置myData数据
      res.forEach(item => {
        if (item.candidateAddress == address) {
          setMyData(item)
          console.log(myData)
        } else {
          const {id,name,voteCount,donationAmount} = item;
          competitors_data.push({id, name, voteCount, donationAmount})
        }
      })
      setCompetitorsData(competitors_data);
    })
    .catch((error) => {
        console.error("Error:", error); // 错误处理
    });
  }
  const doWithDraw = () => {
    writeContract(config,{
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: 'withdraw',
      args: [
        currentElection,
        BigInt(donateValue)
      ],
      connector
    }).then((TXHash) => {
      waitForTransactionReceipt(config, {
        hash: TXHash,
      }).then((result) => {
        if (result.status == 'success') {
          setLoading(false)
          message.success('提款成功!');
          getCandidateList();
        }
      })
      .catch((error) => {
          console.error("error:", error); // 错误处理
      });
    })
    .catch((error) => {
        console.error("Error:", error); // 错误处理
        setLoading(false);
        message.error(`提款失败`);
    });
  }
  const handleDonateChange = (value: number | null) => {
    if (value !== null) {
    setDonateValue(value);
    } else {
      setDonateValue(0);
    }
  }
  const handleOk = () => {
    setIsModalOpen(false);
    setLoading(true);
    doWithDraw();
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: bigint) => <a>{Number(id)}</a>,
    },
    {
      title: '候选人',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '投票数',
      dataIndex: 'voteCount',
      key: 'voteCount',
      render:(voteCount: bigint)=> <span>{Number(voteCount)}</span>
    },
    {
      title: '捐款数(Wei)',
      dataIndex: 'donationAmount',
      key: 'donationAmount',
      render:(donationAmount: bigint)=> <span>{Number(donationAmount)}</span>
    },
  ];
  
  const data: DataType[] = [
    {
      date: '2024-10-2',
      num: 32,
      money: 667
    },
    {
      date: '2024-10-2',
      num: 12,
      money: 1667
    },
    {
      date: '2024-10-2',
      num: 3442,
      money: 6267
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
    setCurrentTab(key)
  };

  const handleElectionChange = (value: number) => {
    setCurrentElection(BigInt(value)); // 更新候选人列表
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
     <Spin spinning={loading} tip="正在交互中，请耐心等待..." percent='auto'>
      <div className="sortWrap">
        <span>当前选举：</span>
        <Select
          defaultValue={Number(currentElection)}
          style={{ width: 240 }}
          onChange={handleElectionChange}
          options={electionList}
        />
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      {currentTab === '1' ? 
        (
          myData ?  
        <>
          <Card title="我的投票和捐款数">
            <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="总投票数" value={Number(myData?.voteCount)} />
                </Col>
                <Col span={12}>
                  <Statistic title="总捐款金额" value={Number(myData?.donationAmount)} precision={0} />
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
                <InputNumber 
                suffix="wei" 
                style={{ width: '100%' }} 
                value={donateValue} 
                autoFocus 
                onChange={handleDonateChange}/>
            </div>
          </Modal>

        </> : <h2 style={{textAlign: 'center', marginTop: '200px'}}>您未参加当前竞选，暂无候选数据</h2>
        ) :
        (
          <>
            <h2 style={{padding: '20px 0', fontSize: '16px', fontWeight: 'bold'}}>投票和捐款数据</h2>
            <Table<DataType2> columns={columns2} dataSource={competitorsData} />
          </>
        )
      }
      </Spin>
    
    </>
  )
}