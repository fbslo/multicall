const { AbiItem } = require('web3-utils')
const { Interface } = require('@ethersproject/abi')
const { getWeb3NoAccount } = require('./web3')
const MultiCallAbi = require('./Multicall.json')
const abi = require('./erc20.json')
// CUB-busd
const calls = [
  {
    //get CUB balance of CUB-BUSD pair
    "address": "0x50d809c74e0b8e49e7b4c65bb3109abe3ff4c1c1",
    "name": "balanceOf",
    "params": [
      "0x0EF564D4F8D6C0ffE13348A32e21EFd55e508e84"
    ]
  },
  {
    //get BUSD balance of CUB-BUSD pair
    "address": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    "name": "balanceOf",
    "params": [
      "0x0EF564D4F8D6C0ffE13348A32e21EFd55e508e84"
    ]
  },
  {
    //get CUB-BUSD balance of LionsDen contract
    "address": "0x0EF564D4F8D6C0ffE13348A32e21EFd55e508e84",
    "name": "balanceOf",
    "params": [
      "0x227e79c83065edb8b954848c46ca50b96cb33e16"
    ]
  },
  {
    //get total supply of CUB-BUSD tokens
    "address": "0x0EF564D4F8D6C0ffE13348A32e21EFd55e508e84",
    "name": "totalSupply"
  },
  {
    // get decimals of CUB
    "address": "0x50d809c74e0b8e49e7b4c65bb3109abe3ff4c1c1",
    "name": "decimals"
  },
  {
    //get decimals of BUSD
    "address": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    "name": "decimals"
  }
]
// Kingdom
const callsK = [
  {
    //get CAKE balance of CAKE CubMaximizer Vault contract.
    "address": "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
    "name": "balanceOf",
    "params": [
      "0xb1caBD8a32333b4af9dB06e58E2E571d0F64EBE1"
    ]
  },
  {
    //get BUSD balance of CAKE CubMaximizer Vault contract
    "address": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    "name": "balanceOf",
    "params": [
      "0xb1caBD8a32333b4af9dB06e58E2E571d0F64EBE1"
    ]
  },
  {
    //get (CAKE Vault) balance of kindgom main contract. Not possible, since it doesn't have this function
    "address": "0xb1caBD8a32333b4af9dB06e58E2E571d0F64EBE1",
    "name": "balanceOf",
    "params": [
      "0x18aad123582da365cd975f26c8b1f7658741da1c"
    ]
  },
  {
    //get balance of CubMaximizer Vault? Not possible, since it doesn't have this function
    "address": "0xb1caBD8a32333b4af9dB06e58E2E571d0F64EBE1",
    "name": "totalSupply"
  },
  {
    //get CAKE decimals
    "address": "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
    "name": "decimals"
  },
  {
    //get BUSD decimals
    "address": "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    "name": "decimals"
  }
]

const multicall = async () => {
  const web3 = getWeb3NoAccount()
  const multi = new web3.eth.Contract(MultiCallAbi, '0x1ee38d535d541c55c9dae27b12edf090c608e6fb')
  const itf = new Interface(abi)
  // const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const calldata = callsK.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  // console.log('multi.methods.aggregate',multi.methods.aggregate)
  const mm = await multi.methods.aggregate(calldata).call().catch(error => console.error(`ret error: ${error}`))
  // console.log('calls',calls)
  console.log('multi',multi)
  console.log('itf',itf)
  console.log('calldata',calldata)
  console.log('mm',mm)
  const { returnData } = mm
  console.log('returnData',returnData)
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
// console.log('res',res)
  return res
}

multicall()
