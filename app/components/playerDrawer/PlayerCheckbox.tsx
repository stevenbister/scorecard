import { Avatar, chakra, Stack, Text, useCheckbox } from "@chakra-ui/react";

export default function PlayerCheckbox(props: any) {
  const { id, player_name } = props.player;
  const { state, getCheckboxProps, getInputProps, getLabelProps } =
    useCheckbox(props);

  return (
    <chakra.label
      style={{
        borderTopLeftRadius: "25px",
        borderBottomLeftRadius: "25px",
      }}
      cursor="pointer"
      bg={state.isHovered || state.isChecked ? "purple.100" : ""}
    >
      <input {...getInputProps()} hidden name="player" value={id} />
      <Stack direction="row" alignItems="center" {...getCheckboxProps()}>
        <Avatar name={player_name} size="md" />

        <Text textAlign="center" {...getLabelProps()}>
          {player_name}
        </Text>
      </Stack>
    </chakra.label>
  );
}