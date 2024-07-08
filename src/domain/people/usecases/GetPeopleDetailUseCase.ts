import {PeopleDetail} from '../entities/People';
import {peopleRepository} from '../../../data/people/PeopleRepository';

export const getPeopleDetailUseCase = {
  async execute(id: string): Promise<PeopleDetail> {
    return peopleRepository.peopleDetail(id);
  },
};
