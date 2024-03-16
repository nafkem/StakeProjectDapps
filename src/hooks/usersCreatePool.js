import { useCallback } from "react";
import { isSupportedChian } from "../utils/index.js";
import { getProvider } from "../constants/providers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import {
  getStakingContract,
  getRewardTokenContract,
} from "../constants/contracts";

const useCreatePool = (rewardRate) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChian(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const RewardTokenContract = getRewardTokenContract(signer);
    const StakeingContract = getStakingContract(signer);

    try {
      //   const estimatedGas = await RewardTokenContract.approve.estimateGas();
      const approveToken = await RewardTokenContract.approve(
        import.meta.env.VITE_staking_contract_address,
        BigInt(100000000000000000000)
      );

      const receipt = await approveToken.wait();

      console.log("Token Approved", approveToken);

      console.log("Approve Token Recipt", receipt);
    } catch (error) {
      console.log(error);
    }

    try {
      //   const estimatedGas = await StakeingContract.createPool.estimateGas();
      const transaction = await StakeingContract.createPool(rewardRate);
      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      //   if (receipt.status) {
      //     return console.log("vote successfull!");
      //   }

      //   console.log("vote failed!");
    } catch (error) {
      console.log(error);
      //   let errorText;
      //   if (error.reason === "Has no right to vote") {
      //     errorText = "You have not right to vote";
      //   } else if (error.reason === "Already voted.") {
      //     errorText = "You have already voted";
      //   } else {
      //     errorText = "An unknown error occured";
      //   }

      //   console.error("error: ", errorText);
    }
  }, [rewardRate, chainId, walletProvider]);
};

export default useCreatePool;