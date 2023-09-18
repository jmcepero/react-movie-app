import movieDB from '../../api/movieDB';
import {PeoplesResponse} from '../entities/PeopleInterfaces';

export interface PeopleRemoteDataSource {
  getPopularPeople(page?: number): Promise<PeoplesResponse>;
}

export const peopleRemoteDataSourceImpl: PeopleRemoteDataSource = {
  async getPopularPeople(page?: number): Promise<PeoplesResponse> {
    let url = `person/popular`;
    if (page) {
      url = url + `?page=${page}`;
    }
    const resp = await movieDB.get<PeoplesResponse>(url);

    return resp.data;
  },
};
