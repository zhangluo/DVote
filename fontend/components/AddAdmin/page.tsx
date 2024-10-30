import React, {useState} from 'react'
import { Button, Modal, Input,Spin, message } from 'antd';
import { config, ABIConfig } from '@/config/wagmi/wagmiConfig';
import { writeContract, getAccount, readContract, waitForTransactionReceipt } from '@wagmi/core'

const { connector } = getAccount(config)
export default function AddAmin() {
    const [adminAddr, setAdminAddr] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const showModal = async() => {
        setIsModalOpen(true);
    };
    const handleOk = async() => {
        setLoading(true);
        try {
        writeContract(config,
            {
            address: ABIConfig.address,
            abi: ABIConfig.abi,
            functionName: 'addAdmin',
            args: [
                adminAddr,
            ],
            connector
            },
        ).then((TXHash) => {
            console.log('新建完成，', TXHash);
            waitForTransactionReceipt(config, {
            hash: TXHash,
            }).then((result) => {
            console.log('waitForTransactionReceipt', result);
            if (result.status == 'success') {
                setLoading(false);
                setIsModalOpen(false);
                setAdminAddr('');
                message.success(`该用户：${adminAddr} 已成为管理员`);
            }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        })
        .catch((error) => {
            setLoading(false);
            message.error(`创建失败${error}`)
        });
        } catch (error) {
        console.error("Contract Write Error:", error);
        }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAdminAddr('')
  };
  return (
    <>
        <Button type="primary" onClick={showModal}>新增管理员</Button>
        <Modal 
            keyboard={false}
            maskClosable={false}
            closable={false}
            title="新增管理员"
            centered={true}
            okText="确定"
            cancelText="取消"
            open={isModalOpen}
            confirmLoading={loading}
            onOk={handleOk}
            onCancel={handleCancel}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '100px' }}>地址:</span>
            <Input placeholder="请输入钱包地址" value={adminAddr} onChange={(e) => setAdminAddr(e.target.value)} />
            </div>
        </Modal>
    </>
  )
}
