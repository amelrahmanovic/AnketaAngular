export class InMemoryCache {
    private cache: { [key: string]: any } = {};
  
    // Metoda za postavljanje vrednosti u keš
    set(key: string, value: any): void {
      this.cache[key] = value;
    }
  
    // Metoda za dobijanje vrednosti iz keša
    get(key: string): any {
      return this.cache[key];
    }
  }