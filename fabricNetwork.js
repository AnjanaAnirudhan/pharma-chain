const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '..', 'config', 'connection.json');
const walletPath = path.join(process.cwd(), 'wallet');

async function connectToNetwork(user) {
    try {
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const userExists = await wallet.get(user);
        if (!userExists) {
            throw new Error(`User ${user} does not exist in the wallet`);
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: user,
            discovery: { enabled: true, asLocalhost: true }
        });

        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('pharmachain');

        return { gateway, contract };
    } catch (error) {
        console.error(`Error connecting to network: ${error}`);
        throw new Error(error);
    }
}

async function submitTransaction(user, transactionName, ...args) {
    const { gateway, contract } = await connectToNetwork(user);
    try {
        const result = await contract.submitTransaction(transactionName, ...args);
        return result.toString();
    } finally {
        gateway.disconnect();
    }
}

async function evaluateTransaction(user, transactionName, ...args) {
    const { gateway, contract } = await connectToNetwork(user);
    try {
        const result = await contract.evaluateTransaction(transactionName, ...args);
        return result.toString();
    } finally {
        gateway.disconnect();
    }
}

module.exports = { submitTransaction, evaluateTransaction };
