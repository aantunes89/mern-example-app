import { Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard/ProductCard";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProducts = () => {
    return products.map((product, i) => (
      <ProductCard key={i} product={product} />
    ));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container maxW="container.x1" py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
            mb={4}
          >
            Current Products 🚀
          </Text>
        </VStack>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {renderProducts()}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </Container>
    </Suspense>
  );
};

export default HomePage;
