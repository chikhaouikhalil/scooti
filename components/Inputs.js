import {
  Checkbox,
  CheckIcon,
  FormControl,
  Input,
  Radio,
  Select,
  Switch,
  Text,
  HStack,
  Box,
  TextArea,
} from "native-base";
import { colors } from "../globalStyles";

export const CheckBox = ({ value, setValue, children, size }) => {
  // size :"sm",md","lg"
  return (
    <Checkbox
      size={size || "sm"}
      colorScheme="green"
      my="2"
      value={value}
      _text={{ fontSize: "sm" }}
      onChange={setValue}
    >
      {children}
    </Checkbox>
  );
};

export const InputText = ({
  value,
  setValue,
  isInvalid,
  isDisabled,
  placeholder,
  helper,
  keyboardType,
  secureTextEntry,
  InputLeftElement,
  InputRightElement,
  style,
  onSubmitEditing,
}) => {
  // size xs,sm,md,lg,xl,2xl
  // keyboardType : default, phone-pad
  return (
    <FormControl
      style={{ ...style }}
      isInvalid={isInvalid || false}
      bg="muted.50"
      isDisabled={isDisabled || false}
    >
      <Input
        onSubmitEditing={onSubmitEditing || null}
        secureTextEntry={secureTextEntry || false}
        autoComplete="off"
        InputLeftElement={InputLeftElement || null}
        InputRightElement={InputRightElement || null}
        value={value}
        onChangeText={(txt) => setValue(txt)}
        keyboardType={keyboardType || "default"}
        size="lg"
        h="12"
        fontWeight="400"
        color="muted.600"
        placeholder={placeholder}
        _focus={{ bg: "white", borderColor: colors.primary }}
      />
      {helper && <FormControl.HelperText>{helper}</FormControl.HelperText>}
    </FormControl>
  );
};

export const RadioButtons = ({ value, setValue, options }) => {
  // size :"sm",md","lg"
  return (
    <Radio.Group
      name="myRadioGroup"
      colorScheme="green"
      accessibilityLabel="favorite number"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
      }}
    >
      {options.map((option) => {
        return (
          <Radio
            size="sm"
            _text={{ fontSize: "sm" }}
            key={option.value}
            value={option.value}
            my={1}
          >
            {option.label}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};

export const SelectInput = ({
  value,
  setValue,
  options,
  label,
  placeholder,
}) => {
  return (
    <FormControl w="full">
      <FormControl.Label>{label}</FormControl.Label>
      <Select
        selectedValue={value}
        _input={{ fontSize: "sm" }}
        _item={{
          bg: "transparent",
          _text: { fontSize: "sm" },
          _pressed: { bg: "gray.100" },
        }}
        onValueChange={(val) => setValue(val)}
        accessibilityLabel={label}
        placeholder={placeholder}
        _selectedItem={{
          bg: colors.primary,
          _text: { color: "white", fontSize: "sm", fontFamily: "Regular" },
          endIcon: <CheckIcon color="white" size={5} />,
          _pressed: { bg: colors.primaryDark },
        }}
        mt="1"
      >
        {options.map((option) => (
          <Select.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Select>
    </FormControl>
  );
};

export const SwitchComponent = ({ size, value, setValue, disabled, label }) => {
  return (
    <HStack
      borderBottomWidth={1}
      borderColor="gray.200"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box w="3/4">
        <Text color={value ? "tertiary.600" : "dark.300"}>{label}</Text>
      </Box>
      <Box w="1/4">
        <Switch
          isDisabled={disabled || false}
          isChecked={value}
          onToggle={(val) => setValue(val)}
          size={size || "lg"}
          offTrackColor="gray.200"
          onTrackColor="tertiary.500"
          onThumbColor="tertiary.600"
          offThumbColor="gray.300"
        />
      </Box>
    </HStack>
  );
};

export const MultipleLineInput = ({
  value,
  setValue,
  placeholder,
  disabled,
  numberOfLines,
  style,
}) => {
  return (
    <TextArea
      p="3"
      style={{ ...style }}
      numberOfLines={numberOfLines}
      totalLines={7}
      isDisabled={disabled || false}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => setValue(text)} // for android and ios
      w="full"
      _focus={{ bg: "white", borderColor: colors.primaryDark }}
      _input={{ fontSize: "sm" }}
    />
  );
};
