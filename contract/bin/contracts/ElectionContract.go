// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package models

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// ModelsMetaData contains all meta data concerning the Models contract.
var ModelsMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"electionId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"candidateId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"}],\"name\":\"CandidateAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"electionId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"donor\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"candidateId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"DonationReceived\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"electionId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"endTime\",\"type\":\"uint256\"}],\"name\":\"ElectionCreated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"electionId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"voter\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"candidateId\",\"type\":\"uint256\"}],\"name\":\"Voted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"electionId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"candidate\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"Withdrawn\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_electionId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"_name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"_description\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"_imageUrl\",\"type\":\"string\"}],\"name\":\"addCandidate\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"admin\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_duration\",\"type\":\"uint256\"}],\"name\":\"createElection\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_electionId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_candidateId\",\"type\":\"uint256\"}],\"name\":\"donate\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"elections\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"startTime\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"endTime\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"candidatesCount\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"electionsCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getAllElections\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_electionId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_candidateId\",\"type\":\"uint256\"}],\"name\":\"getCandidateInfo\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_electionId\",\"type\":\"uint256\"}],\"name\":\"getCandidates\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"},{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"},{\"internalType\":\"string[]\",\"name\":\"\",\"type\":\"string[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_electionId\",\"type\":\"uint256\"}],\"name\":\"getElectionInfo\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_electionId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_candidateId\",\"type\":\"uint256\"}],\"name\":\"vote\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_electionId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// ModelsABI is the input ABI used to generate the binding from.
// Deprecated: Use ModelsMetaData.ABI instead.
var ModelsABI = ModelsMetaData.ABI

// Models is an auto generated Go binding around an Ethereum contract.
type Models struct {
	ModelsCaller     // Read-only binding to the contract
	ModelsTransactor // Write-only binding to the contract
	ModelsFilterer   // Log filterer for contract events
}

// ModelsCaller is an auto generated read-only Go binding around an Ethereum contract.
type ModelsCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ModelsTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ModelsTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ModelsFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ModelsFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ModelsSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ModelsSession struct {
	Contract     *Models           // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ModelsCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ModelsCallerSession struct {
	Contract *ModelsCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// ModelsTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ModelsTransactorSession struct {
	Contract     *ModelsTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ModelsRaw is an auto generated low-level Go binding around an Ethereum contract.
type ModelsRaw struct {
	Contract *Models // Generic contract binding to access the raw methods on
}

// ModelsCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ModelsCallerRaw struct {
	Contract *ModelsCaller // Generic read-only contract binding to access the raw methods on
}

// ModelsTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ModelsTransactorRaw struct {
	Contract *ModelsTransactor // Generic write-only contract binding to access the raw methods on
}

