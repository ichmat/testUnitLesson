<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiTest extends WebTestCase
{
    public function testApiAddition(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testDefaultRoot(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello"], $responseData);
    }

    public function testAddAndDeleteToCart(): void
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $responseData = json_decode($response->getContent(), true);
        //$this->assertEquals(['message' => "Hello world"], $responseData);
        $mydata = $responseData[0];
        //print_r($mydata);
        $client->jsonRequest('POST', '/api/cart/'.$mydata['id'], ['quantity' => 1]);
        $client->jsonRequest('POST', '/api/cart/'.$mydata['id'], ['quantity' => 1]);
        $client->jsonRequest('GET', '/api/cart');
        $responseData = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals($mydata, $responseData['products']['0']);

        $client->jsonRequest('POST', '/api/cart/'.$mydata['id'], ['quantity' => 1000]);
        $responseData = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals($responseData, ["error" => "too many"]);
        
        $client->jsonRequest('DELETE', '/api/cart/'.$mydata['id']);
        $client->jsonRequest('GET', '/api/cart');
        $responseData = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals([], $responseData['products']);
    }

    public function testAddAndDeleteProduct() : void 
    {
        $client = static::createClient();
        $prod = ['name' => 'productname',
        'price' => '100',
        'quantity' => 25,
        'image' => ''
        ];
        $client->jsonRequest('POST', '/api/products', $prod);
        $productAdded = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals($prod['name'], $productAdded['name']);

        $client->jsonRequest('GET', '/api/products/'.$productAdded['id']);
        $responseData = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals($productAdded,$responseData);

        $client->jsonRequest('DELETE', '/api/products/'.$productAdded['id'] );
        $responseData = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals($responseData, ['delete' => 'ok']);
    }
}
