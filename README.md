1) Create User 
    api linK : /user/singup
    body data : {
        email : string,
        name : string,
        password : string | number
    }

2) Login user
    api linK : /user/login
    body data : {
        email : userEmail,
        password : userPassword,
    }

3) Login user With jwt
    api linK : /user/login/token
    headers data :{
        token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmJhN2Q3NDJhYWZkZTJiODIzZTM1NSIsImlhdCI6MTY2MDcyNzg1NCwiZXhwIjoxNjYzMzE5ODU0fQ.S0lSZEz4Yoq4z91PdI0XHM24xB_5imQCBJN2x-7m8pM"
    }
