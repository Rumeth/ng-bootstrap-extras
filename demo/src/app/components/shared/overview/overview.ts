export interface NgbxdOverviewSection {
  title: string | false;
  fragment?: string;
}

export interface NgbxdOverview {
  [fragment: string]: NgbxdOverviewSection;
}
