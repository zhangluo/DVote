package models

import (
	"errors"
	"fmt"
	"math/big"

	"server/utils"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

// Election 结构体定义
type Election struct {
	Id        big.Int `json:"id"`
	Name      string  `json:"name"`
	StartTime int64   `json:"start_time"`
	EndTime   int64   `json:"end_time"`
}

// Candidate 结构体定义
type Candidate struct {
	Id          big.Int `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	ImageData   string  `json:"image_data"` // Base64 编码或其他格式的图像数据
	VoteCount   uint    `json:"vote_count"`
	Donation    string  `json:"donation"` // 金额作为字符串传递以避免浮点数精度问题
}

// VoteRequest 投票请求结构体
type VoteRequest struct {
	ElectionID  uint `json:"election_id"`
	CandidateID uint `json:"candidate_id"`
}

// DonationRequest 捐款请求结构体
type DonationRequest struct {
	ElectionID  uint   `json:"election_id"`
	CandidateID uint   `json:"candidate_id"`
	Amount      string `json:"amount"` // 金额作为字符串传递以避免浮点数精度问题
}

// WithdrawRequest 提款请求结构体
type WithdrawRequest struct {
	CandidateID uint   `json:"candidate_id"`
	Amount      string `json:"amount"`
}

// ElectionContractABI 是智能合约的 ABI，需根据实际部署的合约进行替换
const ElectionContractABI = `[
	// 在此处粘贴你的合约 ABI JSON
]`

// ElectionContractAddress 是智能合约的地址，需根据实际部署的合约进行替换
const ElectionContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

// CreateElectionOnChain 在链上创建选举
func CreateElectionOnChain(election Election, ipfsShell *utils.IPFSShell, client *ethclient.Client, auth *bind.TransactOpts) (string, error) {
	// 上传选举名称到 IPFS（如果需要）
	cid, err := ipfsShell.UploadToIPFS([]byte(election.Name))
	if err != nil {
		return "", err
	}

	// 连接智能合约
	contract, err := NewModels(common.HexToAddress(ElectionContractAddress), client)
	if err != nil {
		return "", fmt.Errorf("连接合约失败: %v", err)
	}

	// 调用合约的创建选举函数
	tx, err := contract.CreateElection(auth, cid, big.NewInt(election.EndTime))
	if err != nil {
		return "", fmt.Errorf("创建选举失败: %v", err)
	}

	return tx.Hash().Hex(), nil
}

// AddCandidateToChain 将候选人添加到链上
func AddCandidateToChain(electionId big.Int, name, imageData, description string, ipfsShell *utils.IPFSShell, client *ethclient.Client, auth *bind.TransactOpts) (string, error) {
	// 上传图像和描述到 IPFS
	imageCID, err := ipfsShell.UploadToIPFS([]byte(imageData))
	if err != nil {
		return "", fmt.Errorf("上传图像到 IPFS 失败: %v", err)
	}

	descCID, err := ipfsShell.UploadToIPFS([]byte(description))
	if err != nil {
		return "", fmt.Errorf("上传描述到 IPFS 失败: %v", err)
	}

	// 连接智能合约
	contract, err := NewModels(common.HexToAddress(ElectionContractAddress), client)
	if err != nil {
		return "", fmt.Errorf("连接合约失败: %v", err)
	}

	// 调用合约的添加候选人函数
	tx, err := contract.AddCandidate(auth, &electionId, name, imageCID, descCID)
	if err != nil {
		return "", fmt.Errorf("添加候选人失败: %v", err)
	}

	return tx.Hash().Hex(), nil
}

// VoteOnChain 在链上为候选人投票
func VoteOnChain(electionID, candidateID uint, client *ethclient.Client, auth *bind.TransactOpts) (string, error) {
	// 连接智能合约
	contract, err := NewModels(common.HexToAddress(ElectionContractAddress), client)
	if err != nil {
		return "", fmt.Errorf("连接合约失败: %v", err)
	}

	// 调用合约的投票函数
	tx, err := contract.Vote(auth, big.NewInt(int64(electionID)), big.NewInt(int64(candidateID)))
	if err != nil {
		return "", fmt.Errorf("投票失败: %v", err)
	}

	return tx.Hash().Hex(), nil
}

// DonateOnChain 在链上捐款给候选人
func DonateOnChain(electionID, candidateID uint, amount string, client *ethclient.Client, auth *bind.TransactOpts) (string, error) {
	// 将金额转换为 wei
	weiAmount, ok := new(big.Int).SetString(amount, 10)
	if !ok {
		return "", errors.New("无效的金额格式")
	}
	fmt.Print(weiAmount)
	// 连接智能合约
	contract, err := NewModels(common.HexToAddress(ElectionContractAddress), client)
	if err != nil {
		return "", fmt.Errorf("连接合约失败: %v", err)
	}

	// 调用合约的捐款函数，并附带以太币
	tx, err := contract.Donate(auth, big.NewInt(int64(electionID)), big.NewInt(int64(candidateID)))
	if err != nil {
		return "", fmt.Errorf("捐款失败: %v", err)
	}

	return tx.Hash().Hex(), nil
}

// WithdrawFundsFromChain 在链上提款
func WithdrawFundsFromChain(candidateID uint, amount string, client *ethclient.Client, auth *bind.TransactOpts) (string, error) {
	// 将金额转换为 wei
	weiAmount, ok := new(big.Int).SetString(amount, 10)
	if !ok {
		return "", errors.New("无效的金额格式")
	}

	// 连接智能合约
	contract, err := NewModels(common.HexToAddress(ElectionContractAddress), client)
	if err != nil {
		return "", fmt.Errorf("连接合约失败: %v", err)
	}

	// 调用合约的提款函数
	tx, err := contract.Withdraw(auth, big.NewInt(int64(candidateID)), weiAmount)
	if err != nil {
		return "", fmt.Errorf("提款失败: %v", err)
	}

	return tx.Hash().Hex(), nil
}

// GetAllElectionsFromChain 从链上获取所有选举
func GetAllElectionsFromChain(client *ethclient.Client) ([]Election, error) {
	// 连接智能合约
	contract, err := NewModels(common.HexToAddress(ElectionContractAddress), client)
	if err != nil {
		return nil, fmt.Errorf("连接合约失败: %v", err)
	}

	// 调用合约的获取所有选举函数（假设存在此函数）
	ids, names, startTimes, endTimes, err := contract.GetAllElections(nil)
	if err != nil {
		return nil, fmt.Errorf("获取选举失败: %v", err)
	}
	elections := make([]Election, len(ids))
	for i, id := range ids {
		elections[i] = Election{
			Id:        *id,
			Name:      names[i],
			StartTime: startTimes[i].Int64(),
			EndTime:   endTimes[i].Int64(),
		}
	}
	return elections, nil
}

// GetCandidatesFromChain 从链上获取指定选举的所有候选人
func GetCandidatesFromChain(electionID uint, client *ethclient.Client) ([]Candidate, error) {
	// 连接智能合约
	contract, err := NewModels(common.HexToAddress(ElectionContractAddress), client)
	if err != nil {
		return nil, fmt.Errorf("连接合约失败: %v", err)
	}

	// 调用合约的获取候选人函数（假设存在此函数）
	ids, names, descriptions, imageUrls, voteCounts, donationAmounts, err := contract.GetCandidates(nil, big.NewInt(int64(electionID)))
	if err != nil {
		return nil, fmt.Errorf("获取候选人失败: %v", err)
	}
	candidates := make([]Candidate, len(ids))
	for i, id := range ids {
		candidates[i] = Candidate{
			Id:          *id,
			Name:        names[i],
			Description: descriptions[i],
			ImageData:   imageUrls[i],
			VoteCount:   uint(voteCounts[i].Uint64()),
			Donation:    donationAmounts[i].String(),
		}
	}
	return candidates, nil
}
