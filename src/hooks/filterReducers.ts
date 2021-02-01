import { DefaultFilter } from "../interfaces/Filter";

/**
 * @description Return new value for search or region
 * 
 * @param filter Initial filter
 * @param action Search or region for name and value that user choose
 */
export const filterReducer = (filter: DefaultFilter, action: {name: string; value: string}): DefaultFilter => {
  const { name, value } = action;
  const keys = Object.keys(filter);

  const state = keys.reduce((reset: DefaultFilter, key) => {
    reset[key as keyof DefaultFilter] = '';

    return reset;
  }, {} as DefaultFilter);

  state[name as keyof DefaultFilter] = value;

  return state;
}