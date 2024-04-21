import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box display="flex" flexDirection="column" height="100dvh">
      <Header />
      <Box flexGrow={1}>{children}</Box>
      <Footer />
    </Box>
  );
};
