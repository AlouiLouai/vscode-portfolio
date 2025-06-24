import { HStack, Image, Text, Icon as ChakraIcon } from "@chakra-ui/react"; // Import ChakraIcon for react-icons
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons"; // Import IconType

interface Props {
  Icon: string | IconType; // Allow Icon to be a string (image path) or IconType
  Label: string;
  boxSize: string;
  Link: string;
  onSelectPage: (page: string) => void;
}

const ExplorerItem = ({ Icon, Label, boxSize, Link, onSelectPage }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelectPage(Label);
    navigate(Link);
  };
  return (
    <HStack
      width="100%"
      height={6}
      cursor="pointer"
      userSelect="none"
      _hover={{ bg: "gray.800" }}
      onClick={handleClick}
    >
      {typeof Icon === "string" ? (
        <Image boxSize={boxSize} src={Icon} />
      ) : (
        <ChakraIcon as={Icon} boxSize={boxSize} />
      )}
      <Text
        fontSize="15px"
        width="100%"
        color="gray.200"
        _hover={{ color: "white" }}
      >
        {Label}
      </Text>
    </HStack>
  );
};

export default ExplorerItem;
