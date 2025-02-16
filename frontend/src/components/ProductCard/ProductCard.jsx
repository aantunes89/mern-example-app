import { useProductStore } from "../../store/product.js";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { deleteProduct, updateProduct } = useProductStore();

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDelete = async (pid) => {
    const { success, message: description } = await deleteProduct(pid);

    !success
      ? toast({
          title: "Error",
          description,
          status: "error",
          isClosable: true,
        })
      : toast({
          title: "Success",
          description,
          status: "success",
          isClosable: true,
        });
  };

  const handleUpdate = async (id, product) => {
    const { success, message: description } = await updateProduct(id, product);

    if (!success) {
      toast({
        title: "Error",
        description,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description,
        status: "success",
        isClosable: true,
      });

      onClose();
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
        bg={bg}
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"x1"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              ></Input>

              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              ></Input>

              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              ></Input>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdate(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
