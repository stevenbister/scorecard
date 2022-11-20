import { Avatar, chakra, Stack, Text, useCheckbox } from "@chakra-ui/react";

export default function PlayerCheckbox(props: any) {
  const { id, name } = props.player;
  const { state, getCheckboxProps, getInputProps, getLabelProps } =
    useCheckbox(props);

  return (
    <chakra.label
      style={{
        borderTopLeftRadius: "25px",
        borderBottomLeftRadius: "25px",
      }}
      cursor="pointer"
    >
      <input {...getInputProps()} hidden name="player" value={id} />
      <Stack direction="row" alignItems="center" {...getCheckboxProps()}>
        <Avatar
          name={name}
          size="md"
          borderWidth="5px"
          borderColor={state.isHovered || state.isChecked ? "purple.200" : ""}
        />

        <Text textAlign="center" {...getLabelProps()}>
          {name}
        </Text>
      </Stack>
    </chakra.label>
  );
}
