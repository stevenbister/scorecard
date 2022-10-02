import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { MdOutlineAdd } from "react-icons/md";
import type { definitions } from "~/types/supabase";
import PlayerCheckbox from "./PlayerCheckbox";

interface Props {
  players: definitions["players"][];
  playersInGame: definitions["players"]["id"][];
}

export default function PlayerDrawer({ players, playersInGame }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetcher = useFetcher();

  useEffect(() => {
    // Close our modal once the form as submitted
    if (fetcher.type === "done") {
      onClose();
    }
  }, [fetcher, onClose]);

  return (
    <>
      <Button leftIcon={<MdOutlineAdd />} colorScheme="purple" onClick={onOpen}>
        Add player
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Players</DrawerHeader>

          <DrawerBody>
            <fetcher.Form id="add-players" method="post">
              <Stack spacing={4}>
                {Array.isArray(players)
                  ? players.map((player) => {
                      const isSelected = playersInGame.includes(player.id);

                      return (
                        <PlayerCheckbox
                          key={player.id}
                          player={player}
                          defaultChecked={isSelected}
                        />
                      );
                    })
                  : null}
              </Stack>
              <input
                type="hidden"
                id="addPlayer"
                name="_action"
                value="ADD_PLAYER"
              />
            </fetcher.Form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              leftIcon={<MdOutlineAdd />}
              type="submit"
              form="add-players"
              colorScheme="purple"
              isLoading={
                fetcher.state === "submitting" || fetcher.state === "loading"
              }
            >
              Add
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
