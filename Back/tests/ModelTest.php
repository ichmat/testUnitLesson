<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Model\RickAndMortyModel;

class ModelTest extends WebTestCase
{
    public function testModel(): void
    {
        $image = "imgpath";
        $name = "nametest";
        $model = new RickAndMortyModel($name,$image);
        $this->assertEquals($name, $model->getName());
        $this->assertEquals($image, $model->getImage());

        $model->setName($name."1");
        $model->setImage($image."1");

        $this->assertEquals($name."1", $model->getName());
        $this->assertEquals($image."1", $model->getImage());
    }
}
