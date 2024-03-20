'use client'
import { Box, Flex, VStack, Text, Wrap, Image, InputGroup, InputLeftElement, Input, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Button, Heading } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import tokenList from "@/app/common/tokens";

export default function Price() {
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex ] = useState(0);
    const [endIndex, setEndIndex] = useState(8);
    const [tokensForPage, setTokensForPage] = useState<any[]>([]);

    const nextPage = () => {
        const updatedCurrentPage = currentPage + 1;
        const updatedStartIndex = (updatedCurrentPage - 1) * itemsPerPage;
        const updatedEndIndex = updatedStartIndex + itemsPerPage;
        const updatedTokensForPage = tokenList.slice(updatedStartIndex, updatedEndIndex);

        setCurrentPage(updatedCurrentPage);
        setStartIndex(updatedStartIndex);
        setEndIndex(updatedEndIndex);
        setTokensForPage(updatedTokensForPage);

        console.log(startIndex, endIndex)
    }

    const prevPage = () => {
        const updatedCurrentPage = currentPage - 1;
        const updatedStartIndex = (updatedCurrentPage - 1) * itemsPerPage;
        const updatedEndIndex = updatedStartIndex + itemsPerPage;
        const updatedTokensForPage = tokenList.slice(updatedStartIndex, updatedEndIndex);

        setCurrentPage(updatedCurrentPage);
        setStartIndex(updatedStartIndex);
        setEndIndex(updatedEndIndex);
        setTokensForPage(updatedTokensForPage);
        console.log(startIndex, endIndex)
    }

    // useEffect(()=> {
    //     console.log(currentPage, startIndex, endIndex, tokensForPage)
    // }, [currentPage, startIndex, endIndex, tokenList])
    return (
        <Box maxW='full' className="body" pl={8} pr={8} bg='gray.800'>
            <VStack>
                <Flex pt={16} w='60vw'>
                    <VStack>
                        <Wrap align='start' mt={24}>
                            <Text fontSize={50} fontWeight={800} color='white'>{`Oracle Price Feeds`}</Text>
                            <Text fontSize={20} color='gray.400'>Explore the decentralized oracle networks powered by Commune Oracle.</Text>
                            <InputGroup>
                                <Input type='text' placeholder='Search Price Feeds' />
                            </InputGroup>
                        </Wrap>
                    </VStack>
                    <Image src='/commune.webp' alt='diagram' w='30vw'></Image>
                </Flex>
                <SimpleGrid columns={8}>
                    {tokensForPage.map((token: any, index:any)=> (
                        <Card key={index}>
                            <CardHeader>
                                <Heading size='md'>{token.name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>{token.key}</Text>
                            </CardBody>
                            <CardFooter>
                                <Button>View here</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
                <Flex mt={4} justify="center">
                    <Button
                        disabled={currentPage === 1}
                        onClick={prevPage}
                        mr={2}
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={endIndex >= tokenList.length}
                        onClick={nextPage}
                        ml={2}
                    >
                        Next
                    </Button>
                    </Flex>
            </VStack>
        </Box>
    )
}