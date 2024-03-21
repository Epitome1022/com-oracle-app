"use client";
import {
  Box,
  Flex,
  VStack,
  Text,
  Wrap,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import * as tokens from "@/app/common/tokens";

type tokensJson = {
  [name: string]: [
    {
      name: string;
      logoURI: string;
      url: string;
      tags: any[];
    }
  ];
};

const tokenList = tokens as unknown as tokensJson;
const tokenKeys = Object.keys(tokenList);

export default function Price() {
  const itemsPerPage = 24;
  const [tokensForPage, setTokensForPage] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(tokenList);

  const showPage = (currentPage: number) => {
    const updatedStartIndex = (currentPage - 1) * itemsPerPage;
    const updatedEndIndex = updatedStartIndex + itemsPerPage;
    const updatedTokensForPage = [
      ...tokenKeys.slice(updatedStartIndex, updatedEndIndex),
    ];

    setTokensForPage(updatedTokensForPage);
    console.log(updatedStartIndex, updatedEndIndex);
  };

  useEffect(() => {
    showPage(currentPage);
  }, [currentPage]);

  return (
    <Box maxW="full" className="body" pl={8} pr={8} bg="gray.800">
      <VStack>
        <Flex pt={16} w="60vw">
          <VStack>
            <Wrap align="start" mt={24}>
              <Text
                fontSize={50}
                fontWeight={800}
                color='wheat'
              >{`Oracle Price Feeds`}</Text>
              <Text fontSize={20} color="gray.400">
                Explore the decentralized oracle networks powered by Commune
                Oracle.
              </Text>
              <InputGroup>
                <Input type="text" placeholder="Search Price Feeds" />
              </InputGroup>
            </Wrap>
          </VStack>
          <Image src="/commune.webp" alt="diagram" w="30vw"></Image>
        </Flex>
        <SimpleGrid columns={4} w="60vw" spacing={4}>
          {tokensForPage.length > 0 &&
            tokensForPage.map((tokenKey: any, index: any) => (
              <Card key={index} bg="gray.900">
                <CardHeader>
                  <Image
                    src={tokenList[tokenKey].logoURI}
                    w="2rem"
                    h="2rem"
                    me={5}
                  ></Image>
                </CardHeader>
                <CardBody>
                  <Heading size="md" color='wheat'>
                    {tokenList[tokenKey].name}
                  </Heading>
                  {/* <Text color='gray.800' style={{'textTransform': 'uppercase'}}>{tokenList[tokenKey].tags[0]}</Text> */}
                </CardBody>
                {/* <CardFooter>
                                <Button size='sm' bg='green.500' color='wheat'>View Details</Button>
                            </CardFooter> */}
              </Card>
            ))}
        </SimpleGrid>
        <Flex my={4} justify="center">
          <Button
            disabled={currentPage <= 1}
            onClick={() => {
              if (currentPage <= 1) setCurrentPage(1);
              else setCurrentPage(currentPage - 1);
              // showPage(currentPage)
            }}
            mr={2}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentPage > tokenKeys.length / 24)
                setCurrentPage(tokenKeys.length);
              else setCurrentPage(currentPage + 1);
              // showPage(currentPage)
            }}
            ml={2}
            colorScheme="blue"
          >
            Next
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
