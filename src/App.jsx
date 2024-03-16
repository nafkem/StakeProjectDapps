import "./App.css";
import Header from "./componets/Header";
import { configureWeb3Modal } from "./connection/walletConnect";
import "@radix-ui/themes/styles.css";
import useCreatePool from "./hooks/useCreatePool";
import CreatePoolComponet from "./componets/CreatePoolComponet";
import { Container } from "@radix-ui/themes";
import StakeComponet from "./componets/StakeComponet";

configureWeb3Modal();

function App() {
  //const { loading, data: createPool } = useCreatePool();
  return (
    <div>
      <Header />
      <Container>
        <CreatePoolComponet />
        <StakeComponet />
      </Container>
    </div>
  );
}

export default App;