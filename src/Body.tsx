import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Farms from "src/pages/Farms/Farms";
import Dashboard from "src/pages/Dashboard/Dashboard";
import Test from "./pages/Test/Test";
import usePriceOfTokens from "./hooks/usePriceOfTokens";
import { useFarmApys } from "./hooks/farms/useFarmApy";
import useBalances from "./hooks/useBalances";
import useFarmDetails from "./hooks/farms/useFarmDetails";
import useTotalSupplies from "./hooks/useTotalSupplies";
import { useDecimals } from "./hooks/useDecimals";
import Buy from "./pages/Buy/Buy";
import useAccountData from "./hooks/useAccountData";
import useBridge from "./hooks/bridge/useBridge";
import Stats from "./pages/Stats/Stats";
import Front from "./pages/Front/Front";
import { RoutesPaths } from "./config/constants";
import Swap from "./pages/Swap/Swap";
import Bridge from "./pages/Bridge/Bridge";
import { SignInRequiredWrapper } from "./components/SignInRequiredWrapper/SignInRequiredWrapper";
import { BridgeDirection } from "./state/ramp/types";
import { Snapshot } from "./pages/Snapshot/Snapshot";

function Body() {
    const { reloadPrices } = usePriceOfTokens();
    const { reloadApys } = useFarmApys();
    const { reloadBalances } = useBalances();
    const { reloadDecimals } = useDecimals();
    const { reloadSupplies } = useTotalSupplies();
    const { reloadFarmData } = useFarmDetails();
    const { fetchAccountData } = useAccountData();
    const { isBridgePending } = useBridge(BridgeDirection.USDC_POLYGON_TO_ARBITRUM_USDC);
    const { isBridgePending: isBridgePendingEth } = useBridge(BridgeDirection.ETH_POLYGON_TO_ARBITRUM_ETH);

    useEffect(() => {
        isBridgePending();
        isBridgePendingEth();
    }, []);

    useEffect(() => {
        fetchAccountData();
        // after 5 min reload
        const interval = setInterval(() => {
            if (document.hidden) return;
            fetchAccountData();
        }, 1000 * 60 * 5);
        return () => clearInterval(interval);
    }, [fetchAccountData]);

    useEffect(() => {
        reloadPrices();
        // after 5 min reload prices
        const interval = setInterval(() => {
            if (document.hidden) return;
            reloadPrices();
        }, 1000 * 60 * 5);
        return () => clearInterval(interval);
    }, [reloadPrices]);

    useEffect(() => {
        reloadApys();
        // after 30 min reload apys
        const interval = setInterval(() => {
            reloadApys();
        }, 1000 * 60 * 30);
        return () => clearInterval(interval);
    }, [reloadApys]);

    useEffect(() => {
        reloadBalances();
        // after 30 s reload balances
        const interval = setInterval(() => {
            if (document.hidden) return;
            reloadBalances();
        }, 1000 * 60 * 0.5);
        return () => clearInterval(interval);
    }, [reloadBalances]);

    useEffect(() => {
        reloadSupplies();
        // after 2 min reload supplies
        const interval = setInterval(() => {
            if (document.hidden) return;
            reloadSupplies();
        }, 1000 * 60 * 2);
        return () => clearInterval(interval);
    }, [reloadSupplies]);

    useEffect(() => {
        reloadDecimals();
    }, [reloadDecimals]);

    useEffect(() => {
        reloadFarmData();
    }, [reloadFarmData]);

    return (
        <Routes>
            <Route path={RoutesPaths.Home} element={<Home />}>
                <Route path="" element={<Dashboard />} />
                <Route
                    path={RoutesPaths.Deposit}
                    element={
                        <SignInRequiredWrapper>
                            <Front />
                        </SignInRequiredWrapper>
                    }
                />
                <Route
                    path={RoutesPaths.Buy}
                    element={
                        <SignInRequiredWrapper>
                            <Buy />
                        </SignInRequiredWrapper>
                    }
                />
                <Route path={RoutesPaths.Farms} element={<Farms />} />
                <Route
                    path={RoutesPaths.Swap}
                    element={
                        <SignInRequiredWrapper>
                            <Swap />
                        </SignInRequiredWrapper>
                    }
                />
                <Route
                    path={RoutesPaths.Bridge}
                    element={
                        <SignInRequiredWrapper>
                            <Bridge />
                        </SignInRequiredWrapper>
                    }
                />
                <Route path={RoutesPaths.Test} element={<Test />} />
                <Route path={RoutesPaths.Stats} element={<Stats />} />
                <Route path={RoutesPaths.Dao} element={<Snapshot />} />
                <Route path="*" element={<h3 style={{ color: "white" }}>Not Found</h3>} />
            </Route>
        </Routes>
    );
}

export default Body;
