import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";
import ManagerABI from "./abi/Manager.json";
import { Signer } from "ethers";
import { Manager } from "./types/ethers-contracts";

const ManagerAddress = "0xD73398d206B65e186e3ef63bD936b00e35cE2155";

function App() {
  const [count, setCount] = useState(0);
  const [provider, setProvider] = useState<BrowserProvider>();
  const [signer, setSigner] = useState<Signer>();
  async function connect() {
    if (!provider) return;

    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    // const signature = await signer.signMessage(message);
    // const { data: { user, token } } = await axios.post(`http://localhost:8000/auth/login`, { address, signature });
    // auth.setLoginData({
    //     user,
    //     signer,
    //     token,
    //     isLoggedIn: true,
    //     expireTimeStamp: 0
    // });
    setSigner(signer);
    console.log(address);
  }

  useEffect(() => {
    if (!signer) return;
    const contract = new ethers.Contract(
      ManagerAddress,
      ManagerABI,
      signer
    ) as any as Manager;

    console.log(contract);
    (async () => {
      console.log((await contract.campaigns(2)).raised);

      // constawait contract.invest(2, { value: ethers.parseEther("0.01") });

      // const startTime = (new Date().getTime() / 1000) | 0;
      // const endTime = startTime + 60 * 60;
      // const vestingEndTime = endTime + 24 * 60 * 60;
      // const totalRequirement = ethers.parseEther("0.1");
      // const maxTokenSupply = ethers.parseEther("10");
      // const upAddress = "0x6eA4Ea5c3cD5c1f77F9D2114659cBaCAeA97EdB7";

      // const r = await contract.createCampaign(
      //   "Token Name 2",
      //   "TN2",
      //   startTime.toString(),
      //   endTime.toString(),
      //   vestingEndTime.toString(),
      //   totalRequirement,
      //   maxTokenSupply,
      //   upAddress
      // );

      // console.log(r);
    })();
  }, [signer]);

  useEffect(() => {
    const provider = new ethers.BrowserProvider((window as any).lukso);
    setProvider(provider);
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <button onClick={connect}>Connect</button>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
