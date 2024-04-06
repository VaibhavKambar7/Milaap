import * as React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Image,
  Skeleton,
  Box,
  Link,
  Icon,
} from "@chakra-ui/react";
import { MdBolt } from "react-icons/md";

const HeroSection = () => {
  const textColor = useColorModeValue("#887E64", "#F0E4C7"); // Text color
  const bgColor = useColorModeValue("#F0E4C7", "#887E64"); // Background color for buttons

  return (
    <Container maxW="6xl" px={{ base: 6, md: 3 }} py={19} pt="63px">
      <Stack direction={{ base: "column", md: "row" }} justifyContent="center">
        <Stack
          direction="column"
          spacing={6}
          justifyContent="center"
          maxW="480px"
        >
          <chakra.h1
            fontSize="5xl"
            lineHeight={1}
            fontWeight="bold"
            textAlign="left"
            color="black.200"
          >
            Connecting Hearts, <br />
            Reuniting Families
          </chakra.h1>
          <Text
            fontSize="1.2rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.700"
          >
            <u>
              <b>Milaap</b>
            </u>
            , powered by AI and ML, is a dedicated initiative committed to
            finding and reuniting missing individuals with their families across
            India. We leverage cutting-edge technology and compassionate
            teamwork to ensure that no one is left behind.
          </Text>
          <HStack
            spacing={{ base: 0, sm: 2 }}
            mb={{ base: "3rem !important", sm: 0 }}
            flexWrap="wrap"
          >
            <a href="/add-user">
              <chakra.button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
                color="black"
                size="lg"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                zIndex={5}
                lineHeight={1}
                bg={bgColor}
                transition="background-color 0.3s, color 0.3s"
                _hover={{ bg: "#977C64", color: "white" }}
              >
                <chakra.span> Get Started </chakra.span>
              </chakra.button>
            </a>
          </HStack>
        </Stack>
        <Box ml={{ base: 0, md: 5 }} pos="relative">
          <Image
            w="100%"
            h="100%"
            minW={{ base: "auto", md: "30rem" }}
            objectFit="cover"
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpG9bHjSuWwwoxeaBaA-MkUzHJPON9wpteFQ&usqp=CAU`}
            rounded="md"
            fallback={<Skeleton />}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default HeroSection;
