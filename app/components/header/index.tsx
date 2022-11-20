import {
  Link as ChakraLink,
  List,
  ListItem,
  VisuallyHidden,
} from "@chakra-ui/react";
import type { LinksFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import { FaChessBoard, FaUserAstronaut, FaUsers } from "react-icons/fa";
import styles from "./header.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Header({
  currentGameId,
}: {
  currentGameId?: string | null;
}) {
  return (
    <header className="header">
      <nav className="header__nav">
        <List>
          <ListItem>
            <ChakraLink
              as={NavLink}
              to={currentGameId ? `/game/${currentGameId}` : "/"}
              className="header__control"
            >
              <VisuallyHidden>Home</VisuallyHidden>
              <FaChessBoard size={24} />
            </ChakraLink>
          </ListItem>

          <ListItem>
            <ChakraLink as={NavLink} to="/players" className="header__control">
              <VisuallyHidden>Players</VisuallyHidden>
              <FaUsers size={24} />
            </ChakraLink>
          </ListItem>

          <ListItem>
            <ChakraLink as={NavLink} to="/account" className="header__control">
              <VisuallyHidden>Account</VisuallyHidden>
              <FaUserAstronaut size={24} />
            </ChakraLink>
          </ListItem>
        </List>
      </nav>
    </header>
  );
}