// NewModels creates a new instance of Models, bound to a specific deployed contract.
func NewModels(address common.Address, backend bind.ContractBackend) (*Models, error) {
	contract, err := bindModels(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Models{ModelsCaller: ModelsCaller{contract: contract}, ModelsTransactor: ModelsTransactor{contract: contract}, ModelsFilterer: ModelsFilterer{contract: contract}}, nil
}

// NewModelsCaller creates a new read-only instance of Models, bound to a specific deployed contract.
func NewModelsCaller(address common.Address, caller bind.ContractCaller) (*ModelsCaller, error) {
	contract, err := bindModels(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ModelsCaller{contract: contract}, nil
}

// NewModelsTransactor creates a new write-only instance of Models, bound to a specific deployed contract.
func NewModelsTransactor(address common.Address, transactor bind.ContractTransactor) (*ModelsTransactor, error) {
	contract, err := bindModels(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ModelsTransactor{contract: contract}, nil
}

// NewModelsFilterer creates a new log filterer instance of Models, bound to a specific deployed contract.
func NewModelsFilterer(address common.Address, filterer bind.ContractFilterer) (*ModelsFilterer, error) {
	contract, err := bindModels(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ModelsFilterer{contract: contract}, nil
}

// bindModels binds a generic wrapper to an already deployed contract.
func bindModels(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := ModelsMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Models *ModelsRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Models.Contract.ModelsCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Models *ModelsRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Models.Contract.ModelsTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Models *ModelsRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Models.Contract.ModelsTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Models *ModelsCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Models.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Models *ModelsTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Models.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Models *ModelsTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Models.Contract.contract.Transact(opts, method, params...)
}

// Admin is a free data retrieval call binding the contract method 0xf851a440.
//
// Solidity: function admin() view returns(address)
func (_Models *ModelsCaller) Admin(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Models.contract.Call(opts, &out, "admin")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Admin is a free data retrieval call binding the contract method 0xf851a440.
//
// Solidity: function admin() view returns(address)
func (_Models *ModelsSession) Admin() (common.Address, error) {
	return _Models.Contract.Admin(&_Models.CallOpts)
}

// Admin is a free data retrieval call binding the contract method 0xf851a440.
//
// Solidity: function admin() view returns(address)
func (_Models *ModelsCallerSession) Admin() (common.Address, error) {
	return _Models.Contract.Admin(&_Models.CallOpts)
}

// Elections is a free data retrieval call binding the contract method 0x5e6fef01.
//
// Solidity: function elections(uint256 ) view returns(uint256 id, string name, uint256 startTime, uint256 endTime, uint256 candidatesCount)
func (_Models *ModelsCaller) Elections(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Id              *big.Int
	Name            string
	StartTime       *big.Int
	EndTime         *big.Int
	CandidatesCount *big.Int
}, error) {
	var out []interface{}
	err := _Models.contract.Call(opts, &out, "elections", arg0)

	outstruct := new(struct {
		Id              *big.Int
		Name            string
		StartTime       *big.Int
		EndTime         *big.Int
		CandidatesCount *big.Int
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Id = *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	outstruct.Name = *abi.ConvertType(out[1], new(string)).(*string)
	outstruct.StartTime = *abi.ConvertType(out[2], new(*big.Int)).(**big.Int)
	outstruct.EndTime = *abi.ConvertType(out[3], new(*big.Int)).(**big.Int)
	outstruct.CandidatesCount = *abi.ConvertType(out[4], new(*big.Int)).(**big.Int)

	return *outstruct, err

}

// Elections is a free data retrieval call binding the contract method 0x5e6fef01.
//
// Solidity: function elections(uint256 ) view returns(uint256 id, string name, uint256 startTime, uint256 endTime, uint256 candidatesCount)
func (_Models *ModelsSession) Elections(arg0 *big.Int) (struct {
	Id              *big.Int
	Name            string
	StartTime       *big.Int
	EndTime         *big.Int
	CandidatesCount *big.Int
}, error) {
	return _Models.Contract.Elections(&_Models.CallOpts, arg0)
}

// Elections is a free data retrieval call binding the contract method 0x5e6fef01.
//
// Solidity: function elections(uint256 ) view returns(uint256 id, string name, uint256 startTime, uint256 endTime, uint256 candidatesCount)
func (_Models *ModelsCallerSession) Elections(arg0 *big.Int) (struct {
	Id              *big.Int
	Name            string
	StartTime       *big.Int
	EndTime         *big.Int
	CandidatesCount *big.Int
}, error) {
	return _Models.Contract.Elections(&_Models.CallOpts, arg0)
}

// ElectionsCount is a free data retrieval call binding the contract method 0x9a74c695.
//
// Solidity: function electionsCount() view returns(uint256)
func (_Models *ModelsCaller) ElectionsCount(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Models.contract.Call(opts, &out, "electionsCount")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// ElectionsCount is a free data retrieval call binding the contract method 0x9a74c695.
//
// Solidity: function electionsCount() view returns(uint256)
func (_Models *ModelsSession) ElectionsCount() (*big.Int, error) {
	return _Models.Contract.ElectionsCount(&_Models.CallOpts)
}

// ElectionsCount is a free data retrieval call binding the contract method 0x9a74c695.
//
// Solidity: function electionsCount() view returns(uint256)
func (_Models *ModelsCallerSession) ElectionsCount() (*big.Int, error) {
	return _Models.Contract.ElectionsCount(&_Models.CallOpts)
}

// GetAllElections is a free data retrieval call binding the contract method 0x7fd5f268.
//
// Solidity: function getAllElections() view returns(uint256[], string[], uint256[], uint256[])
func (_Models *ModelsCaller) GetAllElections(opts *bind.CallOpts) ([]*big.Int, []string, []*big.Int, []*big.Int, error) {
	var out []interface{}
	err := _Models.contract.Call(opts, &out, "getAllElections")

	if err != nil {
		return *new([]*big.Int), *new([]string), *new([]*big.Int), *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)
	out1 := *abi.ConvertType(out[1], new([]string)).(*[]string)
	out2 := *abi.ConvertType(out[2], new([]*big.Int)).(*[]*big.Int)
	out3 := *abi.ConvertType(out[3], new([]*big.Int)).(*[]*big.Int)

	return out0, out1, out2, out3, err

}

// GetAllElections is a free data retrieval call binding the contract method 0x7fd5f268.
//
// Solidity: function getAllElections() view returns(uint256[], string[], uint256[], uint256[])
func (_Models *ModelsSession) GetAllElections() ([]*big.Int, []string, []*big.Int, []*big.Int, error) {
	return _Models.Contract.GetAllElections(&_Models.CallOpts)
}

// GetAllElections is a free data retrieval call binding the contract method 0x7fd5f268.
//
// Solidity: function getAllElections() view returns(uint256[], string[], uint256[], uint256[])
func (_Models *ModelsCallerSession) GetAllElections() ([]*big.Int, []string, []*big.Int, []*big.Int, error) {
	return _Models.Contract.GetAllElections(&_Models.CallOpts)
}

// GetCandidateInfo is a free data retrieval call binding the contract method 0x73a12f5a.
//
// Solidity: function getCandidateInfo(uint256 _electionId, uint256 _candidateId) view returns(string, string, string, uint256, uint256)
func (_Models *ModelsCaller) GetCandidateInfo(opts *bind.CallOpts, _electionId *big.Int, _candidateId *big.Int) (string, string, string, *big.Int, *big.Int, error) {
	var out []interface{}
	err := _Models.contract.Call(opts, &out, "getCandidateInfo", _electionId, _candidateId)

	if err != nil {
		return *new(string), *new(string), *new(string), *new(*big.Int), *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)
	out1 := *abi.ConvertType(out[1], new(string)).(*string)
	out2 := *abi.ConvertType(out[2], new(string)).(*string)
	out3 := *abi.ConvertType(out[3], new(*big.Int)).(**big.Int)
	out4 := *abi.ConvertType(out[4], new(*big.Int)).(**big.Int)

	return out0, out1, out2, out3, out4, err

}

// GetCandidateInfo is a free data retrieval call binding the contract method 0x73a12f5a.
//
// Solidity: function getCandidateInfo(uint256 _electionId, uint256 _candidateId) view returns(string, string, string, uint256, uint256)
func (_Models *ModelsSession) GetCandidateInfo(_electionId *big.Int, _candidateId *big.Int) (string, string, string, *big.Int, *big.Int, error) {
	return _Models.Contract.GetCandidateInfo(&_Models.CallOpts, _electionId, _candidateId)
}

// GetCandidateInfo is a free data retrieval call binding the contract method 0x73a12f5a.
//
// Solidity: function getCandidateInfo(uint256 _electionId, uint256 _candidateId) view returns(string, string, string, uint256, uint256)
func (_Models *ModelsCallerSession) GetCandidateInfo(_electionId *big.Int, _candidateId *big.Int) (string, string, string, *big.Int, *big.Int, error) {
	return _Models.Contract.GetCandidateInfo(&_Models.CallOpts, _electionId, _candidateId)
}

// GetCandidates is a free data retrieval call binding the contract method 0x3e39a7a5.
//
// Solidity: function getCandidates(uint256 _electionId) view returns(uint256[], string[], string[], string[], uint256[], uint256[])
func (_Models *ModelsCaller) GetCandidates(opts *bind.CallOpts, _electionId *big.Int) ([]*big.Int, []string, []string, []string, []*big.Int, []*big.Int, error) {
	var out []interface{}
	err := _Models.contract.Call(opts, &out, "getCandidates", _electionId)

	if err != nil {
		return *new([]*big.Int), *new([]string), *new([]string), *new([]string), *new([]*big.Int), *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)
	out1 := *abi.ConvertType(out[1], new([]string)).(*[]string)
	out2 := *abi.ConvertType(out[2], new([]string)).(*[]string)
	out3 := *abi.ConvertType(out[3], new([]string)).(*[]string)
	out4 := *abi.ConvertType(out[4], new([]*big.Int)).(*[]*big.Int)
	out5 := *abi.ConvertType(out[5], new([]*big.Int)).(*[]*big.Int)

	return out0, out1, out2, out3, out4, out5, err

}

// GetCandidates is a free data retrieval call binding the contract method 0x3e39a7a5.
//
// Solidity: function getCandidates(uint256 _electionId) view returns(uint256[], string[], string[], string[], uint256[], uint256[])
func (_Models *ModelsSession) GetCandidates(_electionId *big.Int) ([]*big.Int, []string, []string, []string, []*big.Int, []*big.Int, error) {
	return _Models.Contract.GetCandidates(&_Models.CallOpts, _electionId)
}

// GetCandidates is a free data retrieval call binding the contract method 0x3e39a7a5.
//
// Solidity: function getCandidates(uint256 _electionId) view returns(uint256[], string[], string[], string[], uint256[], uint256[])
func (_Models *ModelsCallerSession) GetCandidates(_electionId *big.Int) ([]*big.Int, []string, []string, []string, []*big.Int, []*big.Int, error) {
	return _Models.Contract.GetCandidates(&_Models.CallOpts, _electionId)
}

// GetElectionInfo is a free data retrieval call binding the contract method 0xce99b5df.
//
// Solidity: function getElectionInfo(uint256 _electionId) view returns(string, uint256, uint256)
func (_Models *ModelsCaller) GetElectionInfo(opts *bind.CallOpts, _electionId *big.Int) (string, *big.Int, *big.Int, error) {
	var out []interface{}
	err := _Models.contract.Call(opts, &out, "getElectionInfo", _electionId)

	if err != nil {
		return *new(string), *new(*big.Int), *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)
	out1 := *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)
	out2 := *abi.ConvertType(out[2], new(*big.Int)).(**big.Int)

	return out0, out1, out2, err

}

// GetElectionInfo is a free data retrieval call binding the contract method 0xce99b5df.
//
// Solidity: function getElectionInfo(uint256 _electionId) view returns(string, uint256, uint256)
func (_Models *ModelsSession) GetElectionInfo(_electionId *big.Int) (string, *big.Int, *big.Int, error) {
	return _Models.Contract.GetElectionInfo(&_Models.CallOpts, _electionId)
}

// GetElectionInfo is a free data retrieval call binding the contract method 0xce99b5df.
//
// Solidity: function getElectionInfo(uint256 _electionId) view returns(string, uint256, uint256)
func (_Models *ModelsCallerSession) GetElectionInfo(_electionId *big.Int) (string, *big.Int, *big.Int, error) {
	return _Models.Contract.GetElectionInfo(&_Models.CallOpts, _electionId)
}

// AddCandidate is a paid mutator transaction binding the contract method 0xce4a2743.
//
// Solidity: function addCandidate(uint256 _electionId, string _name, string _description, string _imageUrl) returns()
func (_Models *ModelsTransactor) AddCandidate(opts *bind.TransactOpts, _electionId *big.Int, _name string, _description string, _imageUrl string) (*types.Transaction, error) {
	return _Models.contract.Transact(opts, "addCandidate", _electionId, _name, _description, _imageUrl)
}

// AddCandidate is a paid mutator transaction binding the contract method 0xce4a2743.
//
// Solidity: function addCandidate(uint256 _electionId, string _name, string _description, string _imageUrl) returns()
func (_Models *ModelsSession) AddCandidate(_electionId *big.Int, _name string, _description string, _imageUrl string) (*types.Transaction, error) {
	return _Models.Contract.AddCandidate(&_Models.TransactOpts, _electionId, _name, _description, _imageUrl)
}

// AddCandidate is a paid mutator transaction binding the contract method 0xce4a2743.
//
// Solidity: function addCandidate(uint256 _electionId, string _name, string _description, string _imageUrl) returns()
func (_Models *ModelsTransactorSession) AddCandidate(_electionId *big.Int, _name string, _description string, _imageUrl string) (*types.Transaction, error) {
	return _Models.Contract.AddCandidate(&_Models.TransactOpts, _electionId, _name, _description, _imageUrl)
}

// CreateElection is a paid mutator transaction binding the contract method 0x432cf2ce.
//
// Solidity: function createElection(string _name, uint256 _duration) returns()
func (_Models *ModelsTransactor) CreateElection(opts *bind.TransactOpts, _name string, _duration *big.Int) (*types.Transaction, error) {
	return _Models.contract.Transact(opts, "createElection", _name, _duration)
}

// CreateElection is a paid mutator transaction binding the contract method 0x432cf2ce.
//
// Solidity: function createElection(string _name, uint256 _duration) returns()
func (_Models *ModelsSession) CreateElection(_name string, _duration *big.Int) (*types.Transaction, error) {
	return _Models.Contract.CreateElection(&_Models.TransactOpts, _name, _duration)
}

// CreateElection is a paid mutator transaction binding the contract method 0x432cf2ce.
//
// Solidity: function createElection(string _name, uint256 _duration) returns()
func (_Models *ModelsTransactorSession) CreateElection(_name string, _duration *big.Int) (*types.Transaction, error) {
	return _Models.Contract.CreateElection(&_Models.TransactOpts, _name, _duration)
}

// Donate is a paid mutator transaction binding the contract method 0x0cdd53f6.
//
// Solidity: function donate(uint256 _electionId, uint256 _candidateId) payable returns()
func (_Models *ModelsTransactor) Donate(opts *bind.TransactOpts, _electionId *big.Int, _candidateId *big.Int) (*types.Transaction, error) {
	return _Models.contract.Transact(opts, "donate", _electionId, _candidateId)
}

// Donate is a paid mutator transaction binding the contract method 0x0cdd53f6.
//
// Solidity: function donate(uint256 _electionId, uint256 _candidateId) payable returns()
func (_Models *ModelsSession) Donate(_electionId *big.Int, _candidateId *big.Int) (*types.Transaction, error) {
	return _Models.Contract.Donate(&_Models.TransactOpts, _electionId, _candidateId)
}

// Donate is a paid mutator transaction binding the contract method 0x0cdd53f6.
//
// Solidity: function donate(uint256 _electionId, uint256 _candidateId) payable returns()
func (_Models *ModelsTransactorSession) Donate(_electionId *big.Int, _candidateId *big.Int) (*types.Transaction, error) {
	return _Models.Contract.Donate(&_Models.TransactOpts, _electionId, _candidateId)
}

// Vote is a paid mutator transaction binding the contract method 0xb384abef.
//
// Solidity: function vote(uint256 _electionId, uint256 _candidateId) returns()
func (_Models *ModelsTransactor) Vote(opts *bind.TransactOpts, _electionId *big.Int, _candidateId *big.Int) (*types.Transaction, error) {
	return _Models.contract.Transact(opts, "vote", _electionId, _candidateId)
}

// Vote is a paid mutator transaction binding the contract method 0xb384abef.
//
// Solidity: function vote(uint256 _electionId, uint256 _candidateId) returns()
func (_Models *ModelsSession) Vote(_electionId *big.Int, _candidateId *big.Int) (*types.Transaction, error) {
	return _Models.Contract.Vote(&_Models.TransactOpts, _electionId, _candidateId)
}

// Vote is a paid mutator transaction binding the contract method 0xb384abef.
//
// Solidity: function vote(uint256 _electionId, uint256 _candidateId) returns()
func (_Models *ModelsTransactorSession) Vote(_electionId *big.Int, _candidateId *big.Int) (*types.Transaction, error) {
	return _Models.Contract.Vote(&_Models.TransactOpts, _electionId, _candidateId)
}

// Withdraw is a paid mutator transaction binding the contract method 0x441a3e70.
//
// Solidity: function withdraw(uint256 _electionId, uint256 _amount) returns()
func (_Models *ModelsTransactor) Withdraw(opts *bind.TransactOpts, _electionId *big.Int, _amount *big.Int) (*types.Transaction, error) {
	return _Models.contract.Transact(opts, "withdraw", _electionId, _amount)
}

// Withdraw is a paid mutator transaction binding the contract method 0x441a3e70.
//
// Solidity: function withdraw(uint256 _electionId, uint256 _amount) returns()
func (_Models *ModelsSession) Withdraw(_electionId *big.Int, _amount *big.Int) (*types.Transaction, error) {
	return _Models.Contract.Withdraw(&_Models.TransactOpts, _electionId, _amount)
}

// Withdraw is a paid mutator transaction binding the contract method 0x441a3e70.
//
// Solidity: function withdraw(uint256 _electionId, uint256 _amount) returns()
func (_Models *ModelsTransactorSession) Withdraw(_electionId *big.Int, _amount *big.Int) (*types.Transaction, error) {
	return _Models.Contract.Withdraw(&_Models.TransactOpts, _electionId, _amount)
}

// ModelsCandidateAddedIterator is returned from FilterCandidateAdded and is used to iterate over the raw logs and unpacked data for CandidateAdded events raised by the Models contract.
type ModelsCandidateAddedIterator struct {
	Event *ModelsCandidateAdded // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ModelsCandidateAddedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ModelsCandidateAdded)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ModelsCandidateAdded)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ModelsCandidateAddedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ModelsCandidateAddedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ModelsCandidateAdded represents a CandidateAdded event raised by the Models contract.
type ModelsCandidateAdded struct {
	ElectionId  *big.Int
	CandidateId *big.Int
	Name        string
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterCandidateAdded is a free log retrieval operation binding the contract event 0xed8911b3df733b7d5f75724158e54478ea12e30f49c9d31b5261879f5b76586f.
//
// Solidity: event CandidateAdded(uint256 electionId, uint256 candidateId, string name)
func (_Models *ModelsFilterer) FilterCandidateAdded(opts *bind.FilterOpts) (*ModelsCandidateAddedIterator, error) {

	logs, sub, err := _Models.contract.FilterLogs(opts, "CandidateAdded")
	if err != nil {
		return nil, err
	}
	return &ModelsCandidateAddedIterator{contract: _Models.contract, event: "CandidateAdded", logs: logs, sub: sub}, nil
}

// WatchCandidateAdded is a free log subscription operation binding the contract event 0xed8911b3df733b7d5f75724158e54478ea12e30f49c9d31b5261879f5b76586f.
//
// Solidity: event CandidateAdded(uint256 electionId, uint256 candidateId, string name)
func (_Models *ModelsFilterer) WatchCandidateAdded(opts *bind.WatchOpts, sink chan<- *ModelsCandidateAdded) (event.Subscription, error) {

	logs, sub, err := _Models.contract.WatchLogs(opts, "CandidateAdded")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ModelsCandidateAdded)
				if err := _Models.contract.UnpackLog(event, "CandidateAdded", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseCandidateAdded is a log parse operation binding the contract event 0xed8911b3df733b7d5f75724158e54478ea12e30f49c9d31b5261879f5b76586f.
//
// Solidity: event CandidateAdded(uint256 electionId, uint256 candidateId, string name)
func (_Models *ModelsFilterer) ParseCandidateAdded(log types.Log) (*ModelsCandidateAdded, error) {
	event := new(ModelsCandidateAdded)
	if err := _Models.contract.UnpackLog(event, "CandidateAdded", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ModelsDonationReceivedIterator is returned from FilterDonationReceived and is used to iterate over the raw logs and unpacked data for DonationReceived events raised by the Models contract.
type ModelsDonationReceivedIterator struct {
	Event *ModelsDonationReceived // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ModelsDonationReceivedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ModelsDonationReceived)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ModelsDonationReceived)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ModelsDonationReceivedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ModelsDonationReceivedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ModelsDonationReceived represents a DonationReceived event raised by the Models contract.
type ModelsDonationReceived struct {
	ElectionId  *big.Int
	Donor       common.Address
	CandidateId *big.Int
	Amount      *big.Int
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterDonationReceived is a free log retrieval operation binding the contract event 0x3dbea1b4ce5f95137fdcac9b1d685825c3d70ace830df1ca5a181d3887add410.
//
// Solidity: event DonationReceived(uint256 electionId, address donor, uint256 candidateId, uint256 amount)
func (_Models *ModelsFilterer) FilterDonationReceived(opts *bind.FilterOpts) (*ModelsDonationReceivedIterator, error) {

	logs, sub, err := _Models.contract.FilterLogs(opts, "DonationReceived")
	if err != nil {
		return nil, err
	}
	return &ModelsDonationReceivedIterator{contract: _Models.contract, event: "DonationReceived", logs: logs, sub: sub}, nil
}

// WatchDonationReceived is a free log subscription operation binding the contract event 0x3dbea1b4ce5f95137fdcac9b1d685825c3d70ace830df1ca5a181d3887add410.
//
// Solidity: event DonationReceived(uint256 electionId, address donor, uint256 candidateId, uint256 amount)
func (_Models *ModelsFilterer) WatchDonationReceived(opts *bind.WatchOpts, sink chan<- *ModelsDonationReceived) (event.Subscription, error) {

	logs, sub, err := _Models.contract.WatchLogs(opts, "DonationReceived")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ModelsDonationReceived)
				if err := _Models.contract.UnpackLog(event, "DonationReceived", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseDonationReceived is a log parse operation binding the contract event 0x3dbea1b4ce5f95137fdcac9b1d685825c3d70ace830df1ca5a181d3887add410.
//
// Solidity: event DonationReceived(uint256 electionId, address donor, uint256 candidateId, uint256 amount)
func (_Models *ModelsFilterer) ParseDonationReceived(log types.Log) (*ModelsDonationReceived, error) {
	event := new(ModelsDonationReceived)
	if err := _Models.contract.UnpackLog(event, "DonationReceived", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ModelsElectionCreatedIterator is returned from FilterElectionCreated and is used to iterate over the raw logs and unpacked data for ElectionCreated events raised by the Models contract.
type ModelsElectionCreatedIterator struct {
	Event *ModelsElectionCreated // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ModelsElectionCreatedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ModelsElectionCreated)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ModelsElectionCreated)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ModelsElectionCreatedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ModelsElectionCreatedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ModelsElectionCreated represents a ElectionCreated event raised by the Models contract.
type ModelsElectionCreated struct {
	ElectionId *big.Int
	Name       string
	EndTime    *big.Int
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterElectionCreated is a free log retrieval operation binding the contract event 0x43131521170c5b80ffe9526cfec987f5a24eb1f6c4bda47c41a5e4b8388afe5c.
//
// Solidity: event ElectionCreated(uint256 electionId, string name, uint256 endTime)
func (_Models *ModelsFilterer) FilterElectionCreated(opts *bind.FilterOpts) (*ModelsElectionCreatedIterator, error) {

	logs, sub, err := _Models.contract.FilterLogs(opts, "ElectionCreated")
	if err != nil {
		return nil, err
	}
	return &ModelsElectionCreatedIterator{contract: _Models.contract, event: "ElectionCreated", logs: logs, sub: sub}, nil
}

// WatchElectionCreated is a free log subscription operation binding the contract event 0x43131521170c5b80ffe9526cfec987f5a24eb1f6c4bda47c41a5e4b8388afe5c.
//
// Solidity: event ElectionCreated(uint256 electionId, string name, uint256 endTime)
func (_Models *ModelsFilterer) WatchElectionCreated(opts *bind.WatchOpts, sink chan<- *ModelsElectionCreated) (event.Subscription, error) {

	logs, sub, err := _Models.contract.WatchLogs(opts, "ElectionCreated")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ModelsElectionCreated)
				if err := _Models.contract.UnpackLog(event, "ElectionCreated", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseElectionCreated is a log parse operation binding the contract event 0x43131521170c5b80ffe9526cfec987f5a24eb1f6c4bda47c41a5e4b8388afe5c.
//
// Solidity: event ElectionCreated(uint256 electionId, string name, uint256 endTime)
func (_Models *ModelsFilterer) ParseElectionCreated(log types.Log) (*ModelsElectionCreated, error) {
	event := new(ModelsElectionCreated)
	if err := _Models.contract.UnpackLog(event, "ElectionCreated", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ModelsVotedIterator is returned from FilterVoted and is used to iterate over the raw logs and unpacked data for Voted events raised by the Models contract.
type ModelsVotedIterator struct {
	Event *ModelsVoted // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ModelsVotedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ModelsVoted)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ModelsVoted)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ModelsVotedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ModelsVotedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ModelsVoted represents a Voted event raised by the Models contract.
type ModelsVoted struct {
	ElectionId  *big.Int
	Voter       common.Address
	CandidateId *big.Int
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterVoted is a free log retrieval operation binding the contract event 0x1abe610cf2bf87e57dcc1181fcf5ac0934e843d8344ab9eed6e86c799f62585e.
//
// Solidity: event Voted(uint256 electionId, address voter, uint256 candidateId)
func (_Models *ModelsFilterer) FilterVoted(opts *bind.FilterOpts) (*ModelsVotedIterator, error) {

	logs, sub, err := _Models.contract.FilterLogs(opts, "Voted")
	if err != nil {
		return nil, err
	}
	return &ModelsVotedIterator{contract: _Models.contract, event: "Voted", logs: logs, sub: sub}, nil
}

// WatchVoted is a free log subscription operation binding the contract event 0x1abe610cf2bf87e57dcc1181fcf5ac0934e843d8344ab9eed6e86c799f62585e.
//
// Solidity: event Voted(uint256 electionId, address voter, uint256 candidateId)
func (_Models *ModelsFilterer) WatchVoted(opts *bind.WatchOpts, sink chan<- *ModelsVoted) (event.Subscription, error) {

	logs, sub, err := _Models.contract.WatchLogs(opts, "Voted")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ModelsVoted)
				if err := _Models.contract.UnpackLog(event, "Voted", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseVoted is a log parse operation binding the contract event 0x1abe610cf2bf87e57dcc1181fcf5ac0934e843d8344ab9eed6e86c799f62585e.
//
// Solidity: event Voted(uint256 electionId, address voter, uint256 candidateId)
func (_Models *ModelsFilterer) ParseVoted(log types.Log) (*ModelsVoted, error) {
	event := new(ModelsVoted)
	if err := _Models.contract.UnpackLog(event, "Voted", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ModelsWithdrawnIterator is returned from FilterWithdrawn and is used to iterate over the raw logs and unpacked data for Withdrawn events raised by the Models contract.
type ModelsWithdrawnIterator struct {
	Event *ModelsWithdrawn // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *ModelsWithdrawnIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ModelsWithdrawn)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(ModelsWithdrawn)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *ModelsWithdrawnIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ModelsWithdrawnIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ModelsWithdrawn represents a Withdrawn event raised by the Models contract.
type ModelsWithdrawn struct {
	ElectionId *big.Int
	Candidate  common.Address
	Amount     *big.Int
	Raw        types.Log // Blockchain specific contextual infos
}

// FilterWithdrawn is a free log retrieval operation binding the contract event 0xcf7d23a3cbe4e8b36ff82fd1b05b1b17373dc7804b4ebbd6e2356716ef202372.
//
// Solidity: event Withdrawn(uint256 electionId, address candidate, uint256 amount)
func (_Models *ModelsFilterer) FilterWithdrawn(opts *bind.FilterOpts) (*ModelsWithdrawnIterator, error) {

	logs, sub, err := _Models.contract.FilterLogs(opts, "Withdrawn")
	if err != nil {
		return nil, err
	}
	return &ModelsWithdrawnIterator{contract: _Models.contract, event: "Withdrawn", logs: logs, sub: sub}, nil
}

// WatchWithdrawn is a free log subscription operation binding the contract event 0xcf7d23a3cbe4e8b36ff82fd1b05b1b17373dc7804b4ebbd6e2356716ef202372.
//
// Solidity: event Withdrawn(uint256 electionId, address candidate, uint256 amount)
func (_Models *ModelsFilterer) WatchWithdrawn(opts *bind.WatchOpts, sink chan<- *ModelsWithdrawn) (event.Subscription, error) {

	logs, sub, err := _Models.contract.WatchLogs(opts, "Withdrawn")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ModelsWithdrawn)
				if err := _Models.contract.UnpackLog(event, "Withdrawn", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseWithdrawn is a log parse operation binding the contract event 0xcf7d23a3cbe4e8b36ff82fd1b05b1b17373dc7804b4ebbd6e2356716ef202372.
//
// Solidity: event Withdrawn(uint256 electionId, address candidate, uint256 amount)
func (_Models *ModelsFilterer) ParseWithdrawn(log types.Log) (*ModelsWithdrawn, error) {
	event := new(ModelsWithdrawn)
	if err := _Models.contract.UnpackLog(event, "Withdrawn", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
