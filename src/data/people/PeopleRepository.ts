import {PeopleDetail, Peoples} from '../../domain/people/entities/People';
import {peopleRemoteDataSource} from './remote/PeopleRemoteDataSource';
import {
  peopleDetailToDomain,
  peopleResponseToDomain,
} from './mapper/PeopleMapper';

export interface PeopleDataSource {
  findPeoples(term: string, page: number): Promise<Peoples>;
  peopleDetail(id: string): Promise<PeopleDetail>;
}

export const peopleRepository: PeopleDataSource = {
  async findPeoples(term: string, page: number): Promise<Peoples> {
    const resp = await peopleRemoteDataSource.findPeople(term, page);
    return peopleResponseToDomain(resp);
  },
  async peopleDetail(id: string): Promise<PeopleDetail> {
    const resp = await peopleRemoteDataSource.personDetail(id);
    return peopleDetailToDomain(resp);
  },
};
