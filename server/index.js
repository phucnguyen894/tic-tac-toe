import express from 'express';
import cors from 'cors';
import { StreamChat } from 'stream-chat';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
const app = express()

app.use(cors())
app.use(express.json())
const api_key = "gp35cxsaxeg3";
const api_secret = "y4dpuhgsc539rvt2upkjykbfemdnwjvtwrtr5hye8az5vuq7jnsjsp2z27wbs6g4";
const serverClient = StreamChat.getInstance(api_key, api_secret)


app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body
        const userID = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userID);
        res.json({ token, userID, firstName, lastName, username, hashedPassword })
    }
    catch (error) {
        res.json(error);
    }
})

app.post("/login", async (req, res) => {
    
    try {
        const { username, password } = req.body;
        const { users } = await serverClient.queryUsers({ name: username });
        if (users.length === 0) return res.json({ message: "User not found" });
        

        const token = serverClient.createToken(users[0].id)
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);

        if (passwordMatch) {
            res.json({
                token,
                username,
                firstName: users[0].firstName,
                lastName: users[0].lastName,
                userID: users[0].id,
            })
        }
    }
    catch (e) {
        res.json(e)
    }
})
app.listen(3001, () => {
    console.log('Server is running on port 3001')
})