import {Peoples} from '../entities/People';
import {peopleRepository} from '../../../data/people/PeopleRepository';

export const findPeoplesUseCase = {
  async execute(term: string, page: number): Promise<Peoples> {
    return peopleRepository.findPeoples(term, page);
  },
};
