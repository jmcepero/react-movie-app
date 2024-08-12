import movieDB from '../../api/movieDB';
import {
  PeopleDetailResponse,
  PeoplesResponse,
} from '../entities/PeopleInterfaces';

export interface PeopleRemoteDataSource {
  getPopularPeople(page?: number): Promise<PeoplesResponse>;
  findPeople(term: string, page: number): Promise<PeoplesResponse>;
  personDetail(id: string): Promise<PeopleDetailResponse>;
}

export const peopleRemoteDataSource: PeopleRemoteDataSource = {
  async getPopularPeople(page?: number): Promise<PeoplesResponse> {
    let url = `person/popular`;
    if (page) {
      url = url + `?page=${page}`;
    }
    const resp = await movieDB.get<PeoplesResponse>(url);

    return resp.data;
  },
  async findPeople(term: string, page: number): Promise<PeoplesResponse> {
    let url = `search/person?query=${term}&page=${page}`;
    const resp = await movieDB.get<PeoplesResponse>(url);
    return resp.data;
  },
  async personDetail(id: string): Promise<PeopleDetailResponse> {
    let url = `person/${id}?append_to_response=movie_credits,tv_credits`;
    const resp = await movieDB.get<PeopleDetailResponse>(url);
    return resp.data;
  },
};
