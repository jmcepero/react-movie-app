import {makeAutoObservable, runInAction} from 'mobx';
import {getWatchRegionsUseCase} from '../../../../domain/regions';
import {errorHandler} from '../../../base/errorHandler';
import {getMovieGenresUseCase} from '../../../../domain/genre/usecases/GetMovieGenresUseCase';
import {getWatchProvidersCase} from '../../../../domain/watch_providers/usecases/GetWatchProvidersUseCase';
import {valorations} from '../../../utils/Constants';
import {defaultSorting, sortingValues} from '../utils/SortingData';

// Definiendo la interfaz para una sección del acordeón
interface Section {
  id: number;
  value: string;
  title: string;
  expanded: boolean;
  singleSelection: boolean;
  chips: Chip[];
}

export interface ChipMetadata {
  id: string;
  value: any;
}

// Definiendo la interfaz para los chips
export interface Chip {
  id: string;
  label: string;
  isSelected: boolean;
  metadata?: ChipMetadata;
}

export class FilterChipsStore {
  sections: Section[] = [];
  isLoading: boolean = false;
  currentYear = new Date().getFullYear();
  years = Array.from({length: 40}, (v, i) => this.currentYear - i);
  sortingOptions = new Array(...sortingValues);
  sortingSaved: Chip = defaultSorting;

  // Propiedad privada para guardar el estado
  _savedSections?: Section[];

  constructor() {
    makeAutoObservable(this);
  }

  onScreenLoaded(preselectedGenre?: number) {
    this.loadData(preselectedGenre);
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

  get selectedChipsMap(): Map<string, string> | undefined {
    const map = new Map<string, string>();

    this.sections.forEach(section => {
      const selectedChipsInSection = section.chips
        .filter(chip => chip.isSelected)
        .map(chip => chip.id);
      if (selectedChipsInSection.length > 0) {
        map.set(section.value, selectedChipsInSection.join(','));
      }
    });

    this.sortingOptions.forEach(value => {
      if (value.isSelected) {
        map.set('sort_by', value.id);
        if (value.metadata) {
          map.set(value.metadata.id, value.metadata.value);
        }
      }
    });

    if (!map || map.size === 0) {
      return undefined;
    }

    return map;
  }

  async loadData(preselectedGenre?: number) {
    this.isLoading = true;

    const regionsProm = getWatchRegionsUseCase.execute();
    const genresProm = getMovieGenresUseCase.execute();
    const watchProvidersProm = getWatchProvidersCase.execute('movie');

    try {
      const [regions, genres, watchProviders] = await Promise.all([
        regionsProm,
        genresProm,
        watchProvidersProm,
      ]);
      runInAction(() => {
        this.sections = [
          {
            id: 1,
            value: 'watch_region',
            title: 'Watch Regions',
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
            value: 'with_watch_providers',
            title: 'Watch Provider',
            singleSelection: false,
            expanded: false,
            chips: watchProviders.map(value => ({
              id: value.providerId.toString(),
              label: value.providerName,
              isSelected: false,
            })),
          },
          {
            id: 3,
            value: 'with_genres',
            title: 'Genres',
            singleSelection: false,
            expanded: false,
            chips: genres.map(value => ({
              id: value.id.toString(),
              label: value.name,
              isSelected: value.id === preselectedGenre,
            })),
          },
          {
            id: 4,
            value: 'year',
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
            id: 5,
            value: 'vote_average.gte',
            title: 'Valoration',
            singleSelection: true,
            expanded: false,
            chips: valorations.map(value => ({
              id: value.id.toString(),
              label: value.label,
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

  onSortingSelect(optionId: string) {
    this.sortingOptions = this.sortingOptions.map(value => {
      value.isSelected = value.id === optionId;
      return value;
    });
  }

  // Guarda el estado actual de selección de chips
  saveSelectionState() {
    this._savedSections = this.sections.map(section => ({
      ...section,
      chips: section.chips.map(chip => ({...chip})),
    }));
    this.sortingSaved =
      this.sortingOptions.find(value => value.isSelected) ?? defaultSorting;
  }

  // Restaura el estado guardado de selección de chips
  restoreSelectionState() {
    if (this._savedSections) {
      this.sections = this._savedSections.map(section => ({
        ...section,
        expanded: false,
        chips: section.chips.map(chip => ({...chip})),
      }));
    }
    if (this.sortingSaved) {
      this.sortingOptions = this.sortingOptions.map(value => {
        value.isSelected = this.sortingSaved.id === value.id;
        return value;
      });
    }
  }

  // Resetea todas las selecciones de chips
  resetSelection() {
    this.sections.forEach(section => {
      section.expanded = false;
      section.chips.forEach(chip => {
        chip.isSelected = false;
      });
    });
    this.sortingSaved = defaultSorting;
  }

  resetAllStates() {
    this.resetSelection();
    this._savedSections = undefined;
  }

  get haveSavedSections(): boolean {
    return !!this._savedSections && this._savedSections.length > 0;
  }
}
