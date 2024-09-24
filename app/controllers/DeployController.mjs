import jwt from 'jsonwebtoken';
import { privateKey } from "../privateKey.mjs";
import { simpleGit as git }from 'simple-git';
import { exec } from 'child_process';  // Correct way to import in ES modules


export const postDeploy = async (req, res) => {
    const token = req.cookies.authToken;
    const body = req.body;
    // Checking if token exists
    if (!token) {
        // If token is missing, return 401 Unauthorized status
        const message = `You did not provide an authentication token.`;
        return res.status(401).json({ message });
    }
    if (!body) {
        // If token is missing, return 401 Unauthorized status
        const message = `You did not provide request body.`;
        return res.status(401).json({ message });
    }
    jwt.verify(token, privateKey, async (error, decodedToken) => {
        if (error) {
            console.error("JWT Verification Error:", error);
            const message = error.name === 'TokenExpiredError'
                ? "Your session has expired. Please log in again."
                : "The request is invalid. Please check your login details.";
            return res.status(401).json({ message });
        }
        const repoUrl = body.repo;
        const destination = body.destination;
        
        try {
            cloneRepo(repoUrl, destination)
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        finally{
            buildDockerImage
            return res.status(200);
        }
    });
};

async function cloneRepo(repoUrl, destination) {
    try {
        console.log('Cloning repository...');
        await git.clone(repoUrl, destination);
        console.log('Repository cloned successfully!');
        
        // After cloning, proceed to build the Docker image
    } catch (error) {
        console.error(`Error cloning repository: ${error.message}`);
    }
}

function buildDockerImage() {
    const imageName = 'Dockerfile';

    console.log('Building Docker image...');

    // Use `exec` to run the Docker build command
    exec(`docker build -t ${imageName} .`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error building Docker image: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Docker image built successfully:\n${stdout}`);
    });
}