export interface Report {
  id: string;
  name: string;
  generate(): Promise<Buffer>;
}
