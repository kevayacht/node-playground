const listOfUsers = ['dummyUser1'];

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Landing page</title><head>');
        res.write('<body><h1>Hello welcome to the landing page</h1></body>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
       return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const username = parseBody.split('=')[1];
            console.log(username);
            listOfUsers.push(username);
            console.log(listOfUsers);
            res.writeHead(302, { 'Location': '/users' });
            return res.end();
        });
    }
    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>User page</title><head>');
        res.write('<body>');
        res.write('<h1>User list</h1>')
        res.write('<ul>');
        console.log(listOfUsers);
        listOfUsers.forEach(item => {
            res.write(`<li>${item}</li>`);
        })
        res.write('</ul>');
        res.write('</body>')
        res.write('</html>');
        res.end();
    }
}

exports.handler = requestHandler;