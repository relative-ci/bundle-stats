export interface SortAction {
  field: string;
  direction: 'asc' | 'desc' | '';
}

interface FilterFieldData {
  label: string;
  defaultValue: boolean;
  disabled?: boolean;
}
type FilterGroupFieldData = { label: string } & { [key: string]: FilterFieldData };
type FilterFieldsData = Record<string, FilterFieldData | FilterGroupFieldData>;
