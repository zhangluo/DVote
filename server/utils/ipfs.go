package utils

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"

	shell "github.com/ipfs/go-ipfs-api"
)

// IPFSShell 定义 IPFS 连接
type IPFSShell struct {
	Shell *shell.Shell
}

// NewIPFSShell 创建一个新的 IPFSShell实例
func NewIPFSShell(apiAddress string) *IPFSShell {
	sh := shell.NewShell(apiAddress)
	if sh == nil {
		log.Fatalf("无法连接到 IPFS API 地址: %s", apiAddress)
	}
	return &IPFSShell{Shell: sh}
}

// UploadToIPFS 上传文件数据到 IPFS，返回 CID
func (ipfs *IPFSShell) UploadToIPFS(fileData []byte) (string, error) {
	reader := bytes.NewReader(fileData)

	// 添加文件到 IPFS
	cid, err := ipfs.Shell.Add(reader)
	if err != nil {
		return "", fmt.Errorf("上传到 IPFS 失败: %v", err)
	}

	return cid, nil
}

// DownloadFromIPFS 从 IPFS 下载文件数据，根据 CID 返回字节数据
func (ipfs *IPFSShell) DownloadFromIPFS(cid string) ([]byte, error) {
	readCloser, err := ipfs.Shell.Cat(cid)
	if err != nil {
		return nil, fmt.Errorf("从 IPFS 下载失败: %v", err)
	}
	defer readCloser.Close()

	content, err := ioutil.ReadAll(readCloser)
	if err != nil {
		return nil, fmt.Errorf("读取 IPFS 内容失败: %v", err)
	}

	return content, nil
}
