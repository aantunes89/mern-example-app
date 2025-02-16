import { useState } from "react";
import {
  Container,
  Heading,
  VStack,
  Box,
  Input,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();

  const { createProduct } = useProductStore();

  const initForm = () => setNewProduct({ name: "", price: "", image: "" });

  const handleAddProduct = async () => {
    const { success, message: description } = await createProduct(newProduct);

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

    initForm();
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create new Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            ></Input>

            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            ></Input>

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            ></Input>

            <Button
              width={"100%"}
              colorScheme="blue"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
