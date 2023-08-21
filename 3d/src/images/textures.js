import { NearestFilter, RepeatWrapping, TextureLoader } from 'three';

import { grassImg, stoneImg } from './images';

const grassTexture = new TextureLoader().load(grassImg);

grassTexture.magFilter = NearestFilter;
grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;

const stoneTexture = new TextureLoader().load(stoneImg);

stoneTexture.magFilter = NearestFilter;
stoneTexture.wrapS = RepeatWrapping;
stoneTexture.wrapT = RepeatWrapping;

export {
    grassTexture,
    stoneTexture,
}