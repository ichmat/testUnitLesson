<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Exception\RequestException;
//use GuzzleHttp\Tests\Server;

class ApiActionTest extends WebTestCase
{
    // TO DO : TEST AVEC EXCEPTION
    //private $handlerStack;

    protected function setUp(): void {
        // $status = 200;
        // $headers = ['X-Foo' => 'Bar'];
        // $body = 'hello!';
        // $protocol = '1.1';
        // $response = new Response($status, $headers, $body, $protocol);
    }

    public function testRickAndMortyApiService(): void
    {
        $mock = new MockHandler([
            new Response(200, ['content-type' => 'application/json'], "{'results':[{'name':'character1', 'image': 'imgpath1'},{'name':'character2', 'image': 'imgpath2'},{'name':'character3', 'image': 'imgpath3'}]}"),
        ]);

        $handlerStack = HandlerStack::create($mock);
        $client = new Client(['handler' => $handlerStack]); 
        $response = $client->request('GET', '/products');
        $this->assertEquals($response->getStatusCode(),200);
        
    }

    
}
