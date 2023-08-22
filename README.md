<a name="readme-top"></a>

<h3 align="center">Portfolio Matthias Van de Casteele</h3>

  <p align="center">
    React Three + Socket.io
  </p>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

React-Three tower defence game with local 2player multiplayer via socket.io
This Project has been made for an assignment for development V.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

React & Socket.io

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites

* nodemon

  ```sh
  npm install nodemon -g
  ```

* serve
```sh
npm i serve -g
```

* Docker
https://www.docker.com/


### Singleplayer

1. Clone the repo
   ```sh
   git clone https://github.com/EHB-MCT/portfolio-Matthias-VdC.git
   ```
2. Go into the app
   ```sh
   cd 3d
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Run application
   ```sh
   serve -s build
   ```

### Multiplayer

   ```
   Same steps as singleplayer required + the following steps in a new terminal
   ```

1. Go into the api
   ```sh
   cd 3d/api
   ```

With Nodemon

2. Install dependencies
   ```sh
   npm install
   ```
3. Start the api with nodemon
   ```sh
   npm start
   ```

With Docker

2. Build Docker image
   ```sh
   docker build -t 3d-api .
   ```

3. Run image in container
   ```sh
   docker run -p 8000:8000 -d 3d-api
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>