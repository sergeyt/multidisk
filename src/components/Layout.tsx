import Container from "@material-ui/core/Container";
import AppBar from "./AppBar";

export default function Layout({ children }) {
  return (
    <Container>
      <AppBar />
      <main>{children}</main>
    </Container>
  );
}
