import { getStakingContract } from "../constants/contracts";
import { useEffect, useState } from "react";
// import { getProposalContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
// import { decodeBytes32String } from "ethers";

const useViewRewards = (poolId, address) => {
  const [viewReward, setViewReward] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    const contract = getStakingContract(readOnlyProvider);
    contract
      .getUserClaimableReward(poolId, address)
      .then((res) => {
        const converted = res.map((item) => ({
          amount: item._reward,
        }));
        console.log("x", converted);
        setViewReward({
          loading: false,
          data: converted,
        });
      })
      .catch((err) => {
        console.error("Error Fetching Proposals", err);
        setViewReward((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  return viewReward;
};

export default useViewRewards;