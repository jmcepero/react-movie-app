import {makeAutoObservable, runInAction} from 'mobx';
import {getWatchRegionsUseCase} from '../../../../domain/regions';
import {errorHandler} from '../../../base/errorHandler';

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
          section.chips.forEach(chip => {
            chip.isSelected = false;
          });
          // Luego, selecciona el chip actual
          chip.isSelected = true;
        } else {
          // Para selección múltiple, simplemente alterna el estado de selección del chip
          chip.isSelected = !chip.isSelected;
        }
      }
    }
  }

  async loadWatchRegions() {
    this.isLoading = true;

    const regionsProm = getWatchRegionsUseCase.execute();

    try {
      const [regions] = await Promise.all([regionsProm]);

      runInAction(() => {
        this.sections = [
          {
            id: 1,
            title: 'Regions',
            singleSelection: true,
            expanded: true,
            chips: regions.map(value => ({
              id: value.iso_3166_1,
              label: value.english_name,
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
