import {makeAutoObservable, runInAction} from 'mobx';
import {getWatchRegionsUseCase} from '../../../../domain/regions';
import {errorHandler} from '../../../base/errorHandler';
import {getMovieGenresUseCase} from '../../../../domain/genre/usecases/GetMovieGenresUseCase';

// Definiendo la interfaz para una sección del acordeón
interface Section {
  id: number;
  title: string;
  expanded: boolean;
  singleSelection: boolean;
  chips: Chip[];
}

// Definiendo la interfaz para los chips
interface Chip {
  id: string;
  label: string;
  isSelected: boolean;
}

export class AccordionStore {
  sections: Section[] = [];
  selectedSections: Section[] = [];
  isLoading: boolean = false;
  currentYear = new Date().getFullYear();
  years = Array.from({length: 40}, (v, i) => this.currentYear - i);

  constructor() {
    makeAutoObservable(this);
    this.loadWatchRegions();
  }

  // Método para inicializar las secciones, útil si los datos vienen de una API
  setSections(sections: Section[]) {
    this.sections = sections;
  }

  // Método para expandir o contraer una sección
  toggleSection(id: number) {
    const section = this.sections.find(section => section.id === id);
    if (section) {
      section.expanded = !section.expanded;
    }
  }

  // Método para seleccionar o deseleccionar un chip
  toggleChipSelection(sectionId: number, chipId: string) {
    const sectionIndex = this.sections.findIndex(
      section => section.id === sectionId,
    );
    if (sectionIndex > -1) {
      const section = this.sections[sectionIndex];
      const chipIndex = section.chips.findIndex(chip => chip.id === chipId);
      if (chipIndex > -1) {
        const chip = section.chips[chipIndex];
        // Si la sección es de selección única
        if (section.singleSelection) {
          // Primero, deselecciona todos los chips
          section.chips.forEach(item => {
            if (item.id == chipId) {
              item.isSelected = !item.isSelected;
            } else item.isSelected = false;
          });
        } else {
          // Para selección múltiple, simplemente alterna el estado de selección del chip
          chip.isSelected = !chip.isSelected;
        }
      }
    }
  }

  getSelectedChipsBySection(sectionId: number): Chip[] | undefined {
    const section = this.sections.find(section => section.id === sectionId);
    const result = section?.chips.filter(value => {
      return value.isSelected;
    });
    return result;
  }

  async loadWatchRegions() {
    this.isLoading = true;

    const regionsProm = getWatchRegionsUseCase.execute();
    const genresProm = getMovieGenresUseCase.execute();

    try {
      const [regions, genres] = await Promise.all([regionsProm, genresProm]);
      runInAction(() => {
        this.sections = [
          {
            id: 1,
            title: 'Regions',
            singleSelection: true,
            expanded: false,
            chips: regions.map(value => ({
              id: value.iso_3166_1,
              label: value.english_name,
              isSelected: false,
            })),
          },
          {
            id: 2,
            title: 'Genres',
            singleSelection: false,
            expanded: false,
            chips: genres.map(value => ({
              id: value.id.toString(),
              label: value.name,
              isSelected: false,
            })),
          },
          {
            id: 3,
            title: 'Year',
            singleSelection: true,
            expanded: false,
            chips: this.years.map(value => ({
              id: value.toString(),
              label: value.toString(),
              isSelected: false,
            })),
          },
          {
            id: 4,
            title: 'Valoration',
            singleSelection: true,
            expanded: false,
            chips: [5, 4, 3, 2, 1].map(value => ({
              id: value.toString(),
              label: value.toString() + ' ⭐',
              isSelected: false,
            })),
          },
        ];
        this.isLoading = false;
      });
    } catch (error) {
      const {message} = errorHandler(error);
      console.log(message);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
