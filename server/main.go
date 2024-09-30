package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/gin-gonic/gin"
)

const (
	infuraURL          = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" // 替换为你的 Infura 项目 ID
	contractAddressHex = "0xYourContractAddress"                               // 替换为你的合约地址
)

var (
	client      *ethclient.Client
	contractABI abi.ABI // 用于存储合约 ABI
)

type Election struct {
	ID         uint        `json:"id"`
	Name       string      `json:"name"`
	Active     bool        `json:"active"`
	Candidates []Candidate `json:"candidates"`
}

type Candidate struct {
	ID            uint   `json:"id"`
	Name          string `json:"name"`
	VoteCount     uint   `json:"voteCount"`
	FundsReceived uint   `json:"fundsReceived"`
}

var elections []Election

func init() {
	var err error
	client, err = ethclient.Dial(infuraURL)
	if err != nil {
		log.Fatalf("Failed to connect to the Ethereum client: %v", err)
	}

	// 加载合约 ABI
	contractABI, err = abi.JSON(strings.NewReader(`[{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"createElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_electionId","type":"uint256"},{"name":"_candidateName","type":"string"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_electionId","type":"uint256"},{"name":"_candidateId","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_electionId","type":"uint256"},{"name":"_candidateId","type":"uint256"}],"name":"donate","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]`)) // 根据你的合约 ABI 修改
	if err != nil {
		log.Fatalf("Failed to load contract ABI: %v", err)
	}
}

func createElection(c *gin.Context) {
	var election Election
	if err := c.BindJSON(&election); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 调用合约方法创建选举
	tx, err := contractABI.Pack("createElection", election.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("Transaction:", tx)
	// ... 添加代码以发送交易到以太坊网络 ...

	election.ID = uint(len(elections) + 1)
	election.Active = true
	elections = append(elections, election)
	c.JSON(http.StatusOK, election)
}

func addCandidate(c *gin.Context) {
	electionID := c.Param("id")
	id, err := strconv.ParseUint(electionID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid election ID"})
		return
	}

	var candidate Candidate
	if err := c.BindJSON(&candidate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 调用合约方法添加候选人
	tx, err := contractABI.Pack("addCandidate", uint(id), candidate.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("Transaction:", tx)
	// ... 添加代码以发送交易到以太坊网络 ...

	for i := range elections {
		if elections[i].ID == uint(id) {
			candidate.ID = uint(len(elections[i].Candidates) + 1)
			elections[i].Candidates = append(elections[i].Candidates, candidate)
			c.JSON(http.StatusOK, candidate)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Election not found"})
}

func vote(c *gin.Context) {
	electionID := c.Param("id")
	candidateID := c.Param("candidateId")

	id, err := strconv.ParseUint(electionID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid election ID"})
		return
	}

	candidateId, err := strconv.ParseUint(candidateID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid candidate ID"})
		return
	}

	// 调用合约方法投票
	tx, err := contractABI.Pack("vote", uint(id), uint(candidateId))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("Transaction:", tx)
	// ... 添加代码以发送交易到以太坊网络 ...

	c.JSON(http.StatusOK, gin.H{"message": "Vote submitted"})
}

func donate(c *gin.Context) {
	electionID := c.Param("id")
	candidateID := c.Param("candidateId")

	// 调用合约方法捐款
	tx, err := contractABI.Pack("donate", electionID, candidateID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("Transaction:", tx)
	// ... 添加代码以发送交易到以太坊网络 ...

	c.JSON(http.StatusOK, gin.H{"message": "Donation submitted"})
}

func main() {
	router := gin.Default()

	router.POST("/election", createElection)
	router.POST("/election/:id/candidate", addCandidate)
	router.POST("/election/:id/candidate/:candidateId/vote", vote)
	router.POST("/election/:id/candidate/:candidateId/donate", donate)

	log.Fatal(router.Run(":8080"))
}
