"use client";

import React, { useState, useEffect } from "react";
import { Avatar, Space, Button, Modal, Select, Card, message, Spin, InputNumber } from 'antd';
// import { UserOutlined } from "@ant-design/icons";
import { config, ABIConfig, ABITokenConfig } from "@/config/wagmi/wagmiConfig";
import { writeContract, getAccount, readContract, waitForTransactionReceipt } from '@wagmi/core';
import "./list.scss";

const App: React.FC = () => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [candidateList, setCandidateList] = useState<ListType[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<ListType | null>(null);
  
  const [loading, setLoading] = React.useState<boolean>(false);
  const [donateValue, setDonateValue] = useState(0);
  const { connector } = getAccount(config);

  useEffect(() => {
    getALLCandidateList();
  }, []);

  type ListType = {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    voteCounts: bigint;
    donateAmounts: bigint;
    candidateAddress: string;
    isValid: boolean;
  };

  const getALLCandidateList = () => {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: "getAllCandidatorsByElection",
      args: [],
    })
      .then((result) => {
        console.log(result)
        const res = result as ListType[];
        setCandidateList(res); 
      })
      .catch((error) => {
        console.error("Errorsss:", error);
      });
  };

  const handleChange = (value: string) => {
    let sortedList = [...candidateList];
    if (value === "1") {
      // 按投票数降序排序
      sortedList.sort((a, b) => Number(b.voteCounts) - Number(a.voteCounts));
    } else if (value === "2") {
      // 按捐款数降序排序
      sortedList.sort((a, b) => Number(b.donateAmounts) - Number(a.donateAmounts));
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

  const doDOnate = (addr: string) => {
    if (currentCandidate) {
      console.log(addr,ABIConfig )
      writeContract(config,{
        address: ABIConfig.address,
        abi: ABIConfig.abi,
        functionName: 'donate',
        args: [
          BigInt(Number(currentCandidate?.id)),
          addr,
          BigInt(donateValue)
        ],
        connector
      }).then((TXHash) => {
        waitForTransactionReceipt(config, {
          hash: TXHash,
        }).then((result) => {
          if (result.status == 'success') {
            setLoading(false)
            message.success('捐款成功!');
            getALLCandidateList();
          }
        })
        .catch((error) => {
            console.error("error:", error); // 错误处理
        });
      })
      .catch((error) => {
          console.error("Error:", error); // 错误处理
          setLoading(false);
          message.error(`捐款失败`);
      });
    }
  }

  const handleDonate = () => {
    try {
      if (currentCandidate) {
        setLoading(true);
        CancelDonate();
        const _addr = currentCandidate.candidateAddress;
        writeContract(config,{
          address: ABITokenConfig.address,
          abi: ABITokenConfig.abi,
          functionName: 'approve',
          args: [
            ABIConfig.address,
            BigInt(donateValue)
          ],
          connector
        }).then((TXHash) => {
          waitForTransactionReceipt(config, {
            hash: TXHash,
          }).then((result) => {
            console.log(111111, result)
            if (result.status == 'success') {
              doDOnate(_addr);
            }
          })
          .catch((error) => {
              console.error("error:", error); // 错误处理
          });
        })
        .catch((error) => {
            console.error("Error:", error); // 错误处理
            setLoading(false);
            message.error(`捐款失败2222222:${error}`);
        });
      }
    } catch (error) {
      console.error("Contract Write Error:", error);
    }
  }

  // const handleDonate = () => {
  //   try {
  //     if (currentCandidate) {
  //       setLoading(true);
  //       CancelDonate();
  //       writeContract(config,{
  //         address: ABIConfig.address,
  //         abi: ABIConfig.abi,
  //         functionName: 'donate',
  //         args: [
  //           BigInt(Number(currentCandidate?.id)),
  //           currentCandidate.candidateAddress
  //         ],
  //         value: BigInt(donateValue), 
  //         connector
  //       }).then((TXHash) => {
  //         waitForTransactionReceipt(config, {
  //           hash: TXHash,
  //         }).then((result) => {
  //           if (result.status == 'success') {
  //             setLoading(false)
  //             message.success('捐款成功!');
  //             getALLCandidateList();
  //           }
  //         })
  //         .catch((error) => {
  //             console.error("error:", error); // 错误处理
  //         });
  //       })
  //       .catch((error) => {
  //           console.error("Error:", error); // 错误处理
  //           setLoading(false);
  //           message.error(`捐款失败:${error}`);
  //       });
  //     }
      
  //   } catch (error) {
  //     console.error("Contract Write Error:", error);
  //   }
  // }

  const doVote = (record?: ListType) => {
    try {
      if (record) {
        setLoading(true);
        writeContract(config,{
          address: ABIConfig.address,
          abi: ABIConfig.abi,
          functionName: 'vote',
          args: [
            BigInt(Number(record?.id)),
            record?.candidateAddress
          ],
          connector
        }).then((TXHash) => {
          waitForTransactionReceipt(config, {
            hash: TXHash,
          }).then((result) => {
            if (result.status == 'success') {
              setLoading(false)
              message.success('投票成功!');
              getALLCandidateList();
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
      }
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
          {candidateList.map((candidate,idx) => (
            <Card key={candidate.candidateAddress.toString() + idx} title={`候选人：${candidate.name}`}>
              <div className="candidate-info-wraps">
                <Avatar
                  size="large"
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                />
                <div className="infos">
                  <p>地址:  {candidate.candidateAddress.toString()}</p>
                  <p>投票数： {candidate.voteCounts.toString()}</p>
                  <p>捐款数： {candidate.donateAmounts.toString()} wei</p>
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
            title={'捐款给候选人：' + currentCandidate?.name} 
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
