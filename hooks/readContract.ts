
import { useReadContracts } from 'wagmi'
import { abi } from '@/config/contract/abi';
const readDvoteContract = ()=> {
    const contractConfig = {
        address: '0x68C97A5228FDABdA5Cf862a2024e7cd2Ff2e16f1',
        abi,
    } as const

    const result = useReadContracts({
        contracts: [
          {
            ...contractConfig,
            functionName: 'getAllElections',
          },
          {
            ...contractConfig,
            functionName: 'getElectionInfo',
          },
          {
            ...contractConfig,
            functionName: 'getCandidates',
            // args: [69],
          },
          {
            ...contractConfig,
            functionName: 'getCandidatorInfo',
            // args: [69],
          },
        ],
      })

  return result;
}

export default readDvoteContract;