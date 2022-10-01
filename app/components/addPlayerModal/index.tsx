import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { useUser } from "~/utils";

export default function AddPlayerModal() {
  const user = useUser();
  const fetcher = useFetcher();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Close our modal once the form as submitted
    if (fetcher.type === "done") {
      onClose();
    }
  }, [fetcher, onClose]);

  return (
    <>
      <Button onClick={onOpen}>Add new player</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new player</ModalHeader>
          <ModalCloseButton />

          <Stack as={fetcher.Form} method="post" noValidate spacing={4} p={6}>
            <FormControl>
              <FormLabel>
                <Text as="b" color="purple.800">
                  Name
                </Text>
              </FormLabel>
              <Input type="text" name="name" id="name" />
            </FormControl>

            <input type="hidden" id="id" name="id" value={user.id} />
            <input type="hidden" id="create" name="_action" value="CREATE" />

            <Button
              colorScheme="purple"
              type="submit"
              isLoading={
                fetcher.state === "submitting" || fetcher.state === "loading"
              }
            >
              Save Player
            </Button>
          </Stack>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
