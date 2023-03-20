export interface Countries {
  name: {
    common: string;
  };

  region: string;
}

export enum Region {
  europe = 'Europe',
  africa = 'Africa',
  americas = 'Americas',
  asia = 'Asia',
  oceania = 'Oceania',
}
