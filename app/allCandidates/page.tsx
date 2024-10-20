"use client";

import React, { useState, useEffect } from "react";
import { Avatar, Space, Button, Modal, Select, Card, message, Spin, InputNumber } from 'antd';
// import { UserOutlined } from "@ant-design/icons";
import { config, ABIConfig } from "@/config/wagmi/wagmiConfig";
import { writeContract, getAccount, readContract, waitForTransactionReceipt } from '@wagmi/core';
import "./list.scss";

interface ListType {
  ids: bigint;
  names: string;
  imageUrls: string;
  voteCounts: bigint;
  donationAmounts: bigint;
  isValids: boolean;
  candidateAddresses: string;
  electionIds: bigint;
}

const App: React.FC = () => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [candidateList, setCandidateList] = useState<ListType[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<ListType | null>(null);
  
  const [loading, setLoading] = React.useState<boolean>(false);
  const [donateValue, setDonateValue] = useState(0);
  const { connector } = getAccount(config);

  useEffect(() => {
    getCandidateList();
  }, []);

  const getCandidateList = () => {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: "getAllCandidatorsByElection",
      args: [],
    })
      .then((result) => {
        const typedResult = result as [
          bigint[],
          string[],
          string[],
          bigint[],
          bigint[],
          boolean[],
          string[],
          bigint[],
        ];
        const res: Array<ListType> = [];
        if (result) {
          const length = typedResult[0].length;
          for (let i = 0; i < length; i++) {
            res.push({
              ids: typedResult[0][i],
              names: typedResult[1][i],
              imageUrls: typedResult[2][i],
              voteCounts: typedResult[3][i],
              donationAmounts: typedResult[4][i],
              isValids: typedResult[5][i],
              candidateAddresses: typedResult[6][i],
              electionIds: typedResult[7][i],
            });
          }
          setCandidateList(res);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (value: string) => {
    let sortedList = [...candidateList];
    if (value === "1") {
      // 按投票数降序排序
      sortedList.sort((a, b) => Number(b.voteCounts) - Number(a.voteCounts));
    } else if (value === "2") {
      // 按捐款数降序排序
      sortedList.sort((a, b) => Number(b.donationAmounts) - Number(a.donationAmounts));
    }
    setCandidateList(sortedList); // 更新候选人列表
  };

  const showDonateModal = (record?: ListType) => {
    setIsDonateModalOpen(true)
    if (record) {
        setCurrentCandidate(record);
    }
  }

  const CancelDonate = () => {
    setIsDonateModalOpen(false)
    setCurrentCandidate(null);
    setDonateValue(0);
  }

  const handleDonateChange = (value: number | null) => {
    if (value !== null) {
      setDonateValue(value);
    } else {
      setDonateValue(0);
    }
  }

  const handleDonate = () => {
    try {
      setLoading(true);
      CancelDonate();
      writeContract(config,{
        address: ABIConfig.address,
        abi: ABIConfig.abi,
        functionName: 'donate',
        args: [
          BigInt(Number(currentCandidate?.electionIds)),
          BigInt(Number(currentCandidate?.ids))
        ],
        value: BigInt(donateValue), 
        connector
      }).then((TXHash) => {
        waitForTransactionReceipt(config, {
          hash: TXHash,
        }).then((result) => {
          if (result.status == 'success') {
            setLoading(false)
            message.success('捐款成功!');
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
          message.error(`捐款失败:${error}`);
      });
    } catch (error) {
      console.error("Contract Write Error:", error);
    }
  }

  const doVote = (record?: ListType) => {
    if (record) {
      setCurrentCandidate(record);
    }
    try {
      setLoading(true);
      writeContract(config,{
        address: ABIConfig.address,
        abi: ABIConfig.abi,
        functionName: 'vote',
        args: [
          BigInt(Number(currentCandidate?.electionIds)),
          BigInt(Number(currentCandidate?.ids))
        ],
        connector
      }).then((TXHash) => {
        waitForTransactionReceipt(config, {
          hash: TXHash,
        }).then((result) => {
          if (result.status == 'success') {
            setLoading(false)
            message.success('投票成功!');
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
          message.error('您已投票，请勿重复投票!');
      });
    } catch (error) {
      console.error("Contract Write Error:", error);
    }
  }

  return (
    <>
      <h1 className="TableTitle">候选人列表</h1>
      <Spin spinning={loading} tip="正在交互中，请耐心等待..." percent='auto'>
        <Space direction="vertical" style={{ display: "flex" }}>
          <div className="sortWrap">
            <span>排序方式：</span>
            <Select
              defaultValue="1"
              style={{ width: 240 }}
              onChange={handleChange}
              options={[
                { value: "1", label: "按投票数排序" },
                { value: "2", label: "按捐款数排序" },
              ]}
            />
          </div>

          {/* 动态渲染候选人列表 */}
          {candidateList.map((candidate) => (
            <Card key={candidate.ids.toString()} title={`候选人：${candidate.names}`}>
              <div className="candidate-info-wraps">
                <Avatar
                  size="large"
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                />
                <div className="infos">
                  <p>选举ID {candidate.electionIds}</p>
                  <p>投票数： {candidate.voteCounts.toString()}</p>
                  <p>捐款数： {candidate.donationAmounts.toString()} wei</p>
                </div>
                <div className="actions">
                  <Button type="primary" onClick={() => doVote(candidate)}>投票</Button>
                  <Button
                    type="primary"
                    className="custom-success"
                    onClick={() => showDonateModal(candidate)}
                  >
                    捐款
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* 捐款模态框 */}
          <Modal 
            title={'捐款给候选人：' + currentCandidate?.names} 
            centered={true} 
            okText="确认捐款" 
            cancelText="取消"
            open={isDonateModalOpen}
            width={320}
            onOk={handleDonate}
            onCancel={CancelDonate}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{width: '80px'}}>捐款金额:</span>
              <InputNumber suffix="wei" style={{ width: '100%' }} value={donateValue} autoFocus onChange={handleDonateChange}/>
            </div>
          </Modal>
        </Space>
      </Spin>
    </>
  );
};

export default App;
