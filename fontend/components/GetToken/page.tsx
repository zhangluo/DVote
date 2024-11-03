'use client'; 
import React, {useState} from 'react';
import { notification, Button, message, ConfigProvider,Modal,Form, InputNumber, Input } from 'antd';
import { config, ABIConfig, ABITokenConfig} from '@/config/wagmi/wagmiConfig';
import { writeContract, getAccount, waitForTransactionReceipt } from '@wagmi/core';
import { SendOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        border-width: 0;
  
        > span {
          position: relative;
        }
  
        &::before {
          content: '';
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }
  
        &:hover::before {
          opacity: 0;
        }
      }
    `,
}));
type FieldType = {
    num?: number;
    addr?: string;
  };
const GetTokenBtn: React.FC = () => {
    const { styles } = useStyle();
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { connector, address } = getAccount(config);
    const [api, contextHolder] = notification.useNotification();
    
    const openNotification = (type: 'success') => {
        api[type]({
            message: `代币发送成功`,
            description: `代币合约地址：${ABITokenConfig.address}`,
        });
    };
    
    const getToken = async() => {
        const values = await form.validateFields();
        if (!values) {
            return 
        }
        console.log(address)
        writeContract(config,{
            address: ABITokenConfig.address,
            abi: ABITokenConfig.abi,
            functionName: 'transfer',
            args: [
                values.addr,
                BigInt(values.num * 1000000000000000000)
            ],
            connector
          }).then((TXHash) => {
            waitForTransactionReceipt(config, {
              hash: TXHash,
            }).then((result) => {
              if (result.status == 'success') {
                setLoading(false)
                openNotification('success')
              }
            })
            .catch((error) => {
                console.error("error:", error); // 错误处理
            });
          })
          .catch((error: any) => {
              console.error("Error:", error); // 错误处理
              setLoading(false);
              message.error(`获取失败`);
          });
    }

    const handleGetToken = async() => {
        const values = await form.validateFields();
        if (!values) {
            return 
        }
        setLoading(true)
        setIsModalOpen(false)
        writeContract(config,{
            address: ABITokenConfig.address,
            abi: ABITokenConfig.abi,
            functionName: 'approve',
            args: [
              ABIConfig.address,
              BigInt(values.num * 1000000000000000000)
            ],
            connector
          }).then((TXHash) => {
            waitForTransactionReceipt(config, {
              hash: TXHash,
            }).then((result) => {
              if (result.status == 'success') {
                getToken();
              }
            })
            .catch((error) => {
                console.error("error:", error); // 错误处理
            });
          })
          .catch((error) => {
              console.error("Error:", error); // 错误处理
              setLoading(false);
              message.error(`失败:${error}`);
          });
    } 

    const showModal = () =>{
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
      };
    return (
        <>
        {contextHolder}
        <ConfigProvider button={{className: styles.linearGradientButton}}>
            <Button  icon={<SendOutlined />}type="primary" loading={loading} onClick={showModal}>{loading ? '正在发送中...' : '发送代币MTK'}</Button>
        </ConfigProvider>
        <Modal
          title="发送代币"
          centered={true}
          okText="确认"
          cancelText="取消"
          open={isModalOpen}
          onOk={handleGetToken}
          onCancel={handleCancel}>
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="地址"
              name="addr"
              rules={[{ required: true, message: '请输入钱包地址' }]}
            > 
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="数量"
              name="num"
              rules={[{ required: true, message: '请输入代币数量' }]}
            >
              <InputNumber 
                style={{ width: '100%' }} 
                suffix="MTK" />
            </Form.Item>
          </Form>
        </Modal>
        </>
        
      )
}
export default GetTokenBtn;