import { Signer, constants, ethers } from "ethers";
import { addressesByChainId } from "src/config/constants/contracts";
import { CHAIN_ID } from "src/types/enums";

export enum BridgeDirection {
    USDC_POLYGON_TO_ARBITRUM_USDC = "USDC_POLYGON_TO_ARBITRUM_USDC",
    ETH_POLYGON_TO_ARBITRUM_ETH = "ETH_POLYGON_TO_ARBITRUM_ETH",
}
export interface StateInterface {
    bridgeStates: {
        [BridgeDirection.USDC_POLYGON_TO_ARBITRUM_USDC]: BridgeState;
        [BridgeDirection.ETH_POLYGON_TO_ARBITRUM_ETH]: BridgeState;
    };
}

export interface BridgeState {
    destTxHash?: string;
    status?: BridgeStatus;
    /**
     * True for any bridging thunk in progress
     */
    isBridging?: boolean;
    checkingStatus?: boolean;
    socketSourceTxHash?: string;
}

export enum BridgeStatus {
    APPROVING = "APPROVING",
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
}

export interface PolyUsdcToArbUsdcArgs {
    polygonSigner: Signer;
    currentWallet: string;
    refechBalance: Function;
    direction: BridgeDirection;
}

export const BridgeChainInfo = {
    [BridgeDirection.USDC_POLYGON_TO_ARBITRUM_USDC]: {
        sourceChain: "POLYGON",
        destinationChain: "ARBITRUM",
        sourceChainId: CHAIN_ID.POLYGON,
        dstChainId: CHAIN_ID.ARBITRUM,
        sourceAddress: addressesByChainId[CHAIN_ID.POLYGON].usdcAddress,
        dstAddress: addressesByChainId[CHAIN_ID.ARBITRUM].usdcAddress,
        sourceName: "USDC",
        dstName: "USDC",
        sourceDecimals: 6,
        dstDecimals: 6,
    },
    [BridgeDirection.ETH_POLYGON_TO_ARBITRUM_ETH]: {
        sourceChain: "POLYGON",
        destinationChain: "ARBITRUM",
        sourceChainId: CHAIN_ID.POLYGON,
        dstChainId: CHAIN_ID.ARBITRUM,
        sourceAddress: ethers.utils.getAddress("0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"),
        dstAddress: constants.AddressZero,
        sourceName: "ETH",
        dstName: "ETH",
        sourceDecimals: 18,
        dstDecimals: 18,
    },
};
