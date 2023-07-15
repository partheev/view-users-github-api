import { GithubUser, Repo } from '../types/types';
import { AxiosGithubClient } from './axios-client';

const getUserRepos = async (username: string): Promise<Repo[]> =>
    (await AxiosGithubClient.get(`/users/${username}/repos`, {})).data.map(
        (repo: Repo) => {
            return {
                id: repo.id,
                name: repo.name,
                private: repo.private,
                html_url: repo.html_url,
                description: repo.description,
                topics: repo.topics,
            };
        }
    );

const getUserDetails = async (username: string): Promise<GithubUser> => {
    return (await AxiosGithubClient.get(`/users/${username}`)).data;
};
const getUsedLanguages = async (username: string, repoNames: string[]) => {
    const repoLangs = (
        await Promise.all(
            repoNames.map((repoName) =>
                AxiosGithubClient.get(
                    `/repos/${username}/${repoName}/languages`
                )
            )
        )
    ).map((res) => Object.keys(res.data));
    return repoLangs;
};
export const GITHUB = {
    getUserDetails,
    getUserRepos,
    getUsedLanguages,
};
