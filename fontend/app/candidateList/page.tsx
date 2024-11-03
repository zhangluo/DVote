'use client'; 
import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input, Upload, message, Spin, InputNumber } from 'antd';
import type { TableProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { config, ABIConfig, ABITokenConfig} from '@/config/wagmi/wagmiConfig';
import { writeContract, getAccount, readContract, waitForTransactionReceipt } from '@wagmi/core';

interface DataType {
  id: bigint;
  name: string;
  description: string;
  imageUrl: string;
  voteCounts: bigint;
  donateAmounts: bigint;
  candidateAddress: string;
  isValid: boolean;
}

type FieldType = {
  username?: string;
  addr?: string;
  desc?: string;
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [tableData, setTableData] =  useState<DataType[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [donateValue, setDonateValue] = useState(0);
  
  const [form] = Form.useForm();
  const { connector } = getAccount(config);
  const searchParams = useSearchParams();
  const name = searchParams.get('name'); 
  const electionId = searchParams.get('id'); 
  const router = useRouter();

  useEffect(()=> {
    getCandidateList();
  }, [])

  const getCandidateList= () => {
    readContract(config, {
      address: ABIConfig.address,
      abi: ABIConfig.abi,
      functionName: 'getCandidates',
      args: [
        BigInt(Number(electionId))
      ]
    },).then((result) => {
      const res = result as DataType[];
      console.log(result)
      setTableData(res);
    })
    .catch((error) => {
        console.error("Error:", error); // 错误处理
    });
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsModalOpen(false);
      setLoading(true);
      if (values) {
        try {
          writeContract(config,
            {
              address: ABIConfig.address,
              abi: ABIConfig.abi,
              functionName: 'addCandidator',
              args: [
                BigInt(Number(electionId)),
                values.username,
                values.desc,
                '',
                values.addr
              ],
              connector
            },
          ).then((TXHash) => {
            waitForTransactionReceipt(config, {
              hash: TXHash,
            }).then((result) => {
              if (result.status == 'success') {
                message.success('操作成功!');
                setIsModalOpen(false);
                setLoading(false);
                getCandidateList();
              }
            })
            .catch((error) => {
                console.error("error:", error);
            });
          })
          .catch((error) => {
              console.error("Error:", error);
          });
        } catch (error) {
          console.error("Contract Write Error:", error);
        }
      }
      
    // @typescript-eslint/no-unused-vars
    } catch (err) {
      message.error('表单校验失败');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const doVote = (addr: string) => {
    try {
      setLoading(true);
      writeContract(config,{
        address: ABIConfig.address,
        abi: ABIConfig.abi,
        functionName: 'vote',
        args: [
          BigInt(Number(electionId)),
          addr,
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

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
      setCurrentRecord(null);
  };

  const showDonateModal = (record?: DataType) => {
    setIsDonateModalOpen(true)
    if (record) {
      setCurrentRecord(record);
    }
  }
  const CancelDonate = () => {
    setIsDonateModalOpen(false)
    setCurrentRecord(null);
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
    if (currentRecord) {
      console.log(addr)
      writeContract(config,{
        address: ABIConfig.address,
        abi: ABIConfig.abi,
        functionName: 'donate',
        args: [
          BigInt(Number(electionId)),
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
          message.error(`捐款失败`);
      });
    }
  }

  const handleDonate = () => {
    try {
      if (currentRecord) {
        setLoading(true);
        CancelDonate();
        const _addr = currentRecord.candidateAddress;
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
            message.error(`捐款失败:${error}`);
        });
      }
    } catch (error) {
      console.error("Contract Write Error:", error);
    }
  }

  const columns: TableProps<DataType>['columns'] = [
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
      title: '地址',
      dataIndex: 'candidateAddress',
      key: 'candidateAddress',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '投票数',
      dataIndex: 'voteCounts',
      key: 'voteCounts',
      render:(voteCounts: bigint)=> <span>{Number(voteCounts)}</span>
    },
    {
      title: '捐款数(Wei)',
      dataIndex: 'donateAmounts',
      key: 'donateAmounts',
      render:(donateAmounts: bigint)=> <span>{Number(donateAmounts)}</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: DataType) => (
        <Space size="middle">
          {/* <Button size="small" type="primary" onClick={() => showModal('edit', record)}>编辑</Button> */}
          <Button type="primary" onClick={() => doVote(record.candidateAddress)}>投票</Button>
          <Button type="primary" className="bg-green-500 hover:!bg-green-600" onClick={() => showDonateModal(record)}>捐款</Button>
        </Space>
      ),
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
      <Spin spinning={loading} tip="正在交互中，请耐心等待..." percent='auto'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ padding: '20px 0', fontSize: '16px', fontWeight: 'bold' }}>当前选举：{name}</h2>
          <div >
            <Button style={{marginRight: '25px'}} type="default" onClick={() => router.back()}>返回</Button>
            <Button type="primary" onClick={showModal}>新增候选人</Button>
          </div>
        </div>
        <Table<DataType> columns={columns} dataSource={tableData} />
          
        <Modal
          title="新增候选人"
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
            <Form.Item<FieldType>
              label="地址"
              name="addr"
              rules={[{ required: true, message: '请输入钱包地址' }]}
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

        <Modal 
          title={'捐款给候选人：' + currentRecord?.name} 
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
      </Spin>
    </div>
  );
};
