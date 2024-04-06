import React, { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import {
  Container,
  Stack,
  Text,
  Button,
  Image,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const FaceRecognition = () => {
  const [loading, setLoading] = useState(false); // State to track loading state

  const navigate = useNavigate();
  const toast = useToast(); // To use Chakra UI toast

  const handleFaceRecognition = () => {
    setLoading(true); // Set loading state to true when face recognition starts

    axios
      .post("http://localhost:5000/face-recognition")
      .then((response) => {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000, // Display duration
        });
      })
      .catch((error) => {
        console.error("Error performing face recognition:", error);
        toast({
          title: "Error",
          description: "An error occurred while face recognition.",
          status: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when face recognition completes (whether successful or failed)
      });
  };

  const handleGeocoding = () => {
    setLoading(true); // Set loading state to true when geocoding starts

    axios
      .get("http://localhost:5000/geocode-address")
      .then((response) => {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000, // Display duration
        });
      })
      .catch((error) => {
        console.error("Error", error);
        toast({
          title: "Error",
          status: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when geocoding completes (whether successful or failed)
      });
  };

  const handleReverseGeocoding = () => {
    setLoading(true); // Set loading state to true when reverse geocoding starts

    axios
      .get("http://localhost:5000/reverse-geocode")
      .then((response) => {
        toast({
          description: response.data.message,
          status: "success",
          duration: 3000, // Display duration
        });
      })
      .catch((error) => {
        console.error("Error", error);
        toast({
          title: "Error",
          status: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when reverse geocoding completes (whether successful or failed)
      });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Center vertically
          }}
        >
          <Spinner size="xl" color="white" speed="0.95s" thickness="6px" />
        </div>
      )}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Back"
        onClick={handleBack}
        position="absolute"
        top={6}
        left={6}
        zIndex={17}
      />
      {/* First Section */}
      <div style={{ height: "100vh", filter: loading ? "blur(4px)" : "none" }}>
        <Container maxW="6xl" px={{ base: 6, md: 3 }} py={19} pt="123px">
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="stretch"
            spacing={8}
          >
            <Stack
              direction="column"
              spacing={6}
              justifyContent="center"
              maxW="480px"
            >
              <Text
                fontSize="5xl"
                lineHeight={1}
                fontWeight="bold"
                textAlign="left"
                color="gray.700"
              >
                Facial Recognition
              </Text>
              <Text
                fontSize="1.2rem"
                textAlign="left"
                lineHeight="1.375"
                fontWeight="400"
                color="gray.700"
              >
                It will perform facial recognition to analyze facial features
                and expressions. Once recognized, an email notification will be
                sent.
              </Text>
              <Button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
                color="black"
                size="lg"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                zIndex={5}
                bg="#F0E4C7"
                transition="background-color 0.3s, color 0.3s"
                _hover={{ bg: "#977C64", color: "white" }}
                onClick={handleFaceRecognition}
              >
                Facial Recognition
              </Button>
            </Stack>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJ0Z7NfooyS3WS9vRY9a-olCpWORld9wvR7T4NLBltFZEfwu-zWSpwiX0fw0QhT5Fu5Y&usqp=CAU"
              alt="Capture Image"
              w={{ base: "100%", md: "50%" }}
              h="auto"
              objectFit="cover"
              borderRadius="md"
            />
          </Stack>
        </Container>
      </div>

      {/* Second Section */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "#F0E4C7",
          filter: loading ? "blur(4px)" : "none",
        }}
      >
        <Container maxW="6xl" px={{ base: 6, md: 3 }} py={19} pt="123px">
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="stretch"
            spacing={8}
          >
            <Stack
              direction="column"
              spacing={6}
              justifyContent="center"
              maxW="480px"
            >
              <Text
                fontSize="4xl"
                lineHeight={1}
                fontWeight="bold"
                textAlign="left"
                color="black"
              >
                Geocoding & Reverse Geocoding
              </Text>
              <Text
                fontSize="1.2rem"
                textAlign="left"
                lineHeight="1.375"
                fontWeight="400"
                color="black"
              >
                This process will perform geocoding to convert addresses into
                geographic coordinates, and reverse geocoding to convert
                geographic coordinates into addresses.
              </Text>
              <Stack direction="row" spacing={4}>
                <Button
                  w={{ base: "100%", sm: "auto" }}
                  h={12}
                  px={14}
                  color="white"
                  size="lg"
                  rounded="md"
                  mb={{ base: 2, sm: 0 }}
                  zIndex={5}
                  bg="#977C64"
                  transition="background-color 0.3s, color 0.3s"
                  _hover={{ bg: "#977C64", color: "black" }}
                  onClick={handleGeocoding}
                >
                  Geocoding
                </Button>
                <Button
                  w={{ base: "100%", sm: "auto" }}
                  h={12}
                  px={6}
                  color="white"
                  size="lg"
                  rounded="md"
                  mb={{ base: 2, sm: 0 }}
                  zIndex={5}
                  bg="#977C64"
                  transition="background-color 0.3s, color 0.3s"
                  _hover={{ bg: "#977C64", color: "black" }}
                  onClick={handleReverseGeocoding}
                >
                  Reverse Geocoding
                </Button>
              </Stack>
            </Stack>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-69nanL0gXpaZN0mih9H8KCtZlFldquBYuQ&usqp=CAU"
              alt="Train Image"
              w={{ base: "100%", md: "40%" }}
              h="auto"
              objectFit="cover"
              borderRadius="md"
            />
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default FaceRecognition;
