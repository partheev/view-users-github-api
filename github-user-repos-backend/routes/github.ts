import express from 'express';
import { HTTP_CODES } from '../constants/httpCodes';
import { GITHUB } from '../service/github-apis';
import { GithubUser, Repo } from '../types/types';

const router = express.Router();

router.get('/check-username', async (req, res) => {
    const username = req.query.username as string;

    if (!username || username.length == 0) {
        res.status(HTTP_CODES.BAD_REQUEST);
        res.send({
            message: 'Invalid query. [username] required',
        });
        return;
    }

    try {
        const userDetailsResponse = await GITHUB.getUserDetails(username);
        const userDetails: GithubUser = {
            name: userDetailsResponse.name,
            avatar_url: userDetailsResponse.avatar_url,
            bio: userDetailsResponse.bio,
            followers: userDetailsResponse.followers,
            following: userDetailsResponse.following,
            location: userDetailsResponse.location,
            login: userDetailsResponse.login,
            public_repos: userDetailsResponse.public_repos,
            twitter_username: userDetailsResponse.twitter_username,
        };

        res.status(HTTP_CODES.SUCCESS);
        res.send({ userDetails });
    } catch (err) {
        res.status(HTTP_CODES.NOT_FOUND).send({ message: 'Invalid username' });
    }
});

router.get('/repos', async (req, res) => {
    const username = req.query.username as string;

    if (!username || username.length == 0) {
        res.status(HTTP_CODES.BAD_REQUEST);
        res.send({ message: 'Invalid query parameter. [username] required' });
        return;
    }

    // api request to github api to fetch user repos
    try {
        const [repos, userDetailsResponse] = await Promise.all([
            GITHUB.getUserRepos(username),
            GITHUB.getUserDetails(username),
        ]);
        const userDetails: GithubUser = {
            name: userDetailsResponse.name,
            avatar_url: userDetailsResponse.avatar_url,
            bio: userDetailsResponse.bio,
            followers: userDetailsResponse.followers,
            following: userDetailsResponse.following,
            location: userDetailsResponse.location,
            login: userDetailsResponse.login,
            public_repos: userDetailsResponse.public_repos,
            twitter_username: userDetailsResponse.twitter_username,
        };

        const repoLangs = await GITHUB.getUsedLanguages(
            username,
            repos.map((repo) => repo.name)
        );
        for (let i = 0; i < repos.length; i++) {
            repos[i]['language'] = repoLangs[i];
        }

        res.send({ repositories: repos, userDetails });
    } catch (err) {
        res.status(HTTP_CODES.NOT_FOUND);
        res.send({
            message: 'Invalid Username. Please enter valid github username.',
            error: err,
        });
    }
});

export const GithubRoutes = router;
