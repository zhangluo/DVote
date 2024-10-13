// services/voteService.ts
import apiClient from './apiClient';

export const getVotes = () => apiClient.get('/votes');

export const createVote = (voteData: { title: string; options: string[] }) =>
  apiClient.post('/votes', voteData);
