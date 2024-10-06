package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"server/models"
	"server/utils"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	ipfsShell *utils.IPFSShell
	client    *ethclient.Client
	auth      *bind.TransactOpts
)

// 初始化函数，加载环境变量并初始化 IPFS 和 Ethereum 客户端
func init() {
	// 加载 .env 文件
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	// 初始化 IPFS Shell
	ipfsAPI := os.Getenv("IPFS_API")
	ipfsShell = utils.NewIPFSShell(ipfsAPI)

	// 连接以太坊节点
	ethNodeURL := os.Getenv("ETH_NODE_URL")
	client, err = ethclient.Dial(ethNodeURL)
	if err != nil {
		log.Fatalf("无法连接以太坊节点: %v", err)
	}

	// 设置交易选项（需要私钥和账户信息）
	// 这里假设你已经有了私钥并创建了 TransactOpts
	// auth = yourAuthFunction()
}

// 创建选举
func CreateElection(c *gin.Context) {
	var election models.Election
	if err := c.ShouldBindJSON(&election); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	txHash, err := models.CreateElectionOnChain(election, ipfsShell, client, auth)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法创建选举: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "选举创建成功", "txHash": txHash})
}

// 获取选举列表
func GetElections(c *gin.Context) {
	elections, err := models.GetAllElectionsFromChain(client)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法获取选举列表: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, elections)
}

// 添加候选人
func AddCandidate(c *gin.Context) {
	var candidate models.Candidate
	if err := c.ShouldBindJSON(&candidate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 上传图像和描述到 IPFS
	imageCID, err := ipfsShell.UploadToIPFS([]byte(candidate.ImageData))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "上传图像失败: " + err.Error()})
		return
	}

	descCID, err := ipfsShell.UploadToIPFS([]byte(candidate.Description))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "上传描述失败: " + err.Error()})
		return
	}

	// 将候选人信息提交到链上
	txHash, err := models.AddCandidateToChain(candidate.Id, candidate.Name, imageCID, descCID, ipfsShell, client, auth)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法添加候选人: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "候选人添加成功", "txHash": txHash})
}

// 投票
func VoteCandidate(c *gin.Context) {
	var voteData models.VoteRequest
	if err := c.ShouldBindJSON(&voteData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	txHash, err := models.VoteOnChain(voteData.ElectionID, voteData.CandidateID, client, auth)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "投票失败: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "投票成功", "txHash": txHash})
}

// 捐款
func DonateToCandidate(c *gin.Context) {
	var donationData models.DonationRequest
	if err := c.ShouldBindJSON(&donationData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	txHash, err := models.DonateOnChain(donationData.ElectionID, donationData.CandidateID, donationData.Amount, client, auth)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "捐款失败: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "捐款成功", "txHash": txHash})
}

// 候选人提款
func WithdrawFunds(c *gin.Context) {
	var withdrawData models.WithdrawRequest
	if err := c.ShouldBindJSON(&withdrawData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	txHash, err := models.WithdrawFundsFromChain(withdrawData.CandidateID, withdrawData.Amount, client, auth)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "提款失败: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "提款成功", "txHash": txHash})
}

// 获取候选人列表
func GetCandidates(c *gin.Context) {
	electionIDStr := c.Param("id")
	// 需要将 electionIDStr 转换为 uint 类型
	var electionID uint
	_, err := fmt.Sscanf(electionIDStr, "%d", &electionID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的选举ID"})
		return
	}

	candidates, err := models.GetCandidatesFromChain(electionID, client)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法获取候选人列表: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, candidates)
}
