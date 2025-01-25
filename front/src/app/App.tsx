import RootLayout from "../shared/layout/Layout"
import Root from "./router/root";

function App() {
  return (
    <RootLayout header={false} footer={false}>
      <Root />
    </RootLayout>
  );
}

export default App
