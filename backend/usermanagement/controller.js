const crypto = require('crypto');
const { Client } = require('pg')

function generateSecureRandomString() {
    return crypto.randomBytes(Math.ceil(50 / 2))
      .toString('hex') // Convert to hexadecimal string
      .slice(0, 50);   // Trim to the desired length
    }

function hashString(inputString, algorithm = 'sha256', encoding = 'hex') {
    const hash = crypto.createHash(algorithm);
    hash.update(inputString);
    return hash.digest(encoding);
    }

async function login(username , password) {
    const client = new Client({
        user: 'postgres',
        database:'no_tally',
        password: 'thomasxD314$',
        host: 'localhost',
        port: 3141
        })
    await client.connect()
    const query = `SELECT password,salt from users where username=$1`;
    const values = [username]
    try {
        const res = await client.query(query, values);
        if (res.rows.length > 0) {
            const storedHashedPassword = res.rows[0].password;
            const storedSalt = res.rows[0].salt;
            const hashedPasswordAttempt = hashString(password + storedSalt);
            if (hashedPasswordAttempt === storedHashedPassword) {
                console.log('Login successful!');
                return true; // Or return user information/token
            } else {
                console.log('Incorrect password.');
                return false;
            }
        } 
        else {
                console.log('User not found.');
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            await client.end();
        }
    }

async function createUser(name,email,username,password) {
        const client = new Client({
            user: 'postgres',
            database:'no_tally',
            password: 'thomasxD314$',
            host: 'localhost',
            port: 3141
            })
        const salt = generateSecureRandomString();
        await client.connect();
        const hashedPassword = hashString(password + salt); // Hash the password *after* generating the salt
        const query = `
            INSERT INTO users (username, email, salt, password, name)
            VALUES ($1, $2, $3, $4, $5)`;
        const values = [username, email, salt, hashedPassword, name];        
        try {
            const res = await client.query(query, values);
            console.log('User created successfully:', res);
            } catch (err) {
            console.error('Error creating user:', err);
            } finally {
            await client.end();
        }
    }

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const logInResult = await login(username, password);
    res.send(logInResult);
};

exports.createUser = async (req, res) => {
    const { name, email, username, password } = req.body;
    const creationResult = await createUser(name, email, username, password);
    res.send(creationResult);
};
