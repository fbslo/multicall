const Web3 = require('web3')
const { HttpProviderOptions } = require('web3-core-helpers')
const getRpcUrl = require('./getRpcUrl')

const RPC_URL = getRpcUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

module.exports = { getWeb3NoAccount }
